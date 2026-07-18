import { Module } from '@nitrostack/core';
import { AnalysisTools } from './analysis.tools.js';
import { SoilAnalysisService } from './soil-analysis.service.js';
import { FertilizerService } from './fertilizer.service.js';

/**
 * Analysis Module
 *
 * Provides tools and services for soil analysis and fertilizer recommendations.
 * Includes:
 * - Soil quality assessment
 * - Nutrient deficiency detection
 * - Fertilizer matching and recommendations
 */
@Module({
  name: 'analysis',
  description: 'Soil analysis and fertilizer recommendation module',
  controllers: [AnalysisTools],
  providers: [SoilAnalysisService, FertilizerService],
})
export class AnalysisModule {}
