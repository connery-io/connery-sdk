import { Public } from ':src/shared/auth.guard';
import { ObjectResponse } from ':src/shared/types';
import { Controller, Get, HttpException, HttpStatus } from '@nestjs/common';
import { HealthCheckService, HealthCheck } from '@nestjs/terminus';

@Controller('/health')
export class HealthController {
  constructor(private health: HealthCheckService) {}

  @Public()
  @Get()
  @HealthCheck()
  async check(): Promise<ObjectResponse<undefined>> {
    try {
      await this.health.check([]);
    } catch (error: any) {
      // TODO: Replace with proper solution
      throw new HttpException(
        {
          status: 'error',
          error: {
            message: error.message,
          },
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    return {
      status: 'success',
      data: undefined,
    };
  }
}
