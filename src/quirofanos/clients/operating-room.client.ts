import { Injectable, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { OPERATING_ROOM_SERVICE } from 'src/config';
import { ChangeOperatingRoomStatusDto, UpdateOperatingRoomDto } from '../dto';


@Injectable()
export class OperatingRoomClient {
  constructor(
    @Inject(OPERATING_ROOM_SERVICE)
    private readonly operatingRoomClient: ClientProxy,
  ) {}

  createOperatingRoom(dto: any) {
    return this.operatingRoomClient.send({ cmd: 'create_operating_room' }, dto);
  }

  getAllOperatingRooms(paginationDto: any) {
    return this.operatingRoomClient.send({ cmd: 'get_operating_rooms' }, paginationDto);
  }

  getOperatingRoomById(id: number) {
    return this.operatingRoomClient.send({ cmd: 'get_operating_room_by_id' },  id );
  }

  updateOperatingRoom(id: number, updateOperatingRoomDto: UpdateOperatingRoomDto) {
    return this.operatingRoomClient.send({ cmd: 'update_operating_room' }, { id, ...updateOperatingRoomDto });
  }

  changeStatusOperatingRoom(id: number, changeOperatingRoomStatusDto: ChangeOperatingRoomStatusDto) {
    return this.operatingRoomClient.send({ cmd: 'change_operating_room_status' },  { id, ...changeOperatingRoomStatusDto });
  }
}
