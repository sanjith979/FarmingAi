/**
 * Type definitions for the analysis module
 */

export interface SoilMetrics {
  pH: number;
  nitrogen: number; // ppm
  phosphorus: number; // ppm
  potassium: number; // ppm
  organicMatter?: number; // percentage
  soilType?: 'sandy' | 'loamy' | 'clay';
}

export interface SoilAnalysisResult {
  qualityScore: number; // 0-100
  deficiencies: string[];
  recommendations: string[];
  soilType: string;
  phStatus: string;
}

export interface Crop {
  id: string;
  name: string;
  scientificName: string;
  imageUrl: string;
  nitrogenRequirement: number;
  phosphorusRequirement: number;
  potassiumRequirement: number;
  optimalPH: { min: number; max: number };
  growingSeasonDays: number;
  averageYield: number;
}

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

export interface FertilizerRecommendation {
  fertilizerId: string;
  name: string;
  imageUrl: string;
  npkRatio: string;
  price: number;
  confidence: number; // 0-100
  reason: string;
  expectedYieldIncrease: number; // percentage
  applicationRate: number; // bags per hectare
}
