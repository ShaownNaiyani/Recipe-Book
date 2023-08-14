import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

import { Ingredients } from "src/ingredients/schema/ingredients.schema";

export type RecipeDocument = Recipe & Document;

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