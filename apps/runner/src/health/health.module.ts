import { Module } from '@nestjs/common';
import { TerminusModule } from '@nestjs/terminus';
import { HttpModule } from '@nestjs/axios';
import { HealthController } from './health.controller';
import { SharedModule } from ':src/shared/shared.module';

@Module({
  imports: [TerminusModule, HttpModule, SharedModule],
  controllers: [HealthController],
})
export class HealthModule {}
