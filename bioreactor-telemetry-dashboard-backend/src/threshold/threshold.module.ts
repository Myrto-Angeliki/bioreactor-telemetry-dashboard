import { Module } from '@nestjs/common';
import { ThresholdService } from './threshold.service.js';

@Module({
    providers: [ThresholdService]
})
export class ThresholdModule {}
