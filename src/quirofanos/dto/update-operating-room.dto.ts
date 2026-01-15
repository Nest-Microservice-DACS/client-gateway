import { PartialType } from '@nestjs/mapped-types';
import { CreateOperatingRoomDto } from './create-operating-room.dto';
import {  } from '../enum/operating-room.enum';

export class UpdateOperatingRoomDto extends PartialType(CreateOperatingRoomDto) {
}
