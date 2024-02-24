import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import config from '../connery-runner.config';
import { ActionsController } from './controllers/actions.controller';
import { PluginsController } from './controllers/plugins.controller';
import { ToolsController } from './controllers/tools.controller';
import { TerminusModule } from '@nestjs/terminus';
import { HttpModule } from '@nestjs/axios';
import { OpenAiSpecsService } from './services/openai-specs.service';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './auth.guard';
import { LocalConfigService } from './services/local-config.service';
import { OpenAiController } from './controllers/openai.controller';

@Module({
  imports: [
    TerminusModule, // required for health checks
    HttpModule, // required for health checks
    ConfigModule.forRoot({
      load: [config],
    }),
    ConfigModule,
  ],
  controllers: [ActionsController, OpenAiController, PluginsController, ToolsController],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    OpenAiSpecsService,
    LocalConfigService,
  ],
})
export class AppModule {
  // TODO: refactor
  //private plugin: Plugin;
  //
  //configure(pluginDefinition: PluginDefinition) {
  //  this.plugin = new Plugin(pluginDefinition);
  //}
}
