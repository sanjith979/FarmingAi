import { Injectable } from '@nitrostack/core';
import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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
@Injectable()
export class FertilizerService {
  private fertilizers: Fertilizer[] = [];
  private crops: Crop[] = [];

  constructor() {
    this.loadFixtures();
  }

  /**
   * Load fertilizer and crop fixtures
   */
  private loadFixtures(): void {
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
    } catch (error) {
      // Fixtures not available, use empty arrays
      this.fertilizers = [];
      this.crops = [];
    }
  }

  /**
   * Get all fertilizers
   */
  getAllFertilizers(): Fertilizer[] {
    return this.fertilizers;
  }

  /**
   * Get crop by name
   */
  getCropByName(cropName: string): Crop | undefined {
    return this.crops.find((c) => c.name.toLowerCase() === cropName.toLowerCase());
  }

  /**
   * Recommend fertilizers based on crop, soil, and budget
   */
  recommendFertilizers(
    crop: Crop,
    soilMetrics: SoilMetrics,
    budget: number,
  ): FertilizerRecommendation[] {
    const recommendations: FertilizerRecommendation[] = [];

    for (const fertilizer of this.fertilizers) {
      // Calculate cost per application
      const bagsNeeded = this.calculateBagsNeeded(crop);
      const totalCost = bagsNeeded * fertilizer.pricePerBag;

      // Skip if over budget
      if (totalCost > budget) continue;

      // Calculate nutrient match score
      const nitrogenMatch = this.calculateNutrientMatch(
        fertilizer.nitrogen,
        crop.nitrogenRequirement,
        soilMetrics.nitrogen,
      );
      const phosphorusMatch = this.calculateNutrientMatch(
        fertilizer.phosphorus,
        crop.phosphorusRequirement,
        soilMetrics.phosphorus,
      );
      const potassiumMatch = this.calculateNutrientMatch(
        fertilizer.potassium,
        crop.potassiumRequirement,
        soilMetrics.potassium,
      );

      // Calculate overall confidence
      const confidence = Math.round((nitrogenMatch + phosphorusMatch + potassiumMatch) / 3);

      // Calculate expected yield increase
      const expectedYieldIncrease = this.calculateYieldIncrease(
        nitrogenMatch,
        phosphorusMatch,
        potassiumMatch,
      );

      recommendations.push({
        fertilizerId: fertilizer.id,
        name: fertilizer.name,
        imageUrl: fertilizer.imageUrl,
        npkRatio: `${fertilizer.nitrogen}-${fertilizer.phosphorus}-${fertilizer.potassium}`,
        price: totalCost,
        confidence,
        reason: this.generateRecommendationReason(
          fertilizer,
          crop,
          nitrogenMatch,
          phosphorusMatch,
          potassiumMatch,
        ),
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
  private calculateBagsNeeded(crop: Crop): number {
    // Simplified calculation: 2-4 bags per hectare depending on crop
    const baseRate = 2.5;
    return Math.ceil(baseRate);
  }

  /**
   * Calculate nutrient match score (0-100)
   */
  private calculateNutrientMatch(
    fertilizerNutrient: number,
    cropRequirement: number,
    soilLevel: number,
  ): number {
    const deficit = Math.max(0, cropRequirement - soilLevel);
    if (deficit === 0) return 50; // Soil already has enough

    const match = Math.min(100, (fertilizerNutrient / deficit) * 100);
    return Math.round(match);
  }

  /**
   * Calculate expected yield increase percentage
   */
  private calculateYieldIncrease(
    nitrogenMatch: number,
    phosphorusMatch: number,
    potassiumMatch: number,
  ): number {
    const avgMatch = (nitrogenMatch + phosphorusMatch + potassiumMatch) / 3;
    // Yield increase is proportional to nutrient match, capped at 40%
    return Math.round(Math.min(40, (avgMatch / 100) * 40));
  }

  /**
   * Generate human-readable recommendation reason
   */
  private generateRecommendationReason(
    fertilizer: Fertilizer,
    crop: Crop,
    nitrogenMatch: number,
    phosphorusMatch: number,
    potassiumMatch: number,
  ): string {
    const strengths: string[] = [];

    if (nitrogenMatch > 80) strengths.push('excellent nitrogen content');
    if (phosphorusMatch > 80) strengths.push('excellent phosphorus content');
    if (potassiumMatch > 80) strengths.push('excellent potassium content');

    if (strengths.length === 0) {
      if (nitrogenMatch > 60) strengths.push('good nitrogen content');
      if (phosphorusMatch > 60) strengths.push('good phosphorus content');
      if (potassiumMatch > 60) strengths.push('good potassium content');
    }

    const reason =
      strengths.length > 0
        ? `${fertilizer.name} provides ${strengths.join(', ')} for ${crop.name}`
        : `${fertilizer.name} is a balanced option for ${crop.name}`;

    return reason;
  }
}
