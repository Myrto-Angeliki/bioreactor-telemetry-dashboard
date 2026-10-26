import { Injectable, NotFoundException } from '@nestjs/common';
import { Threshold } from './threshold.js';
import { UpdateThresholdDto } from '../dtos/update-threshold-dto.js';

@Injectable()
export class ThresholdService {
    private thresholds: Threshold[] = [];

    findByMetricName(metricName: string) {
        const threshold = this.thresholds.find((threshold) => 
            threshold.getMetricName() === metricName
        );
        if (!threshold)
            throw new NotFoundException(
                `Threshold not found for metric name: '${metricName}'`);
        return threshold;
    }

    updateThresholdByMetricName(metricName: string,
        updateThresholdDto: UpdateThresholdDto
    ) {
        const threshold: Threshold = this.findByMetricName(metricName);
        threshold.updateValues(updateThresholdDto.minimumAllowedValue,
            updateThresholdDto.maximumAllowedValue
        );
    }

    AddThreshold(threshold: Threshold): void {
        this.thresholds.push(threshold);
    }
}
