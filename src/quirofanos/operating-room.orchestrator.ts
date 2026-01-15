import { Injectable } from '@nestjs/common';
import { ChangeOperatingRoomStatusDto, CreateOperatingRoomDto, UpdateOperatingRoomDto } from './dto';
import { OperatingRoomClient } from './clients/operating-room.client';
import { PaginationDto } from 'src/common';

@Injectable()
export class OperatingRoomOrchestrator {
  constructor(private readonly operatingRoomClient: OperatingRoomClient) {}

  createOperatingRoom(createOperatingRoomDto: CreateOperatingRoomDto) {
    return this.operatingRoomClient.createOperatingRoom(createOperatingRoomDto);
  }

  getAllOperatingRooms(paginationDto: PaginationDto) {
    return this.operatingRoomClient.getAllOperatingRooms(paginationDto);
  }

  getOperatingRoomById(id: number) {
    return this.operatingRoomClient.getOperatingRoomById(id);
  }

  updateOperatingRoom(id: number, updateOperatingRoomDto: UpdateOperatingRoomDto) {
    return this.operatingRoomClient.updateOperatingRoom(id, updateOperatingRoomDto);
  }

  changeStatusOperatingRoom(id: number, changeOperatingRoomStatusDto: ChangeOperatingRoomStatusDto) {
    return this.operatingRoomClient.changeStatusOperatingRoom(id, changeOperatingRoomStatusDto);
  }
}
