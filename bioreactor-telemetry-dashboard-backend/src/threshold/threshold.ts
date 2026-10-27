export class Threshold {
    private metricName: string;
    private minimumAllowedValue: number;
    private maximumAllowedValue: number;

    constructor(metricName: string,
        minimumAllowedValue: number, maximumAllowedValue: number) {
        this.metricName = metricName;
        this.minimumAllowedValue = minimumAllowedValue;
        this.maximumAllowedValue = maximumAllowedValue;
    }

    public updateValues(newMinimum: number, newMaximum: number) : void {
        this.minimumAllowedValue = newMinimum;
        this.maximumAllowedValue = newMaximum;
    }

    public getMetricName(): string {
        return this.metricName;
    }

    public getMinimumAllowedValue(): number {
        return this.minimumAllowedValue;
    }

    public getMaximumAllowedValue(): number {
        return this.maximumAllowedValue;
    }
}
