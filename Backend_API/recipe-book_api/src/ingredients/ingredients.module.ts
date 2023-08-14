import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { IngredientSchema } from './schema/ingredients.schema';

@Module({
    imports:[
       MongooseModule.forFeature([{
        name: 'Ingredients',
        schema :IngredientSchema,
        collection:'Ingredients'
       }])

    ]
})
export class IngredientsModule {}
