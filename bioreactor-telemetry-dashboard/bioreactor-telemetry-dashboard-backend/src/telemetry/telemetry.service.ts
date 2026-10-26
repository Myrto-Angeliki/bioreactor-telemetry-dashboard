import { Injectable, NotFoundException } from '@nestjs/common';
import { Telemetry } from './telemetry.js';
import { SensorMetricsPayload } from "../custom-types.js";

@Injectable()
export class TelemetryService {
    private telemetries: Telemetry[] = [];

    findByVesselId(vesselId: string): SensorMetricsPayload {
        const telemetry = this.telemetries.find((telemetry) => 
            telemetry.getVesselId() === vesselId
        );
        if (!telemetry)
            throw new NotFoundException(`Telemetry not found for vessel id: ${vesselId}`);
        return telemetry.getSensorMetrics();
    }

    AddTelemetry(telemetry: Telemetry): void {
        this.telemetries.push(telemetry)
    }
}
