import { Injectable } from '@nestjs/common';
import { CreatePatientDto } from './dto/create-patient.dto';
import { UpdatePatientDto } from './dto/update-patient.dto';
import { Patient } from './entities/patient.entity';

@Injectable()
export class PatientsService {
  private patients: Patient[] = [];
  private idCounter = 1;

  create(createPatientDto: CreatePatientDto): Patient {
    const newPatient: Patient = {
      id: this.idCounter++,
      ...createPatientDto,
    };
    this.patients.push(newPatient);
    return newPatient;
  }

  findAll(): Patient[] {
    return this.patients.map(patient => this.transformPatientData(patient));
  }

  findOne(id: number): Patient {
    const patient = this.patients.find(patient => patient.id === id);
    return patient ? this.transformPatientData(patient) : null;
  }

  update(id: number, updatePatientDto: UpdatePatientDto): Patient {
    const patientIndex = this.patients.findIndex(patient => patient.id === id);
    if (patientIndex === -1) {
      return null;
    }
    const updatedPatient = { ...this.patients[patientIndex], ...updatePatientDto };
    this.patients[patientIndex] = updatedPatient;
    return this.transformPatientData(updatedPatient);
  }

  remove(id: number): void {
    this.patients = this.patients.filter(patient => patient.id !== id);
  }

  private transformPatientData(patient: Patient): any {
    return {
      ...patient,
      status: patient.age < 18 ? 'Minor' : 'Adult',
      fullName: `${patient.name} (ID: ${patient.id})`,
    };
  }
}