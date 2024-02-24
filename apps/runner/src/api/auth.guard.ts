import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  SetMetadata,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { LocalConfigService } from './services/local-config.service.js';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(@Inject(LocalConfigService) private config: LocalConfigService, private reflector: Reflector) {}

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
      isAccessAllowed = this.config.verifyAccess(apiKey);
    } catch (error: any) {
      throw new HttpException({ status: 'error', error: { message: error.message } }, HttpStatus.UNAUTHORIZED);
    }

    if (isAccessAllowed) {
      return true;
    } else {
      throw new HttpException({ status: 'error', error: { message: 'Unauthorized' } }, HttpStatus.UNAUTHORIZED);
    }
  }
}

// This is a custom decorator that we will use to mark routes as public
export const IS_PUBLIC_KEY = 'isPublic';
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);
