import { IsNotEmpty, IsNumber, IsString, MaxLength } from "class-validator";

export class CreateUserDto{
    @IsString()
    @IsNotEmpty()
    readonly email:string;

    @IsString()
    @IsNotEmpty()
    readonly password:string;

}