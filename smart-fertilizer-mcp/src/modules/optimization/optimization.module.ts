import { Module } from '@nitrostack/core';
import { OptimizationTools } from './optimization.tools.js';
import { YieldPredictionService } from './yield-prediction.service.js';

/**
 * Optimization Module
 *
 * Provides tools and services for yield prediction and budget optimization.
 * Includes:
 * - Yield forecasting based on soil and fertilizer data
 * - Budget-constrained fertilizer selection
 * - ROI analysis for fertilizer applications
 */
@Module({
  name: 'optimization',
  description: 'Yield prediction and budget optimization module',
  controllers: [OptimizationTools],
  providers: [YieldPredictionService],
})
export class OptimizationModule {}
