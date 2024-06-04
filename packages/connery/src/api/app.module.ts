import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ActionsController } from './controllers/actions.controller.js';
import { PluginController } from './controllers/plugin.controller.js';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './auth.guard.js';
import { PluginService } from './services/plugin.service.js';
import { PluginConfigService } from './services/plugin-config.service.js';
import { HomeController } from './controllers/home.controller.js';

@Module({
  imports: [ConfigModule.forRoot({ validate: PluginConfigService.validateEnvConfig }), ConfigModule],
  controllers: [HomeController, ActionsController, PluginController],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    PluginService,
    PluginConfigService,
  ],
})
export class AppModule {}
