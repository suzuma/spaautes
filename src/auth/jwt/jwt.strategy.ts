import { ExtractJwt, Strategy } from 'passport-jwt';
import { Injectable } from "@nestjs/common";
import { PassportStrategy } from '@nestjs/passport';
import { jwtConstants } from './jwt.constants';



@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){
    constructor() {
        super({
          jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
          ignoreExpiration: false,
          secretOrKey: jwtConstants.secret,
        });
      }
      
        async validate(payload: any){
          console.log(payload.roles);
            return {
                userId: payload.sub,
                username: payload.username,     
                roles:payload.roles           
            }
        }
}