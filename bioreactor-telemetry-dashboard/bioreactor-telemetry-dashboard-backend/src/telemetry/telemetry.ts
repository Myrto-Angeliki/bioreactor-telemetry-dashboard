import * as constants from "../constants/sensor-metrics-limits.js";
import { SensorMetricsPayload } from "../custom-types.js";

export class Telemetry {
    private vesselId: string;
    private timestamp: string;
    private pH: number;
    private temperature: number;
    private dissolvedOxygen: number;

    constructor(vesselId: string) {
        this.vesselId = vesselId;
        this.randomizeSensorMetrics();
    }

    // returns a number in the range [lowerLimit, upperLimit) with decimal places equal to the 
    // decimalPlaces parameter value
    private getRandomValueInRange(lowerLimit: number, upperLimit: number,
        decimalPlaces: number
    ) {
        if(decimalPlaces < 0) return 0.0;
        const factor: number = 10 ** decimalPlaces;
        return Math.round(
            (Math.random() * (upperLimit - lowerLimit) + lowerLimit) *
            factor) / factor;
    }

    private randomizeSensorMetrics(): void {
        this.timestamp = new Date().toISOString();
        this.pH = this.getRandomValueInRange(
            constants.PH_LOW,
            constants.PH_HIGH, 1);
        this.temperature = this.getRandomValueInRange(
            constants.TEMPERATURE_LOW,
            constants.TEMPERATURE_HIGH, 1);
        this.dissolvedOxygen = this.getRandomValueInRange(
            constants.DISSOLVED_OXYGEN_LOW,
            constants.DISSOLVED_OXYGEN_HIGH, 2);
    }

    public getSensorMetrics(): SensorMetricsPayload {
        this.randomizeSensorMetrics();
        const payload = JSON.parse(JSON.stringify(this));
        return payload
    }

    public getVesselId(): string {
        return this.vesselId;
    }

    public getPH(): number {
        return this.pH;
    }

    public getTemperature(): number {
        return this.temperature;
    }

    public getDissolvedOxygen(): number {
        return this.dissolvedOxygen;
    }
}
