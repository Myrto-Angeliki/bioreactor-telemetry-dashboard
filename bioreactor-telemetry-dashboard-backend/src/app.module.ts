import { Module } from '@nestjs/common';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { VesselModule } from './vessel/vessel.module.js';
import { AuditLogModule } from './audit-log/audit-log.module.js';
import { ThresholdModule } from './threshold/threshold.module.js';
import { TelemetryModule } from './telemetry/telemetry.module.js';

@Module({
  imports: [VesselModule, AuditLogModule, ThresholdModule, TelemetryModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
