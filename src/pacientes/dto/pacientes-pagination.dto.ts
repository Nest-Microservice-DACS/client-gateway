import { IsEnum, IsOptional } from "class-validator";
import { PaginationDto } from "src/common";
import { PacienteStatus, PacienteStatusList } from "../enum/pacientes.enum";

export class PacientePaginationDto extends PaginationDto {
    @IsOptional()
    @IsEnum(PacienteStatusList, {
        message: `Possible status values are ${PacienteStatusList.join(", ")}`,
    })
    status?: PacienteStatus;
}
