import { IsEnum, IsOptional } from "class-validator";
import { PaginationDto } from "src/common";
import { PatientStatus, PatientStatusList } from "../enum/patient.enum";

export class PatientPaginationDto extends PaginationDto {
    @IsOptional()
    @IsEnum(PatientStatusList, {
        message: `Possible status values are ${PatientStatusList.join(", ")}`,
    })
    status?: PatientStatus;
}
