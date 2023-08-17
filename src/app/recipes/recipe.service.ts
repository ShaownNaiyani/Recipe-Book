import { EventEmitter, Injectable } from "@angular/core";
import { Recipe } from "./recipe.model";
import { Ingredient } from "../shared/ingredient.model";
import { ShoppingListService } from "../shopping-list/shopping-list.service";
import { Subject } from "rxjs";
import { MongoIdRecipe } from "./moidrecipe.model";

@Injectable()
export class RecipeService{


  recipeChanged = new Subject<Recipe[]>()
  
  private recipes:Recipe[]=[];

      constructor(private slService:ShoppingListService){}

      setRecipes(recipes:Recipe[]){

          console.log(recipes);

          this.recipes= recipes;
          this.recipeChanged.next(this.recipes.slice());
        
      }
    
      getRecipes(){
        return this.recipes.slice();
      }

      getRecipe(index:string){

        return this.recipes[index];

      }

      onAddShoppinglist(ingredients:Ingredient[]){

        this.slService.addIngredients(ingredients);
        
      }

      addRecipe(recipe:Recipe){

        this.recipes.push(recipe);
        this.recipeChanged.next(this.recipes.slice())

      }

      updateRecipe(index:string, newRecipe: Recipe){

        // this.recipes[index]=newRecipe;
        // this.recipeChanged.next(this.recipes.slice());

        

      }

      deleteRecipe(index:number){
        this.recipes.splice(index,1);
        this.recipeChanged.next(this.recipes.slice());

      }
    

}