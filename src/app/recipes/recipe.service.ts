import { EventEmitter, Injectable } from "@angular/core";
import { Recipe } from "./recipe.model";
import {HttpClient} from '@angular/common/http'
import { Ingredient } from "../shared/ingredient.model";
import { ShoppingListService } from "../shopping-list/shopping-list.service";
import { Subject } from "rxjs";
import { MongoIdRecipe } from "./moidrecipe.model";

@Injectable()
export class RecipeService{


  recipeChanged = new Subject<Recipe[]>()
  fetchedRecipeChanged = new Subject<MongoIdRecipe[]>()
  
  private recipes:Recipe[]=[];
  private fetchRecipes:MongoIdRecipe[]=[];

      constructor(private http:HttpClient,private slService:ShoppingListService){}

      setRecipes(recipes:MongoIdRecipe[]){

          console.log(recipes);
          this.fetchRecipes = recipes
          this.fetchedRecipeChanged.next(this.fetchRecipes.slice());
        
      }
    
      getRecipes(){
        return this.recipes.slice();
      }

      getNewRecipe(index:number){

        return this.fetchRecipes[index];

      }

      getNewRecipes(){
        return this.fetchRecipes.slice();
      }

      onAddShoppinglist(ingredients:Ingredient[]){

        this.slService.addIngredients(ingredients);
        
      }

      addRecipe(recipe:Recipe){
        const fetchRecipe = { ...recipe, _id: 'abc' };

        this.recipes.push(recipe);
        this.fetchRecipes.push(fetchRecipe);
        this.fetchedRecipeChanged.next(this.fetchRecipes.slice());

      }

      updateRecipe(index:number, newRecipe: Recipe){

        this.recipes[index]=newRecipe;

        const mongoId = this.fetchRecipes[index]._id; 

        this.fetchRecipes[index].name = newRecipe.name;
        this.fetchRecipes[index].description = newRecipe.description;
        this.fetchRecipes[index].imagePath = newRecipe.imagePath;
        this.fetchRecipes[index].ingredients = newRecipe.ingredients;

        this.http.patch<MongoIdRecipe>(
              `http://localhost:3000/recipe/${mongoId}`,newRecipe
          ).subscribe(
              (response)=>{
                  console.log(response)
              }
          )
  
        this.fetchedRecipeChanged.next(this.fetchRecipes.slice());

        

      }

      deleteRecipe(index:number){

       const mongoId=this.fetchRecipes[index]._id;

       this.http.delete(
              `http://localhost:3000/recipe/${mongoId}`
          ).subscribe(
              (response)=>{
                  console.log(response)
              }
          )
        
        this.fetchRecipes.splice(index,1);
        this.fetchedRecipeChanged.next(this.fetchRecipes.slice());

      }

      
    

}

// function generateUniqueId() {
//   throw new Error("Function not implemented.");
// }
