import { Injectable } from '@nestjs/common';
import { PacientesClient } from 'src/pacientes/clients/pacientes.client';
import { map, switchMap } from 'rxjs';
import { CirugiasClient } from './clients/cirugias.client';
import { CreateCirugiaDto, UpdateCirugiaDto } from './dto';
import { PaginationDto } from 'src/common';

@Injectable()
export class CirugiasOrchestrator {
  constructor(
    private readonly cirugiasClient: CirugiasClient,
    private readonly pacientesClient: PacientesClient,
  ) {}

   createCirugia(createCirugiaDto: CreateCirugiaDto) {
    return this.cirugiasClient.createCirugia(createCirugiaDto);
  }

   getAllCirugias(paginationDto: PaginationDto) {
    return this.cirugiasClient.getAllCirugias(paginationDto);
  }

   getCirugiaById(id: number) {
    return this.cirugiasClient.getCirugiaById(id).pipe(
      // Assuming cirugia has a pacienteId property
      switchMap((cirugia: any) => 
        this.pacientesClient.getPacienteById(cirugia.pacienteId).pipe(
          map((paciente: any) => ({
            ...cirugia,
            paciente
          }))
        )
      )
    );
  }

  updateCirugia(id: number, updateCirugiaDto: UpdateCirugiaDto) {
    return this.cirugiasClient.updateCirugia(id, updateCirugiaDto);
  }

  deleteCirugia(id: number) {
    return this.cirugiasClient.deleteCirugia(id);
  }
}
