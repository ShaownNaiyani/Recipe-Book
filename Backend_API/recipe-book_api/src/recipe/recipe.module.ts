import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Recipe, RecipeSchema } from './schema/recipe.schema';
import { RecipeService } from './recipe.service';
import { RecipeController } from './recipe.controller';

@Module({
    imports:[
        MongooseModule.forFeature([{
            name:'Recipe',
            schema: RecipeSchema,
            collection:'Recipe'
        }])
    ],
    providers: [RecipeService],
    controllers: [RecipeController]
})
export class RecipeModule {}
