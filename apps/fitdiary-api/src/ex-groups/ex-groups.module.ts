import { Module } from '@nestjs/common';
import { ExGroupsService } from './ex-groups.service';
import { ExGroupsController } from './ex-groups.controller';

@Module({
  controllers: [ExGroupsController],
  providers: [ExGroupsService],
})
export class ExGroupsModule {}
