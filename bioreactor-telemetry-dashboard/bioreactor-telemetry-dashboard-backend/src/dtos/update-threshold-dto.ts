import { IsNotEmpty, IsNumber, Max, Min, Validate } from "class-validator";
import { IsMinLessThanMaxConstraint } from "../custom-constraints/is-min-less-than-max-constraint.js";

function getMaxLimit(dto?: UpdateThresholdDto): number {
    const limit = dto ? dto.maximumAllowedValue - 1 : 0;
    return limit;
}

export class UpdateThresholdDto {
    @IsNumber()
    @IsNotEmpty()
    @Min(0)
    maximumAllowedValue: number;

    @IsNotEmpty()
    @IsNumber()
    @Min(0)
    minimumAllowedValue: number;

    @Validate(IsMinLessThanMaxConstraint)
    get validateLimits(){
        return {
            minimumAllowedValue: this.minimumAllowedValue,
            maximumAllowedValue: this.maximumAllowedValue
        }
    }

}
