import { HttpException, HttpStatus, Injectable} from '@nestjs/common';
const bcrypt = require('bcrypt');
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {

    constructor(private userService:UserService) {}

    async registerUser(createUser: CreateUserDto){
       const hashedPassword = await bcrypt.hash(createUser.password,10);
       try {
            const newUser = await this.userService.CreateUser(
              {
                ...createUser,password:hashedPassword
              }
            );

           newUser.password = undefined;
           return newUser; 
       } catch (error) {
            throw new HttpException({message:'Email_Exists'},HttpStatus.NOT_FOUND);
        
       }

    }

    async getAuthUser(username: string, password: string): Promise<any> {

          try {
                const user = await this.userService.findUser(username);

                const isPasswordMatched = await bcrypt.compare(password,user.password);

                console.log(isPasswordMatched);

                if(!isPasswordMatched)
                {
                  throw new HttpException({message:'Wrong_Password_or_Username'},HttpStatus.BAD_REQUEST)
                }

                user.password = undefined;

                return user;
              
            
          } catch (error) {

                throw new HttpException({message:'Wrong_Password_or_Username'},HttpStatus.INTERNAL_SERVER_ERROR);
            
          }
        
      } 

}
