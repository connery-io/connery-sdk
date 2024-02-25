import { CanActivate, ExecutionContext, Injectable, SetMetadata, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Reflector } from '@nestjs/core';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private reflector: Reflector, private configService: ConfigService) {}

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
    if (!apiKey) throw new UnauthorizedException('API key is not provided in the x-api-key request header.');

    // TODO: move to centralized config and validate on startup
    const envApiKey = this.configService.get<string>('API_KEY');
    if (!envApiKey) throw new Error('The API_KEY environment variable is not defined.');

    const isAccessAllowed = envApiKey === apiKey;
    if (isAccessAllowed) {
      return true;
    } else {
      throw new UnauthorizedException('API key is not valid.');
    }
  }
}

// This is a custom decorator that we will use to mark routes as public
export const IS_PUBLIC_KEY = 'isPublic';
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);
