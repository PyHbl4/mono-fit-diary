import { Module } from '@nestjs/common';
import { WeightDataService } from './weight-data.service';
import { WeightDataController } from './weight-data.controller';

@Module({
  controllers: [WeightDataController],
  providers: [WeightDataService],
})
export class WeightDataModule {}
