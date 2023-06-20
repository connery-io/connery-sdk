import { Module } from '@nestjs/common';
import { SharedModule } from '../shared/shared.module';
import { OpenAiController } from './openai.controller';
import { OpenAiService } from './openai.service';

@Module({
  imports: [SharedModule],
  controllers: [OpenAiController],
  providers: [OpenAiService],
})
export class OpenAiModule {}
