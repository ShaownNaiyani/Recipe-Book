import { Document } from "mongoose";
import { Ingredients } from "./ingredient.interface";



export interface IRecipe extends Document {

    readonly name:string;
    readonly description:string;
    readonly imagePath:string;
    readonly ingredients : Ingredients[]; 

}