import { Body, Controller,Get,Post } from '@nestjs/common';
import { RecipeService } from './recipe.service';
import { Recipe } from './schema/recipe.schema';

@Controller('recipe')
export class RecipeController {

    constructor(private recipeService:RecipeService){};

    @Get()
    async getAll(){
        return this.recipeService.getRecipes();
    }

    @Post()
    async StoreRecipes(@Body() recipes:Recipe){

        // console.log(recipes);

        return this.recipeService.StoreRecipe(recipes);

    }


}
