import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Recipe, RecipeDocument } from './schema/recipe.schema';
import { Model } from 'mongoose';

@Injectable()
export class RecipeService {

    constructor(@InjectModel("Recipe") private recipeModel: Model<RecipeDocument>){}

    async getRecipes() : Promise<Recipe[]>{
        return this.recipeModel.find().exec();
    }

    async StoreRecipe(recipes: Recipe){  
        console.log(recipes);
        const newRecipe = new this.recipeModel(recipes);  
        console.log(newRecipe);
        return newRecipe.save();
    }
}
