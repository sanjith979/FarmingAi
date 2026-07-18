export interface Fertilizer {
    id: string;
    name: string;
    imageUrl: string;
    nitrogen: number;
    phosphorus: number;
    potassium: number;
    pricePerBag: number;
    bagWeightKg: number;
    releaseType: 'immediate' | 'slow-release';
    description: string;
}
export interface Crop {
    id: string;
    name: string;
    nitrogenRequirement: number;
    phosphorusRequirement: number;
    potassiumRequirement: number;
}
export interface FertilizerRecommendation {
    fertilizerId: string;
    name: string;
    imageUrl: string;
    npkRatio: string;
    price: number;
    confidence: number;
    reason: string;
    expectedYieldIncrease: number;
    applicationRate: number;
}
export interface SoilMetrics {
    nitrogen: number;
    phosphorus: number;
    potassium: number;
}
/**
 * Service for fertilizer recommendations and matching
 */
export declare class FertilizerService {
    private fertilizers;
    private crops;
    constructor();
    /**
     * Load fertilizer and crop fixtures
     */
    private loadFixtures;
    /**
     * Get all fertilizers
     */
    getAllFertilizers(): Fertilizer[];
    /**
     * Get crop by name
     */
    getCropByName(cropName: string): Crop | undefined;
    /**
     * Recommend fertilizers based on crop, soil, and budget
     */
    recommendFertilizers(crop: Crop, soilMetrics: SoilMetrics, budget: number): FertilizerRecommendation[];
    /**
     * Calculate bags needed for a crop (per hectare)
     */
    private calculateBagsNeeded;
    /**
     * Calculate nutrient match score (0-100)
     */
    private calculateNutrientMatch;
    /**
     * Calculate expected yield increase percentage
     */
    private calculateYieldIncrease;
    /**
     * Generate human-readable recommendation reason
     */
    private generateRecommendationReason;
}
//# sourceMappingURL=fertilizer.service.d.ts.map