import { Body, Controller, Get, Param, Put } from '@nestjs/common';
import { VesselService } from './vessel.service.js';
import { UpdateThresholdsDto } from '../dtos/update-thresholds-dto.js';

@Controller('vessels')
export class VesselController {
    constructor(private readonly vesselService: VesselService,
    ) {}

    @Get(':id/telemetry')
    getTelemetryById(@Param('id') id: string) {
        return this.vesselService.findTelemetryById(id);
    }

    @Get(':id/thresholds')
    getThresholdsById(@Param('id') id: string) {
        return this.vesselService.findThresholdsById(id);
    }

    @Put(':id/thresholds')  
    updateThresholdsById(@Param('id') id: string, 
            @Body() updateThresholdsDto: UpdateThresholdsDto) {
        return this.vesselService.updateThresholdsById(id, updateThresholdsDto);
    }

}
