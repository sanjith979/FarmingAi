import { ExecutionContext } from '@nitrostack/core';
import { z } from 'zod';
import { SoilAnalysisService } from './soil-analysis.service.js';
import { FertilizerService } from './fertilizer.service.js';
/**
 * Input schema for soil analysis
 */
declare const AnalyzeSoilInputSchema: z.ZodObject<{
    pH: z.ZodNumber;
    nitrogen: z.ZodNumber;
    phosphorus: z.ZodNumber;
    potassium: z.ZodNumber;
    organicMatter: z.ZodOptional<z.ZodNumber>;
    soilType: z.ZodOptional<z.ZodEnum<["sandy", "loamy", "clay"]>>;
}, "strip", z.ZodTypeAny, {
    pH: number;
    nitrogen: number;
    phosphorus: number;
    potassium: number;
    organicMatter?: number | undefined;
    soilType?: "sandy" | "loamy" | "clay" | undefined;
}, {
    pH: number;
    nitrogen: number;
    phosphorus: number;
    potassium: number;
    organicMatter?: number | undefined;
    soilType?: "sandy" | "loamy" | "clay" | undefined;
}>;
/**
 * Input schema for fertilizer recommendation
 */
declare const RecommendFertilizerInputSchema: z.ZodObject<{
    cropName: z.ZodString;
    pH: z.ZodNumber;
    nitrogen: z.ZodNumber;
    phosphorus: z.ZodNumber;
    potassium: z.ZodNumber;
    budget: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    pH: number;
    nitrogen: number;
    phosphorus: number;
    potassium: number;
    cropName: string;
    budget: number;
}, {
    pH: number;
    nitrogen: number;
    phosphorus: number;
    potassium: number;
    cropName: string;
    budget: number;
}>;
/**
 * Analysis tools for soil assessment and fertilizer recommendations
 */
export declare class AnalysisTools {
    private soilAnalysisService;
    private fertilizerService;
    constructor(soilAnalysisService: SoilAnalysisService, fertilizerService: FertilizerService);
    /**
     * Analyze soil metrics and provide quality assessment
     */
    analyzeSoil(input: z.infer<typeof AnalyzeSoilInputSchema>, ctx: ExecutionContext): Promise<import("./soil-analysis.service.js").SoilAnalysisResult>;
    /**
     * Recommend fertilizers based on crop, soil, and budget
     */
    recommendFertilizer(input: z.infer<typeof RecommendFertilizerInputSchema>, ctx: ExecutionContext): Promise<{
        recommendations: import("./fertilizer.service.js").FertilizerRecommendation[];
        cropName: string;
        totalRecommendations: number;
    }>;
}
export {};
//# sourceMappingURL=analysis.tools.d.ts.map