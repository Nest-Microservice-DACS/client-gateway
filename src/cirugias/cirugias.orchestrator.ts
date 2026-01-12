import { Injectable } from '@nestjs/common';
import { CirugiasClient } from './cirugias.client';
import { PacientesClient } from 'src/pacientes/pacientes.client';
import { map, switchMap } from 'rxjs';

@Injectable()
export class CirugiasOrchestrator {
  constructor(
    private readonly cirugiasClient: CirugiasClient,
    private readonly pacientesClient: PacientesClient,
  ) {}

   createCirugia(dto: any) {
    return this.cirugiasClient.createCirugia(dto);
  }

   getAllCirugias(paginationDto: any) {
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

  updateCirugia(id: number, dto: any) {
    return this.cirugiasClient.updateCirugia(id, dto);
  }

  deleteCirugia(id: number) {
    return this.cirugiasClient.deleteCirugia(id);
  }
}
