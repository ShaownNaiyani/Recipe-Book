
import { IsNotEmpty, IsNumber, IsString, MaxLength } from "class-validator";
import { Ingredients } from "../interface/ingredient.interface";

export class CreateRecipeDto{
    @IsString()
    @IsNotEmpty()
    @MaxLength(20)
    readonly name:string;

    @IsString()
    @IsNotEmpty()
    readonly description:string;

    @IsString()
    @IsNotEmpty()
    readonly imagePath:string;
    
    readonly ingredients : Ingredients[]; 
}