var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
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
let AnalysisModule = class AnalysisModule {
};
AnalysisModule = __decorate([
    Module({
        name: 'analysis',
        description: 'Soil analysis and fertilizer recommendation module',
        controllers: [AnalysisTools],
        providers: [SoilAnalysisService, FertilizerService],
    })
], AnalysisModule);
export { AnalysisModule };
//# sourceMappingURL=analysis.module.js.map