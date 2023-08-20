import { Body, Controller,UseGuards, Post ,Request,HttpException,HttpStatus} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { AuthService } from 'src/user/auth.service';
import { LocalStrategy } from 'src/user/local.strategy';
import { AuthGuard } from '@nestjs/passport';

@Controller('user')
export class UserController {


    
    constructor(private authService:AuthService,private localStrategy:LocalStrategy){}


    @Post('signup')
    async RegisterUser(@Body()user:CreateUserDto){

        try {

            return await this.authService.registerUser(user);
            
        } catch (error) {

            throw new HttpException({message:'Email_Exists'},HttpStatus.NOT_FOUND);
            
        }

      
    }

    @UseGuards(AuthGuard('local'))
    @Post('login')
    async login(@Body() user:CreateUserDto) {
        try {
            return await this.localStrategy.validate(user.email,user.password);
            
        } catch (error) {
            throw new HttpException({message:'Wrong_Password_or_Username'},HttpStatus.BAD_REQUEST)
            
        }
      
    }
}
