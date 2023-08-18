import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";


@Schema({collection:'UserDetails'})

export class UserDetails{

    @Prop()
    email:string;

    @Prop()
    password:string;

}

export const UserSchema = SchemaFactory.createForClass(UserDetails);