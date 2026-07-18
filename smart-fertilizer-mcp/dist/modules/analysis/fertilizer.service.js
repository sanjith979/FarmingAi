var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable } from '@nitrostack/core';
import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
/**
 * Service for fertilizer recommendations and matching
 */
let FertilizerService = class FertilizerService {
    fertilizers = [];
    crops = [];
    constructor() {
        this.loadFixtures();
    }
    /**
     * Load fertilizer and crop fixtures
     */
    loadFixtures() {
        try {
            const fertilizerPath = path.join(__dirname, '../../../fixtures/fertilizers.json');
            const cropsPath = path.join(__dirname, '../../../fixtures/crops.json');
            if (fs.existsSync(fertilizerPath)) {
                const fertilizerData = fs.readFileSync(fertilizerPath, 'utf-8');
                this.fertilizers = JSON.parse(fertilizerData);
            }
            if (fs.existsSync(cropsPath)) {
                const cropsData = fs.readFileSync(cropsPath, 'utf-8');
                this.crops = JSON.parse(cropsData);
            }
        }
        catch (error) {
            // Fixtures not available, use empty arrays
            this.fertilizers = [];
            this.crops = [];
        }
    }
    /**
     * Get all fertilizers
     */
    getAllFertilizers() {
        return this.fertilizers;
    }
    /**
     * Get crop by name
     */
    getCropByName(cropName) {
        return this.crops.find((c) => c.name.toLowerCase() === cropName.toLowerCase());
    }
    /**
     * Recommend fertilizers based on crop, soil, and budget
     */
    recommendFertilizers(crop, soilMetrics, budget) {
        const recommendations = [];
        for (const fertilizer of this.fertilizers) {
            // Calculate cost per application
            const bagsNeeded = this.calculateBagsNeeded(crop);
            const totalCost = bagsNeeded * fertilizer.pricePerBag;
            // Skip if over budget
            if (totalCost > budget)
                continue;
            // Calculate nutrient match score
            const nitrogenMatch = this.calculateNutrientMatch(fertilizer.nitrogen, crop.nitrogenRequirement, soilMetrics.nitrogen);
            const phosphorusMatch = this.calculateNutrientMatch(fertilizer.phosphorus, crop.phosphorusRequirement, soilMetrics.phosphorus);
            const potassiumMatch = this.calculateNutrientMatch(fertilizer.potassium, crop.potassiumRequirement, soilMetrics.potassium);
            // Calculate overall confidence
            const confidence = Math.round((nitrogenMatch + phosphorusMatch + potassiumMatch) / 3);
            // Calculate expected yield increase
            const expectedYieldIncrease = this.calculateYieldIncrease(nitrogenMatch, phosphorusMatch, potassiumMatch);
            recommendations.push({
                fertilizerId: fertilizer.id,
                name: fertilizer.name,
                imageUrl: fertilizer.imageUrl,
                npkRatio: `${fertilizer.nitrogen}-${fertilizer.phosphorus}-${fertilizer.potassium}`,
                price: totalCost,
                confidence,
                reason: this.generateRecommendationReason(fertilizer, crop, nitrogenMatch, phosphorusMatch, potassiumMatch),
                expectedYieldIncrease,
                applicationRate: bagsNeeded,
            });
        }
        // Sort by confidence (descending) then by price (ascending)
        return recommendations.sort((a, b) => {
            if (b.confidence !== a.confidence) {
                return b.confidence - a.confidence;
            }
            return a.price - b.price;
        });
    }
    /**
     * Calculate bags needed for a crop (per hectare)
     */
    calculateBagsNeeded(crop) {
        // Simplified calculation: 2-4 bags per hectare depending on crop
        const baseRate = 2.5;
        return Math.ceil(baseRate);
    }
    /**
     * Calculate nutrient match score (0-100)
     */
    calculateNutrientMatch(fertilizerNutrient, cropRequirement, soilLevel) {
        const deficit = Math.max(0, cropRequirement - soilLevel);
        if (deficit === 0)
            return 50; // Soil already has enough
        const match = Math.min(100, (fertilizerNutrient / deficit) * 100);
        return Math.round(match);
    }
    /**
     * Calculate expected yield increase percentage
     */
    calculateYieldIncrease(nitrogenMatch, phosphorusMatch, potassiumMatch) {
        const avgMatch = (nitrogenMatch + phosphorusMatch + potassiumMatch) / 3;
        // Yield increase is proportional to nutrient match, capped at 40%
        return Math.round(Math.min(40, (avgMatch / 100) * 40));
    }
    /**
     * Generate human-readable recommendation reason
     */
    generateRecommendationReason(fertilizer, crop, nitrogenMatch, phosphorusMatch, potassiumMatch) {
        const strengths = [];
        if (nitrogenMatch > 80)
            strengths.push('excellent nitrogen content');
        if (phosphorusMatch > 80)
            strengths.push('excellent phosphorus content');
        if (potassiumMatch > 80)
            strengths.push('excellent potassium content');
        if (strengths.length === 0) {
            if (nitrogenMatch > 60)
                strengths.push('good nitrogen content');
            if (phosphorusMatch > 60)
                strengths.push('good phosphorus content');
            if (potassiumMatch > 60)
                strengths.push('good potassium content');
        }
        const reason = strengths.length > 0
            ? `${fertilizer.name} provides ${strengths.join(', ')} for ${crop.name}`
            : `${fertilizer.name} is a balanced option for ${crop.name}`;
        return reason;
    }
};
FertilizerService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [])
], FertilizerService);
export { FertilizerService };
//# sourceMappingURL=fertilizer.service.js.map