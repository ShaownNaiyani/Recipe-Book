import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export type UserDetailsDocument= UserDetails & Document; // here UserDetails is class name
@Schema({collection:'UserDetails'})  // here UserDetails is database table/collection name
export class UserDetails{
    @Prop()
    email: string;
    @Prop()
    password:string;
}

export const UserDetailsSchema = SchemaFactory.createForClass(UserDetails);
