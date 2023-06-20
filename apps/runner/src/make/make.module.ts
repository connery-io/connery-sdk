import { Module } from '@nestjs/common';
import { MakeController } from './make.controller';
import { MakeService } from './make.service';
import { SharedModule } from '../shared/shared.module';

@Module({
  imports: [SharedModule],
  controllers: [MakeController],
  providers: [MakeService],
})
export class MakeModule {}
