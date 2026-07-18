import { ToolDecorator as Tool, Widget, Injectable, ExecutionContext } from '@nitrostack/core';
import { z } from 'zod';
import { YieldPredictionService } from './yield-prediction.service.js';
import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Input schema for yield prediction
 */
const PredictYieldInputSchema = z.object({
  cropName: z.string().describe('Name of the crop'),
  pH: z.number().min(4).max(9).describe('Soil pH level'),
  nitrogen: z.number().min(0).describe('Nitrogen level in ppm'),
  phosphorus: z.number().min(0).describe('Phosphorus level in ppm'),
  potassium: z.number().min(0).describe('Potassium level in ppm'),
  fertilizerNitrogen: z.number().min(0).describe('Nitrogen content of fertilizer'),
  fertilizerPhosphorus: z.number().min(0).describe('Phosphorus content of fertilizer'),
  fertilizerPotassium: z.number().min(0).describe('Potassium content of fertilizer'),
});

/**
 * Output schema for yield prediction
 */
const PredictYieldOutputSchema = z.object({
  predictedYield: z.number(),
  confidence: z.number(),
  factors: z.object({
    soilQuality: z.number(),
    nutrientBalance: z.number(),
    phOptimality: z.number(),
  }),
  recommendations: z.array(z.string()),
  cropName: z.string(),
});

/**
 * Optimization tools for yield prediction and budget optimization
 */
@Injectable({ deps: [YieldPredictionService] })
export class OptimizationTools {
  private crops: any[] = [];

  constructor(private yieldPredictionService: YieldPredictionService) {
    this.loadCrops();
  }

  /**
   * Load crops from fixtures
   */
  private loadCrops(): void {
    try {
      const cropsPath = path.join(__dirname, '../../../fixtures/crops.json');
      if (fs.existsSync(cropsPath)) {
        const cropsData = fs.readFileSync(cropsPath, 'utf-8');
        this.crops = JSON.parse(cropsData);
      }
    } catch (error) {
      // Fixtures not available
      this.crops = [];
    }
  }

  /**
   * Predict yield for a crop given soil metrics and fertilizer
   */
  @Tool({
    name: 'predict-yield',
    description: 'Predict crop yield based on soil metrics, crop type, and fertilizer application',
    inputSchema: PredictYieldInputSchema,
    outputSchema: PredictYieldOutputSchema,
  })
  @Widget('yield-forecast')
  async predictYield(input: z.infer<typeof PredictYieldInputSchema>, ctx: ExecutionContext) {
    try {
      ctx.logger.info('Predicting yield', { cropName: input.cropName });

      const crop = this.crops.find((c) => c.name.toLowerCase() === input.cropName.toLowerCase());
      if (!crop) {
        throw new Error(`Crop "${input.cropName}" not found in database`);
      }

      const forecast = this.yieldPredictionService.predictYield(
        crop,
        {
          pH: input.pH,
          nitrogen: input.nitrogen,
          phosphorus: input.phosphorus,
          potassium: input.potassium,
        },
        {
          nitrogen: input.fertilizerNitrogen,
          phosphorus: input.fertilizerPhosphorus,
          potassium: input.fertilizerPotassium,
        },
      );

      ctx.logger.info('Yield prediction complete', {
        cropName: input.cropName,
        predictedYield: forecast.predictedYield,
        confidence: forecast.confidence,
      });

      return {
        ...forecast,
        cropName: input.cropName,
      };
    } catch (error) {
      ctx.logger.error('Error predicting yield', { error: String(error) });
      throw new Error(`Failed to predict yield: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }
}
