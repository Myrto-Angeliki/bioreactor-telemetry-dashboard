import { Injectable } from "@nestjs/common";
import { DEFAULT_THRESHOLDS, METRICS_COUNT, Thresholds } from "../constants/vessel-constants.js";
import { Telemetry } from "../telemetry/telemetry.js";
import { TelemetryService } from "../telemetry/telemetry.service.js";
import { Threshold } from "../threshold/threshold.js";
import { ThresholdService } from "../threshold/threshold.service.js";
import { Vessel } from "./vessel.js";

@Injectable()
export class VesselFactory {
    constructor(private readonly thresholdService: ThresholdService,
        private readonly telemetryService: TelemetryService
    ) { }

    public createVessel(id: string) {
        const telemetry: Telemetry = new Telemetry(id);
        this.telemetryService.AddTelemetry(telemetry);

        const vesselThresholds: Threshold[] = [];
        for(let i = 0; i < METRICS_COUNT; i++) {
            vesselThresholds[i] = new Threshold(DEFAULT_THRESHOLDS[i][0],
                DEFAULT_THRESHOLDS[i][1], DEFAULT_THRESHOLDS[i][2]
            );
            this.thresholdService.AddThreshold(vesselThresholds[i]);
        }

        const thresholds: Thresholds = {
            vesselId: id,
            pHThreshold: vesselThresholds[0],
            temperatureThreshold: vesselThresholds[1],
            dissolvedOxygenThreshold : vesselThresholds[2]
        }

        return new Vessel(id, telemetry, thresholds);
    }
}
