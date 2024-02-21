import { Public } from ':src/api/auth/auth.guard';
import { ObjectResponse } from ':src/types/api-types';
import { Controller, Get } from '@nestjs/common';
import { HealthCheckService, HealthCheck } from '@nestjs/terminus';

@Controller('/health')
export class HealthController {
  constructor(private health: HealthCheckService) {}

  @Public()
  @Get()
  @HealthCheck()
  async check(): Promise<ObjectResponse<undefined>> {
    await this.health.check([]);

    return {
      status: 'success',
      data: undefined,
    };
  }
}
