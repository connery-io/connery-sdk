import { Module } from '@nestjs/common';
import { ToolsController } from './tools.controller';
import { SharedModule } from ':src/shared/shared.module';

@Module({
  imports: [SharedModule],
  controllers: [ToolsController],
})
export class ToolsModule {}
