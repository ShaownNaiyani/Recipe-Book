import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IUser } from './interface/user.interface';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserService {

    constructor(@InjectModel("UserDetails") private userModel: Model<IUser>){}

    async CreateUser(user : CreateUserDto){

        const userEmailExist = await this.userModel.findOne({
            email: user.email,
          });

        if(!userEmailExist ){
            const newUser = new this.userModel(user);
            const saveUser = await newUser.save();
            return saveUser;
        }
        else
        {
            throw new Error('User with this email already exists.'); 
        }
    }

    async findUser(useremail: string): Promise<IUser | undefined> {
        return this.userModel.findOne({ email: useremail });
    }
    
}
