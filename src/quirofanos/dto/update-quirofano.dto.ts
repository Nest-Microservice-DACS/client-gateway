import { PartialType } from '@nestjs/mapped-types';
import { CreateQuirofanoDto } from './create-quirofano.dto';
import { QuirofanoEstado } from '../enum/quirofano.enum';

export class UpdateQuirofanoDto extends PartialType(CreateQuirofanoDto) {
}
