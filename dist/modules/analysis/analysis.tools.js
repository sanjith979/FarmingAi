var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { ToolDecorator as Tool, Widget, Injectable } from '@nitrostack/core';
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
    recommendations: z.array(z.object({
        fertilizerId: z.string(),
        name: z.string(),
        imageUrl: z.string(),
        npkRatio: z.string(),
        price: z.number(),
        confidence: z.number(),
        reason: z.string(),
        expectedYieldIncrease: z.number(),
        applicationRate: z.number(),
    })),
    cropName: z.string(),
    totalRecommendations: z.number(),
});
/**
 * Analysis tools for soil assessment and fertilizer recommendations
 */
let AnalysisTools = class AnalysisTools {
    soilAnalysisService;
    fertilizerService;
    constructor(soilAnalysisService, fertilizerService) {
        this.soilAnalysisService = soilAnalysisService;
        this.fertilizerService = fertilizerService;
    }
    /**
     * Analyze soil metrics and provide quality assessment
     */
    async analyzeSoil(input, ctx) {
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
        }
        catch (error) {
            ctx.logger.error('Error analyzing soil', { error: String(error) });
            throw new Error(`Failed to analyze soil: ${error instanceof Error ? error.message : 'Unknown error'}`);
        }
    }
    /**
     * Recommend fertilizers based on crop, soil, and budget
     */
    async recommendFertilizer(input, ctx) {
        try {
            ctx.logger.info('Recommending fertilizers', { cropName: input.cropName, budget: input.budget });
            const crop = this.fertilizerService.getCropByName(input.cropName);
            if (!crop) {
                throw new Error(`Crop "${input.cropName}" not found in database`);
            }
            const recommendations = this.fertilizerService.recommendFertilizers(crop, {
                nitrogen: input.nitrogen,
                phosphorus: input.phosphorus,
                potassium: input.potassium,
            }, input.budget);
            ctx.logger.info('Fertilizer recommendations generated', {
                count: recommendations.length,
                cropName: input.cropName,
            });
            return {
                recommendations,
                cropName: input.cropName,
                totalRecommendations: recommendations.length,
            };
        }
        catch (error) {
            ctx.logger.error('Error recommending fertilizers', { error: String(error) });
            throw new Error(`Failed to recommend fertilizers: ${error instanceof Error ? error.message : 'Unknown error'}`);
        }
    }
};
__decorate([
    Tool({
        name: 'analyze-soil',
        description: 'Analyze soil metrics and provide quality assessment with deficiencies and recommendations',
        inputSchema: AnalyzeSoilInputSchema,
        outputSchema: AnalyzeSoilOutputSchema,
    }),
    Widget('soil-analysis-card'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [void 0, Object]),
    __metadata("design:returntype", Promise)
], AnalysisTools.prototype, "analyzeSoil", null);
__decorate([
    Tool({
        name: 'recommend-fertilizer',
        description: 'Recommend fertilizers based on crop type, soil metrics, and budget constraints',
        inputSchema: RecommendFertilizerInputSchema,
        outputSchema: RecommendFertilizerOutputSchema,
    }),
    Widget('recommendation-cards'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [void 0, Object]),
    __metadata("design:returntype", Promise)
], AnalysisTools.prototype, "recommendFertilizer", null);
AnalysisTools = __decorate([
    Injectable({ deps: [SoilAnalysisService, FertilizerService] }),
    __metadata("design:paramtypes", [SoilAnalysisService,
        FertilizerService])
], AnalysisTools);
export { AnalysisTools };
//# sourceMappingURL=analysis.tools.js.map