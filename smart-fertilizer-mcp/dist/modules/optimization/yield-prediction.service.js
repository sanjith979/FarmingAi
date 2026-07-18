var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Injectable } from '@nitrostack/core';
/**
 * Service for predicting crop yield based on soil, crop, and fertilizer data
 */
let YieldPredictionService = class YieldPredictionService {
    /**
     * Predict yield for a crop given soil metrics and fertilizer
     */
    predictYield(crop, soilMetrics, fertilizer) {
        // Calculate soil quality factor (0-1)
        const soilQuality = this.calculateSoilQuality(soilMetrics);
        // Calculate nutrient balance factor (0-1)
        const nutrientBalance = this.calculateNutrientBalance(crop, soilMetrics, fertilizer);
        // Calculate pH optimality factor (0-1)
        const phOptimality = this.calculatePHOptimality(soilMetrics.pH);
        // Calculate overall confidence (0-100)
        const confidence = Math.round((soilQuality + nutrientBalance + phOptimality) / 3 * 100);
        // Calculate predicted yield
        const baseYield = crop.averageYield;
        const yieldMultiplier = (soilQuality + nutrientBalance + phOptimality) / 3;
        const predictedYield = Math.round(baseYield * yieldMultiplier * 100) / 100;
        // Generate recommendations
        const recommendations = this.generateRecommendations(crop, soilMetrics, fertilizer, soilQuality, nutrientBalance, phOptimality);
        return {
            predictedYield,
            confidence,
            factors: {
                soilQuality: Math.round(soilQuality * 100),
                nutrientBalance: Math.round(nutrientBalance * 100),
                phOptimality: Math.round(phOptimality * 100),
            },
            recommendations,
        };
    }
    /**
     * Calculate soil quality factor based on nutrient levels
     */
    calculateSoilQuality(soilMetrics) {
        let quality = 0;
        let factors = 0;
        // Nitrogen quality
        if (soilMetrics.nitrogen >= 40 && soilMetrics.nitrogen <= 100) {
            quality += 1;
        }
        else if (soilMetrics.nitrogen >= 20 && soilMetrics.nitrogen <= 150) {
            quality += 0.7;
        }
        else {
            quality += 0.3;
        }
        factors++;
        // Phosphorus quality
        if (soilMetrics.phosphorus >= 15 && soilMetrics.phosphorus <= 50) {
            quality += 1;
        }
        else if (soilMetrics.phosphorus >= 10 && soilMetrics.phosphorus <= 80) {
            quality += 0.7;
        }
        else {
            quality += 0.3;
        }
        factors++;
        // Potassium quality
        if (soilMetrics.potassium >= 100 && soilMetrics.potassium <= 300) {
            quality += 1;
        }
        else if (soilMetrics.potassium >= 50 && soilMetrics.potassium <= 400) {
            quality += 0.7;
        }
        else {
            quality += 0.3;
        }
        factors++;
        return Math.min(1, quality / factors);
    }
    /**
     * Calculate nutrient balance factor
     */
    calculateNutrientBalance(crop, soilMetrics, fertilizer) {
        const totalNutrientNeeded = crop.nitrogenRequirement + crop.phosphorusRequirement + crop.potassiumRequirement;
        const nitrogenAvailable = soilMetrics.nitrogen + fertilizer.nitrogen;
        const phosphorusAvailable = soilMetrics.phosphorus + fertilizer.phosphorus;
        const potassiumAvailable = soilMetrics.potassium + fertilizer.potassium;
        const nitrogenRatio = Math.min(1, nitrogenAvailable / crop.nitrogenRequirement);
        const phosphorusRatio = Math.min(1, phosphorusAvailable / crop.phosphorusRequirement);
        const potassiumRatio = Math.min(1, potassiumAvailable / crop.potassiumRequirement);
        return (nitrogenRatio + phosphorusRatio + potassiumRatio) / 3;
    }
    /**
     * Calculate pH optimality factor
     */
    calculatePHOptimality(pH) {
        // Most crops prefer pH 6.0-7.5
        const optimalMin = 6.0;
        const optimalMax = 7.5;
        if (pH >= optimalMin && pH <= optimalMax) {
            return 1;
        }
        else if (pH >= 5.5 && pH <= 8.0) {
            return 0.8;
        }
        else if (pH >= 5.0 && pH <= 8.5) {
            return 0.6;
        }
        else {
            return 0.3;
        }
    }
    /**
     * Generate yield improvement recommendations
     */
    generateRecommendations(crop, soilMetrics, fertilizer, soilQuality, nutrientBalance, phOptimality) {
        const recommendations = [];
        // Soil quality recommendations
        if (soilQuality < 0.7) {
            recommendations.push('Improve soil quality by adding organic matter and compost');
        }
        // Nutrient balance recommendations
        if (nutrientBalance < 0.7) {
            recommendations.push('Consider increasing fertilizer application rate for better nutrient balance');
        }
        // pH recommendations
        if (phOptimality < 0.8) {
            if (soilMetrics.pH < 6.0) {
                recommendations.push('Soil is too acidic; consider adding lime to raise pH');
            }
            else if (soilMetrics.pH > 7.5) {
                recommendations.push('Soil is too alkaline; consider adding sulfur to lower pH');
            }
        }
        // Nitrogen recommendations
        if (soilMetrics.nitrogen + fertilizer.nitrogen < crop.nitrogenRequirement * 0.8) {
            recommendations.push('Nitrogen levels may be insufficient; consider a nitrogen-rich fertilizer');
        }
        // Phosphorus recommendations
        if (soilMetrics.phosphorus + fertilizer.phosphorus < crop.phosphorusRequirement * 0.8) {
            recommendations.push('Phosphorus levels may be insufficient; consider a phosphorus-rich fertilizer');
        }
        // Potassium recommendations
        if (soilMetrics.potassium + fertilizer.potassium < crop.potassiumRequirement * 0.8) {
            recommendations.push('Potassium levels may be insufficient; consider a potassium-rich fertilizer');
        }
        if (recommendations.length === 0) {
            recommendations.push('Soil conditions and nutrient levels are well-balanced for optimal yield');
        }
        return recommendations;
    }
};
YieldPredictionService = __decorate([
    Injectable()
], YieldPredictionService);
export { YieldPredictionService };
//# sourceMappingURL=yield-prediction.service.js.map