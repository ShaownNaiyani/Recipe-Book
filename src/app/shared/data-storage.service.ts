
import { Injectable } from "@angular/core";
import {HttpClient} from '@angular/common/http'
import { Recipe } from "../recipes/recipe.model";
import { RecipeService } from "../recipes/recipe.service";
import { map, tap} from "rxjs/operators";
import { MongoIdRecipe } from "../recipes/moidrecipe.model";


@Injectable({providedIn:'root'})
export class DataStorageService{

    constructor(private http:HttpClient,
                private recipeService:RecipeService){}

    storeRecipe(){

        const recipes = this.recipeService.getRecipes()
        return this.http
        .post('http://localhost:3000/recipe',recipes)
        .subscribe(
            (response)=>{
                console.log(response)
            }
        )
    
    }

    fetchRecipeAll(){

            return this.http
                .get<Recipe[]>(
                    'http://localhost:3000/recipe'
                ).pipe(
                        map( recipes =>{
                            return recipes.map(recipe =>{
                                return {...recipe,ingredients: recipe.ingredients ? recipe.ingredients : []}
                            });
                        }),

                        tap( recipes =>{

                            console.log(recipes);
                            this.recipeService.setRecipes(recipes)
                        }),

                      )
        
    }

    fetchRecipeById(id:string){
        return this.http.get<MongoIdRecipe>(
            `http://localhost:3000/recipe/${id}`
        )
    }

    updateRecipeById(id:string,recipe:MongoIdRecipe){
        return this.http.patch<MongoIdRecipe>(
            `http://localhost:3000/recipe/${id}`,recipe
        ).subscribe(
            (response)=>{
                console.log(response)
            }
        )

    }

    deleteReipeById(id:string){
        return this.http.delete(
            `http://localhost:3000/recipe/${id}`
        ).subscribe(
            (response)=>{
                console.log(response)
            }
        )
    }



}