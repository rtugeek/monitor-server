import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common'
import { Observable } from 'rxjs'
import { TokenService } from './token.service'

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly tokenService: TokenService) {
  }

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest()
    let token = request.headers['token']
    if (!token) {
      const { token: queryToken } = request.query
      token = queryToken
    }
    return token === this.tokenService.token
  }
}
