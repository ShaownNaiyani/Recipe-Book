import { Body, Controller, HttpStatus, Post ,Res} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UserService } from './user.service';
import { response } from 'express';

@Controller('user')
export class UserController {

    constructor(private userService: UserService){}

    @Post()
    async signUp(@Res()response,@Body()user:CreateUserDto){
        try {
            const newUser = await this.userService.CreateUser(user);
            return response.status(HttpStatus.CREATED).json({
            message: 'User has been created successfully',
            newUser,});
         } catch (err) {
            return response.status(HttpStatus.BAD_REQUEST).json({
            statusCode: 400,
            message: 'Error: Email Already Registered!',
            error: 'Bad Request'
         });
         }

    }
}
