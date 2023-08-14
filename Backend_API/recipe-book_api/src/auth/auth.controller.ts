import { Controller, Get } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(private userDetails:AuthService){}

    
    @Get()
    async getAll(){
        return this.userDetails.getAll();
    }
}
