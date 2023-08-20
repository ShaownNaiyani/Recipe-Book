import { Controller, Post,Body, HttpCode, UseGuards,Request } from '@nestjs/common';
import { AuthService } from '../user/auth.service';
import { LocalStrategy } from '../user/local.strategy';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {


   

   
}
