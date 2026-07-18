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
let OptimizationTools = class OptimizationTools {
    yieldPredictionService;
    crops = [];
    constructor(yieldPredictionService) {
        this.yieldPredictionService = yieldPredictionService;
        this.loadCrops();
    }
    /**
     * Load crops from fixtures
     */
    loadCrops() {
        try {
            const cropsPath = path.join(__dirname, '../../../fixtures/crops.json');
            if (fs.existsSync(cropsPath)) {
                const cropsData = fs.readFileSync(cropsPath, 'utf-8');
                this.crops = JSON.parse(cropsData);
            }
        }
        catch (error) {
            // Fixtures not available
            this.crops = [];
        }
    }
    /**
     * Predict yield for a crop given soil metrics and fertilizer
     */
    async predictYield(input, ctx) {
        try {
            ctx.logger.info('Predicting yield', { cropName: input.cropName });
            const crop = this.crops.find((c) => c.name.toLowerCase() === input.cropName.toLowerCase());
            if (!crop) {
                throw new Error(`Crop "${input.cropName}" not found in database`);
            }
            const forecast = this.yieldPredictionService.predictYield(crop, {
                pH: input.pH,
                nitrogen: input.nitrogen,
                phosphorus: input.phosphorus,
                potassium: input.potassium,
            }, {
                nitrogen: input.fertilizerNitrogen,
                phosphorus: input.fertilizerPhosphorus,
                potassium: input.fertilizerPotassium,
            });
            ctx.logger.info('Yield prediction complete', {
                cropName: input.cropName,
                predictedYield: forecast.predictedYield,
                confidence: forecast.confidence,
            });
            return {
                ...forecast,
                cropName: input.cropName,
            };
        }
        catch (error) {
            ctx.logger.error('Error predicting yield', { error: String(error) });
            throw new Error(`Failed to predict yield: ${error instanceof Error ? error.message : 'Unknown error'}`);
        }
    }
};
__decorate([
    Tool({
        name: 'predict-yield',
        description: 'Predict crop yield based on soil metrics, crop type, and fertilizer application',
        inputSchema: PredictYieldInputSchema,
        outputSchema: PredictYieldOutputSchema,
    }),
    Widget('yield-forecast'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [void 0, Object]),
    __metadata("design:returntype", Promise)
], OptimizationTools.prototype, "predictYield", null);
OptimizationTools = __decorate([
    Injectable({ deps: [YieldPredictionService] }),
    __metadata("design:paramtypes", [YieldPredictionService])
], OptimizationTools);
export { OptimizationTools };
//# sourceMappingURL=optimization.tools.js.map