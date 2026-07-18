var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
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
let OptimizationModule = class OptimizationModule {
};
OptimizationModule = __decorate([
    Module({
        name: 'optimization',
        description: 'Yield prediction and budget optimization module',
        controllers: [OptimizationTools],
        providers: [YieldPredictionService],
    })
], OptimizationModule);
export { OptimizationModule };
//# sourceMappingURL=optimization.module.js.map