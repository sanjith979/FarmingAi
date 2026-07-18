export interface SoilMetrics {
    pH: number;
    nitrogen: number;
    phosphorus: number;
    potassium: number;
}
export interface Crop {
    id: string;
    name: string;
    averageYield: number;
    nitrogenRequirement: number;
    phosphorusRequirement: number;
    potassiumRequirement: number;
}
export interface Fertilizer {
    nitrogen: number;
    phosphorus: number;
    potassium: number;
}
export interface YieldForecast {
    predictedYield: number;
    confidence: number;
    factors: {
        soilQuality: number;
        nutrientBalance: number;
        phOptimality: number;
    };
    recommendations: string[];
}
/**
 * Service for predicting crop yield based on soil, crop, and fertilizer data
 */
export declare class YieldPredictionService {
    /**
     * Predict yield for a crop given soil metrics and fertilizer
     */
    predictYield(crop: Crop, soilMetrics: SoilMetrics, fertilizer: Fertilizer): YieldForecast;
    /**
     * Calculate soil quality factor based on nutrient levels
     */
    private calculateSoilQuality;
    /**
     * Calculate nutrient balance factor
     */
    private calculateNutrientBalance;
    /**
     * Calculate pH optimality factor
     */
    private calculatePHOptimality;
    /**
     * Generate yield improvement recommendations
     */
    private generateRecommendations;
}
//# sourceMappingURL=yield-prediction.service.d.ts.map