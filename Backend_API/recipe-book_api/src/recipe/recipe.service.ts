import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Recipe } from './schema/recipe.schema';
import { Model } from 'mongoose';
import { IRecipe } from './interface/recipe.interface';
import { CreateRecipeDto } from './dto/create-recipe.dto';
import { UpdateRecipeDto } from './dto/update-recipe.dto';

@Injectable()
export class RecipeService {

    constructor(@InjectModel("Recipe") private recipeModel: Model<IRecipe>){}

    async getRecipes() : Promise<IRecipe[]>{
        return await this.recipeModel.find().exec();
    }

    async getRecipe(recipeId:string) :Promise<IRecipe>{
        return await this.recipeModel.findById(recipeId).exec();
    } 

    async  createRecipes(recipes: CreateRecipeDto[]): Promise<IRecipe[]> {
        const savedRecipes: IRecipe[] = [];
    
        for (const recipe of recipes) {
            try {
                const newRecipe = new this.recipeModel(recipe);
                const savedRecipe = await newRecipe.save();
                savedRecipes.push(savedRecipe);
            } catch (error) {
                console.error(`Error saving recipe: ${error}`);
            }
        }
    
        return savedRecipes;
    }

    async UpdateRecipe(recipeId: string,updateRecipeDto: UpdateRecipeDto):Promise<IRecipe>{

        const exitRecipe = await this.recipeModel.findByIdAndUpdate(recipeId,updateRecipeDto,{new:true});
        return exitRecipe;
            
    }

    async DeleteRecipe(recipeId: string):Promise<IRecipe>{

        const exitRecipe = await this.recipeModel.findByIdAndDelete(recipeId);
        return exitRecipe;
            
    }
}
