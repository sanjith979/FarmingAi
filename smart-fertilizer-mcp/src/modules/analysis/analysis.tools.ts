import { ToolDecorator as Tool, Widget, Injectable, ExecutionContext } from '@nitrostack/core';
import { z } from 'zod';
import { SoilAnalysisService } from './soil-analysis.service.js';
import { FertilizerService } from './fertilizer.service.js';

/**
 * Input schema for soil analysis
 */
const AnalyzeSoilInputSchema = z.object({
  pH: z.number().min(4).max(9).describe('Soil pH level (4-9)'),
  nitrogen: z.number().min(0).describe('Nitrogen level in ppm'),
  phosphorus: z.number().min(0).describe('Phosphorus level in ppm'),
  potassium: z.number().min(0).describe('Potassium level in ppm'),
  organicMatter: z.number().min(0).max(100).optional().describe('Organic matter percentage'),
  soilType: z.enum(['sandy', 'loamy', 'clay']).optional().describe('Type of soil'),
});

/**
 * Output schema for soil analysis
 */
const AnalyzeSoilOutputSchema = z.object({
  qualityScore: z.number(),
  deficiencies: z.array(z.string()),
  recommendations: z.array(z.string()),
  soilType: z.string(),
  phStatus: z.string(),
});

/**
 * Input schema for fertilizer recommendation
 */
const RecommendFertilizerInputSchema = z.object({
  cropName: z.string().describe('Name of the crop'),
  pH: z.number().min(4).max(9).describe('Soil pH level'),
  nitrogen: z.number().min(0).describe('Nitrogen level in ppm'),
  phosphorus: z.number().min(0).describe('Phosphorus level in ppm'),
  potassium: z.number().min(0).describe('Potassium level in ppm'),
  budget: z.number().min(0).describe('Budget in dollars'),
});

/**
 * Output schema for fertilizer recommendation
 */
const RecommendFertilizerOutputSchema = z.object({
  recommendations: z.array(
    z.object({
      fertilizerId: z.string(),
      name: z.string(),
      imageUrl: z.string(),
      npkRatio: z.string(),
      price: z.number(),
      confidence: z.number(),
      reason: z.string(),
      expectedYieldIncrease: z.number(),
      applicationRate: z.number(),
    }),
  ),
  cropName: z.string(),
  totalRecommendations: z.number(),
});

/**
 * Analysis tools for soil assessment and fertilizer recommendations
 */
@Injectable({ deps: [SoilAnalysisService, FertilizerService] })
export class AnalysisTools {
  constructor(
    private soilAnalysisService: SoilAnalysisService,
    private fertilizerService: FertilizerService,
  ) {}

  /**
   * Analyze soil metrics and provide quality assessment
   */
  @Tool({
    name: 'analyze-soil',
    description: 'Analyze soil metrics and provide quality assessment with deficiencies and recommendations',
    inputSchema: AnalyzeSoilInputSchema,
    outputSchema: AnalyzeSoilOutputSchema,
  })
  @Widget('soil-analysis-card')
  async analyzeSoil(input: z.infer<typeof AnalyzeSoilInputSchema>, ctx: ExecutionContext) {
    try {
      ctx.logger.info('Analyzing soil metrics', { input });

      const result = this.soilAnalysisService.analyzeSoil({
        pH: input.pH,
        nitrogen: input.nitrogen,
        phosphorus: input.phosphorus,
        potassium: input.potassium,
        organicMatter: input.organicMatter,
        soilType: input.soilType,
      });

      ctx.logger.info('Soil analysis complete', { qualityScore: result.qualityScore });

      return result;
    } catch (error) {
      ctx.logger.error('Error analyzing soil', { error: String(error) });
      throw new Error(`Failed to analyze soil: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Recommend fertilizers based on crop, soil, and budget
   */
  @Tool({
    name: 'recommend-fertilizer',
    description: 'Recommend fertilizers based on crop type, soil metrics, and budget constraints',
    inputSchema: RecommendFertilizerInputSchema,
    outputSchema: RecommendFertilizerOutputSchema,
  })
  @Widget('recommendation-cards')
  async recommendFertilizer(input: z.infer<typeof RecommendFertilizerInputSchema>, ctx: ExecutionContext) {
    try {
      ctx.logger.info('Recommending fertilizers', { cropName: input.cropName, budget: input.budget });

      const crop = this.fertilizerService.getCropByName(input.cropName);
      if (!crop) {
        throw new Error(`Crop "${input.cropName}" not found in database`);
      }

      const recommendations = this.fertilizerService.recommendFertilizers(
        crop,
        {
          nitrogen: input.nitrogen,
          phosphorus: input.phosphorus,
          potassium: input.potassium,
        },
        input.budget,
      );

      ctx.logger.info('Fertilizer recommendations generated', {
        count: recommendations.length,
        cropName: input.cropName,
      });

      return {
        recommendations,
        cropName: input.cropName,
        totalRecommendations: recommendations.length,
      };
    } catch (error) {
      ctx.logger.error('Error recommending fertilizers', { error: String(error) });
      throw new Error(
        `Failed to recommend fertilizers: ${error instanceof Error ? error.message : 'Unknown error'}`,
      );
    }
  }
}
