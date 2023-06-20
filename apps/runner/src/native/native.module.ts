import { Module } from '@nestjs/common';
import { NativeController } from './native.controller';
import { SharedModule } from '../shared/shared.module';

@Module({
  imports: [SharedModule],
  controllers: [NativeController],
})
export class NativeModule {}
