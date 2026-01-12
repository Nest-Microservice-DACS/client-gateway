import { IsEnum, IsOptional } from "class-validator";
import { PaginationDto } from "src/common";
import { PersonalStatus, PersonalStatusList } from "../enum/personal.enum";


export class PersonalPaginationDto extends PaginationDto {
        @IsOptional()
        @IsEnum(PersonalStatusList, {
            message: `Possible status values are ${PersonalStatusList.join(", ")}`,
        })
        status?: PersonalStatus;
}