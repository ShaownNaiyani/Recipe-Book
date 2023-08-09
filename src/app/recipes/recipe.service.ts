import { EventEmitter, Injectable } from "@angular/core";
import { Recipe } from "./recipe.model";
import { Ingredient } from "../shared/ingredient.model";
import { ShoppingListService } from "../shopping-list/shopping-list.service";
import { Subject } from "rxjs";

@Injectable()
export class RecipeService{


  recipeChanged = new Subject<Recipe[]>()

  //  private recipes: Recipe[] = [
  //       new Recipe( 'Burger',
  //                   'This is a Burger',
  //                   'https://www.thecookierookie.com/wp-content/uploads/2023/04/featured-stovetop-burgers-recipe.jpg',
  //                    [
  //                     new Ingredient('Chicken Meat',1),
  //                     new Ingredient('Sausage',2),
  //                     new Ingredient('Cheese',2)
  //                    ]),
                    
  //       new Recipe( 'Pizza',
  //                   'This is a Pizza',
  //                   'https://img.freepik.com/free-photo/top-view-pepperoni-pizza-with-mushroom-sausages-bell-pepper-olive-corn-black-wooden_141793-2158.jpg?w=2000',
  //                   [
  //                     new Ingredient('meat',1),
  //                     new Ingredient('sauce',2)
  //                   ])
  //     ];

  private recipes:Recipe[]=[];

      constructor(private slService:ShoppingListService){

      }

      setRecipes(recipes:Recipe[]){

          this.recipes= recipes;
          this.recipeChanged.next(this.recipes.slice());
        
      }
    
      getRecipes(){
        return this.recipes.slice();
      }

      getRecipe(index:number){

        return this.recipes[index];

      }

      onAddShoppinglist(ingredients:Ingredient[]){

        this.slService.addIngredients(ingredients);
        
      }

      addRecipe(recipe:Recipe){

        this.recipes.push(recipe);
        this.recipeChanged.next(this.recipes.slice())

      }

      updateRecipe(index:number, newRecipe: Recipe){

        this.recipes[index]=newRecipe;
        this.recipeChanged.next(this.recipes.slice());

      }

      deleteRecipe(index:number){
        this.recipes.splice(index,1);
        this.recipeChanged.next(this.recipes.slice())
      }
    

}