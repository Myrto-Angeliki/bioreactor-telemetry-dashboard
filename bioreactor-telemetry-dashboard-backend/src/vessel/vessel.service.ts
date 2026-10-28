import { Injectable, NotFoundException } from '@nestjs/common';
import { Vessel } from './vessel.js';
import { ThresholdService } from '../threshold/threshold.service.js';
import { VesselFactory } from './vessel.factory.js';
import { TelemetryService } from '../telemetry/telemetry.service.js';
import { UpdateThresholdsDto } from '../dtos/update-thresholds-dto.js';
import { AuditLogService } from '../audit-log/audit-log.service.js';
import { METRICS_COUNT, METRICS_NAMES, Thresholds } from '../constants/vessel-constants.js';
import { Threshold } from '../threshold/threshold.js';

@Injectable()
export class VesselService {
    private defaultVessel1: Vessel;
    private defaultVessel2: Vessel;

    constructor(private readonly telemetryService : TelemetryService,
            private readonly thresholdService : ThresholdService,
            private readonly vesselFactory: VesselFactory,
            private readonly auditLogService: AuditLogService
        ) {
            this.vessels.push(this.vesselFactory.createVessel("BIO-001"));
            this.vessels.push(this.vesselFactory.createVessel("BIO-002"));
        }

    private vessels: Vessel[] = [];

    findById(id: string) {
        const vessel = this.vessels.find((vessel) =>
            vessel.getId() === id
        );
        if (!vessel)
            throw new NotFoundException(`Vessel not found with id: ${id}`);
        return vessel;
    }

    findTelemetryById(id: string) {
        const vessel: Vessel = this.findById(id);
        return this.telemetryService.findByVesselId(id);
    }

    findThresholdsById(id: string) {
        const vessel: Vessel = this.findById(id);
        return vessel.getThresholds();
    }

    private getThresholdsCopy(thresholdsToCopy: Thresholds): Thresholds {
        const pHThresholdCopy: Threshold = new Threshold(
            'pH', thresholdsToCopy.pHThreshold.getMinimumAllowedValue(),
            thresholdsToCopy.pHThreshold.getMaximumAllowedValue()
        );

        const temperatureThresholdCopy: Threshold = new Threshold(
            'temperature', thresholdsToCopy.temperatureThreshold.getMinimumAllowedValue(),
            thresholdsToCopy.temperatureThreshold.getMaximumAllowedValue()
        );

        const dissolvedOxygenThresholdCopy: Threshold = new Threshold(
            'dissolvedOxygen', 
            thresholdsToCopy.dissolvedOxygenThreshold.getMinimumAllowedValue(),
            thresholdsToCopy.dissolvedOxygenThreshold.getMaximumAllowedValue()
        );

        const thresholdsCopy: Thresholds = {
            vesselId: thresholdsToCopy.vesselId,
            pHThreshold: pHThresholdCopy,
            temperatureThreshold: temperatureThresholdCopy,
            dissolvedOxygenThreshold: dissolvedOxygenThresholdCopy
        };
        return thresholdsCopy;
    }

    updateThresholdsById(id: string, updateThresholdsDto: UpdateThresholdsDto) {
        const vessel: Vessel = this.findById(id);
        const oldThreshHoldValues = this.getThresholdsCopy(vessel.getThresholds());

        vessel.getThresholds().pHThreshold.updateValues(
                updateThresholdsDto.newThresholds[0].minimumAllowedValue,
                updateThresholdsDto.newThresholds[0].maximumAllowedValue
            )
        vessel.getThresholds().temperatureThreshold.updateValues(
                updateThresholdsDto.newThresholds[1].minimumAllowedValue,
                updateThresholdsDto.newThresholds[1].maximumAllowedValue
            )
        vessel.getThresholds().dissolvedOxygenThreshold.updateValues(
                updateThresholdsDto.newThresholds[2].minimumAllowedValue,
                updateThresholdsDto.newThresholds[2].maximumAllowedValue
            )
        for(let i=0; i<METRICS_COUNT; i++) {
            this.thresholdService.updateThresholdByMetricName(
                METRICS_NAMES[i],
                updateThresholdsDto.newThresholds[i]
            );
        }
        const newThreshHoldValues = this.getThresholdsCopy(vessel.getThresholds());
        this.auditLogService.addAuditLog(oldThreshHoldValues, newThreshHoldValues);
        
        return newThreshHoldValues;
    }
}
