import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserDetails, UserDetailsDocument } from './schema/auth.schema';

@Injectable()
export class AuthService {
    constructor(@InjectModel("UserDetails") private userdetailsModel = Model<UserDetailsDocument>){}

    async getAll() : Promise<UserDetails[]>{
        return this.userdetailsModel.find().exec();
    }
}
