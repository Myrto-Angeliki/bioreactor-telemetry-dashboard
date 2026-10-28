import { Module } from '@nestjs/common';
import { VesselController } from './vessel.controller.js';
import { VesselService } from './vessel.service.js';
import { TelemetryService } from '../telemetry/telemetry.service.js';
import { ThresholdService } from '../threshold/threshold.service.js';
import { VesselFactory } from './vessel.factory.js';
import { AuditLogModule } from '../audit-log/audit-log.module.js';
import { ThresholdModule } from '../threshold/threshold.module.js';

@Module({
  imports: [AuditLogModule, ThresholdModule, ThresholdModule],
  controllers: [VesselController],
  providers: [VesselService, TelemetryService, ThresholdService, VesselFactory],
})
export class VesselModule {}
