import { IsArray, IsNotEmpty, ValidateNested } from "class-validator";
import { UpdateThresholdDto } from "./update-threshold-dto.js";
import { Type } from "class-transformer";

export class UpdateThresholdsDto {

    @IsNotEmpty()
    @IsArray()
    @Type(() => UpdateThresholdDto)
    @ValidateNested({ each: true })
    newThresholds: UpdateThresholdDto[];
}
