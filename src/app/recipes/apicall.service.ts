import { EventEmitter, Injectable } from "@angular/core";
import { Recipe } from "./recipe.model";
import { Ingredient } from "../shared/ingredient.model";
import { ShoppingListService } from "../shopping-list/shopping-list.service";
import { Subject } from "rxjs";
import { MongoIdRecipe } from "./moidrecipe.model";
import { DataStorageService } from "../shared/data-storage.service";

@Injectable({providedIn:'root'})
export class ApiCallService{

    recipe: MongoIdRecipe 


  recipeChanged = new Subject<MongoIdRecipe[]>()
  recipeChanged1 = new Subject<Recipe[]>()
  
  private newrecipes:MongoIdRecipe[]=[];
  private recipes:Recipe[]=[];

      constructor(private slService:ShoppingListService,private dataStorageService:DataStorageService){}

      setRecipes(recipes:MongoIdRecipe[]){

          console.log(recipes);
          this.newrecipes=recipes;
          this.recipeChanged.next(this.newrecipes.slice());
        
      }
      getnewRecipes(){
        return this.newrecipes.slice();
      }
      getnewRecipe(id:string){
        this.dataStorageService.fetchRecipeById(id).subscribe( (data) =>{
            this.recipe._id = data._id;
            this.recipe.name = data.name;
            this.recipe.description = data.description;
            this.recipe.imagePath = data.imagePath;
            this.recipe.ingredients = data.ingredients;
          }
        )
        return this.recipe;
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
        this.recipeChanged1.next(this.recipes.slice())

      }

      updateRecipe(index:string, newRecipe: MongoIdRecipe){

        // this.recipes[index]=newRecipe;
        // this.recipeChanged.next(this.recipes.slice());

        

      }

      deleteRecipe(index:number){
        this.recipes.splice(index,1);
        this.recipeChanged1.next(this.recipes.slice());

      }
    

}