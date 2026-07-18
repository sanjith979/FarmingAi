import { ExecutionContext } from '@nitrostack/core';
import { z } from 'zod';
import { YieldPredictionService } from './yield-prediction.service.js';
/**
 * Input schema for yield prediction
 */
declare const PredictYieldInputSchema: z.ZodObject<{
    cropName: z.ZodString;
    pH: z.ZodNumber;
    nitrogen: z.ZodNumber;
    phosphorus: z.ZodNumber;
    potassium: z.ZodNumber;
    fertilizerNitrogen: z.ZodNumber;
    fertilizerPhosphorus: z.ZodNumber;
    fertilizerPotassium: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    pH: number;
    nitrogen: number;
    phosphorus: number;
    potassium: number;
    cropName: string;
    fertilizerNitrogen: number;
    fertilizerPhosphorus: number;
    fertilizerPotassium: number;
}, {
    pH: number;
    nitrogen: number;
    phosphorus: number;
    potassium: number;
    cropName: string;
    fertilizerNitrogen: number;
    fertilizerPhosphorus: number;
    fertilizerPotassium: number;
}>;
/**
 * Optimization tools for yield prediction and budget optimization
 */
export declare class OptimizationTools {
    private yieldPredictionService;
    private crops;
    constructor(yieldPredictionService: YieldPredictionService);
    /**
     * Load crops from fixtures
     */
    private loadCrops;
    /**
     * Predict yield for a crop given soil metrics and fertilizer
     */
    predictYield(input: z.infer<typeof PredictYieldInputSchema>, ctx: ExecutionContext): Promise<{
        cropName: string;
        predictedYield: number;
        confidence: number;
        factors: {
            soilQuality: number;
            nutrientBalance: number;
            phOptimality: number;
        };
        recommendations: string[];
    }>;
}
export {};
//# sourceMappingURL=optimization.tools.d.ts.map