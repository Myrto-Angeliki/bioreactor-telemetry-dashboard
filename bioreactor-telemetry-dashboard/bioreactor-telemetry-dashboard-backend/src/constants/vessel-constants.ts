import { Threshold } from "../threshold/threshold.js";

export const DEFAULT_THRESHOLDS: [string, number, number][] = [
    ['pH', 6.8, 7.4],
    ['temperature', 36.0, 37.5],
    ['dissolvedOxygen', 0.5, 0.83]
]
export const METRICS_COUNT: number = DEFAULT_THRESHOLDS.length;

export const METRICS_NAMES: string[] = ['pH','temperature','dissolvedOxygen'];

export type Thresholds = {
    vesselId: string,
    pHThreshold: Threshold,
    temperatureThreshold: Threshold,
    dissolvedOxygenThreshold: Threshold,
}

