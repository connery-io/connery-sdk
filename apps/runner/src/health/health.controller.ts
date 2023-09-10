import { Public } from ':src/shared/auth.guard';
import { Controller, Get } from '@nestjs/common';
import { HealthCheckService, HealthCheck } from '@nestjs/terminus';

type HealthResponse = {
  status: 'ok';
};

// TODO: Move to the shared types
type ErrorResponse = {
  status: 'error';
  error: {
    message: string;
  };
};

@Controller('/health')
export class HealthController {
  constructor(private health: HealthCheckService) {}

  @Public()
  @Get()
  @HealthCheck()
  async check(): Promise<HealthResponse | ErrorResponse> {
    try {
      await this.health.check([]);
    } catch (error: any) {
      return {
        status: 'error',
        error: {
          message: error.message,
        },
      };
    }

    return {
      status: 'ok',
    };
  }
}
