import { PassportStrategy } from '@nestjs/passport'
import { Injectable } from '@nestjs/common'
import { ExtractJwt, Strategy } from 'passport-jwt'
import { z } from 'zod'
import { EnvService } from '../env/env.service'

const userPayload = z.object({
  sub: z.string().uuid(),
  role: z.string(),
})

export type UserPayload = z.infer<typeof userPayload>

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(envService: EnvService) {
    const publicKey = envService.get('JWT_PUBLIC_KEY')

    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: Buffer.from(publicKey, 'base64'),
      algorithms: ['RS256'],
    })
  }

  // validar se o token tem o formato valido (alem de ser valido de acordo com o algoritmo)
  async validate(payload: UserPayload) {
    return userPayload.parse(payload)
  }
}
