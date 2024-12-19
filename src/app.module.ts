import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { PatientsModule } from './patients/patients.module';
import { AppService } from './app.service';

@Module({
  imports: [PatientsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
