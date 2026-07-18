var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Injectable } from '@nitrostack/core';
/**
 * Service for analyzing soil metrics and providing recommendations
 */
let SoilAnalysisService = class SoilAnalysisService {
    /**
     * Analyze soil metrics and return quality assessment
     */
    analyzeSoil(metrics) {
        const deficiencies = [];
        const recommendations = [];
        let qualityScore = 100;
        // pH Analysis
        const phStatus = this.analyzePH(metrics.pH);
        if (metrics.pH < 6.0 || metrics.pH > 7.5) {
            deficiencies.push(`pH is ${phStatus} (optimal: 6.0-7.5)`);
            qualityScore -= 15;
        }
        // Nitrogen Analysis
        if (metrics.nitrogen < 40) {
            deficiencies.push(`Low nitrogen (${metrics.nitrogen} ppm, optimal: 40-60 ppm)`);
            recommendations.push('Apply nitrogen-rich fertilizer');
            qualityScore -= 20;
        }
        else if (metrics.nitrogen > 100) {
            deficiencies.push(`High nitrogen (${metrics.nitrogen} ppm, optimal: 40-60 ppm)`);
            recommendations.push('Reduce nitrogen application');
            qualityScore -= 10;
        }
        // Phosphorus Analysis
        if (metrics.phosphorus < 15) {
            deficiencies.push(`Low phosphorus (${metrics.phosphorus} ppm, optimal: 15-30 ppm)`);
            recommendations.push('Apply phosphorus-rich fertilizer');
            qualityScore -= 15;
        }
        else if (metrics.phosphorus > 50) {
            deficiencies.push(`High phosphorus (${metrics.phosphorus} ppm, optimal: 15-30 ppm)`);
            recommendations.push('Reduce phosphorus application');
            qualityScore -= 5;
        }
        // Potassium Analysis
        if (metrics.potassium < 100) {
            deficiencies.push(`Low potassium (${metrics.potassium} ppm, optimal: 100-200 ppm)`);
            recommendations.push('Apply potassium-rich fertilizer');
            qualityScore -= 20;
        }
        else if (metrics.potassium > 300) {
            deficiencies.push(`High potassium (${metrics.potassium} ppm, optimal: 100-200 ppm)`);
            recommendations.push('Reduce potassium application');
            qualityScore -= 5;
        }
        // Organic Matter Analysis
        if (metrics.organicMatter !== undefined) {
            if (metrics.organicMatter < 2) {
                deficiencies.push(`Low organic matter (${metrics.organicMatter}%, optimal: 2-5%)`);
                recommendations.push('Add compost or organic amendments');
                qualityScore -= 10;
            }
        }
        // Ensure score is within bounds
        qualityScore = Math.max(0, Math.min(100, qualityScore));
        return {
            qualityScore,
            deficiencies: deficiencies.length > 0 ? deficiencies : ['Soil is in good condition'],
            recommendations: recommendations.length > 0 ? recommendations : ['Maintain current fertilization practices'],
            soilType: metrics.soilType || 'unknown',
            phStatus,
        };
    }
    /**
     * Analyze pH level and return status
     */
    analyzePH(pH) {
        if (pH < 5.5)
            return 'very acidic';
        if (pH < 6.0)
            return 'acidic';
        if (pH < 7.0)
            return 'slightly acidic';
        if (pH < 7.5)
            return 'neutral';
        if (pH < 8.0)
            return 'slightly alkaline';
        if (pH < 8.5)
            return 'alkaline';
        return 'very alkaline';
    }
    /**
     * Calculate nutrient deficiency percentage
     */
    calculateDeficiencyPercentage(actual, optimal) {
        if (actual >= optimal)
            return 0;
        return Math.round(((optimal - actual) / optimal) * 100);
    }
    /**
     * Get soil type recommendation based on metrics
     */
    getSoilTypeRecommendation(soilType) {
        const recommendations = {
            sandy: 'Sandy soil drains quickly; add organic matter to improve water retention',
            loamy: 'Loamy soil is ideal for most crops; maintain current practices',
            clay: 'Clay soil retains water well; ensure proper drainage to prevent waterlogging',
            unknown: 'Determine soil type through soil testing for better recommendations',
        };
        return recommendations[soilType] || recommendations.unknown;
    }
};
SoilAnalysisService = __decorate([
    Injectable()
], SoilAnalysisService);
export { SoilAnalysisService };
//# sourceMappingURL=soil-analysis.service.js.map