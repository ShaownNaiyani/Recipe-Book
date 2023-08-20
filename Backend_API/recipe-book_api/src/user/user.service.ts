import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
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
            throw new HttpException({message:'Email_Exists'},HttpStatus.NOT_FOUND);
        }
    }

    async findUser(useremail: string): Promise<IUser | undefined> {
        const existUser=this.userModel.findOne({ email: useremail });

        if(!existUser)
        {
            throw new HttpException({message:'User_not_found'},HttpStatus.NOT_FOUND);
        }

        return existUser;


    }
    
}
