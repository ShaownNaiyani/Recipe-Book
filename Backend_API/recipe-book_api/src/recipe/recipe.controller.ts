import { Body, Controller,Delete,Get,Param,Patch,Post, Put } from '@nestjs/common';
import { RecipeService } from './recipe.service';
import { Recipe } from './schema/recipe.schema';
import { CreateRecipeDto } from './dto/create-recipe.dto';
import { UpdateRecipeDto } from './dto/update-recipe.dto';

@Controller('recipe')
export class RecipeController {

    constructor(private recipeService:RecipeService){};

    @Get()
    async getAll(){
        return this.recipeService.getRecipes();
    }

    @Get('/:id')
    async getSingleRecipe(@Param('id')recipeId:string){
        return await this.recipeService.getRecipe(recipeId);
    }

    @Post()
    async StoreRecipes(@Body() recipes:CreateRecipeDto[]){

        return await this.recipeService.createRecipes(recipes);

    }

    @Patch('/:id')

    async UpdateRecipe(@Param('id')recipeId:string,@Body()updateRecipeDto:UpdateRecipeDto){

        return  await this.recipeService.UpdateRecipe(recipeId,updateRecipeDto);

    }

    @Delete('/:id')
    async DeleteRecipe(@Param('id')recipeId:string){

        return  await this.recipeService.DeleteRecipe(recipeId);

    }




}
