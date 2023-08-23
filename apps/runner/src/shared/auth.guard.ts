import { CanActivate, ExecutionContext, HttpException, HttpStatus, Injectable, SetMetadata } from '@nestjs/common';
import { LocalConfigService } from './local-config.service';
import { Reflector } from '@nestjs/core';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private configService: LocalConfigService, private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    // Allow access to public routes
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) {
      return true;
    }

    // Check API key for private routes
    const request = context.switchToHttp().getRequest();
    const apiKey = request.headers['x-api-key'];

    let isAccessAllowed = false;
    try {
      isAccessAllowed = this.configService.verifyAccess(apiKey);
    } catch (e: any) {
      throw new HttpException(
        {
          status: 'error',
          error: {
            message: e.message,
          },
        },
        HttpStatus.UNAUTHORIZED,
      );
    }

    if (isAccessAllowed) {
      return true;
    } else {
      throw new HttpException(
        {
          status: 'error',
          error: {
            message: 'Unauthorized',
          },
        },
        HttpStatus.UNAUTHORIZED,
      );
    }
  }
}

// This is a custom decorator that we will use to mark routes as public
export const IS_PUBLIC_KEY = 'isPublic';
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);
