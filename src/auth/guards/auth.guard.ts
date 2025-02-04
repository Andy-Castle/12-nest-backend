import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    // console.log({ request });

    const token = this.extractTokenFromHeader(request);

    console.log({ token });

    // if (!token) {
    //   throw new UnauthorizedException();
    // }
    // try {
    //   const payload = await this.jwtService.verifyAsync(
    //     token,
    //     {
    //       secret: jwtConstants.secret
    //     }
    //   );

    //   request['user'] = payload;
    // } catch {
    //   throw new UnauthorizedException();
    // }
    // return true;

    return Promise.resolve(true);
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers['authorization']?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
