import { Public } from ':src/shared/auth.guard';
import { Controller, Get } from '@nestjs/common';
import { HealthCheckService, HealthCheck } from '@nestjs/terminus';

type HealthResponse = {
  status: 'ok' | 'error';
};

@Controller('/health')
export class HealthController {
  constructor(private health: HealthCheckService) {}

  @Public()
  @Get()
  @HealthCheck()
  async check(): Promise<HealthResponse> {
    try {
      await this.health.check([]);
    } catch (error) {
      return {
        status: 'error',
      };
    }

    return {
      status: 'ok',
    };
  }
}
