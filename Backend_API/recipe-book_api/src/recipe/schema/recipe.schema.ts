import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Ingredients } from "../interface/ingredient.interface";



@Schema({collection:'Recipe'})
export class Recipe {

    @Prop()
    name:string;
    @Prop()
    description:string;
    @Prop()
    imagePath:string;
    @Prop()
    ingredients : Ingredients[];


}

export const RecipeSchema = SchemaFactory.createForClass(Recipe);