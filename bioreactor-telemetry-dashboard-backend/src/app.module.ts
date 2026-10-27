import { Module } from '@nestjs/common';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { VesselModule } from './vessel/vessel.module.js';
import { AuditLogModule } from './audit-log/audit-log.module.js';

@Module({
  imports: [VesselModule, AuditLogModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
