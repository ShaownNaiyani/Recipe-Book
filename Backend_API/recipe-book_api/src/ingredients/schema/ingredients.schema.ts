import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export type IngredientDocument = Ingredients & Document;
@Schema({collection:'Ingredients'})

export class Ingredients{
    @Prop()
    public name: string;
    @Prop()
    public amount: number;
}

export const IngredientSchema = SchemaFactory.createForClass(Ingredients)
