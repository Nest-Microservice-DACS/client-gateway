import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';

@Controller('cirugias')
export class CirugiasController {
  constructor() {}

  @Post()
  createCirugia(@Body() createData: any) {
    return 'This action adds a new cirugia';
  }   

  @Get()
  getAllCirugias() {
    return 'This action returns all cirugias';
  }

  @Get(':id')
  getCirugiaById(@Param('id') id: string) {
    return 'This action returns a cirugia by id';
  }

  @Patch(':id')
  updateCirugia(@Param('id') id: string, @Body() updateData: any) {
    return 'This action updates a cirugia';
  }

  @Delete(':id')
  deleteCirugia(@Param('id') id: string) {
    return 'This action deletes a cirugia';
  }
}
