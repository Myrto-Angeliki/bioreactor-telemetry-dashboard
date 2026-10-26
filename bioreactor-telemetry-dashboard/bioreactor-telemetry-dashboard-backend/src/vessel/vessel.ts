import { Thresholds } from "../constants/vessel-constants.js";
import { Telemetry } from "../telemetry/telemetry.js";

export class Vessel {
    private id: string;
    private telemetry: Telemetry;
    private thresholds: Thresholds;
    METRICS_COUNT: number;

    constructor(id: string, telemetry: Telemetry, thresholds: Thresholds) {
        this.id = id;
        this.telemetry = telemetry;
        this.thresholds = thresholds;
    }

    getId(): string {
        return this.id;
    }

    getTelemetry(): Telemetry {
        return this.telemetry;
    }

    getThresholds(): Thresholds {
        return this.thresholds;
    }
}
