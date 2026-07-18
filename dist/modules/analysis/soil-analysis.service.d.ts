export interface SoilMetrics {
    pH: number;
    nitrogen: number;
    phosphorus: number;
    potassium: number;
    organicMatter?: number;
    soilType?: 'sandy' | 'loamy' | 'clay';
}
export interface SoilAnalysisResult {
    qualityScore: number;
    deficiencies: string[];
    recommendations: string[];
    soilType: string;
    phStatus: string;
}
/**
 * Service for analyzing soil metrics and providing recommendations
 */
export declare class SoilAnalysisService {
    /**
     * Analyze soil metrics and return quality assessment
     */
    analyzeSoil(metrics: SoilMetrics): SoilAnalysisResult;
    /**
     * Analyze pH level and return status
     */
    private analyzePH;
    /**
     * Calculate nutrient deficiency percentage
     */
    calculateDeficiencyPercentage(actual: number, optimal: number): number;
    /**
     * Get soil type recommendation based on metrics
     */
    getSoilTypeRecommendation(soilType: string): string;
}
//# sourceMappingURL=soil-analysis.service.d.ts.map