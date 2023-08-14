
import { Injectable } from "@angular/core";
import {HttpClient, HttpParams} from '@angular/common/http'
import { Recipe } from "../recipes/recipe.model";
import { RecipeService } from "../recipes/recipe.service";
import { map, tap,take, exhaustMap } from "rxjs/operators";
import { AuthService } from "../auth/auth.service";


@Injectable({providedIn:'root'})
export class DataStorageService{

    constructor(private http:HttpClient,private recipeService:RecipeService,private authService:AuthService){}

    // storeRecipe(){

    //     const recipes =this.recipeService.getRecipes()
    //     return this.http
    //     .put('https://recipebook-48c73-default-rtdb.firebaseio.com/recipes.json',recipes)
    //     .subscribe(
    //         (response)=>{
    //             console.log(response)
    //         }
    //     )

    // }

    storeRecipe(){

        const recipes =this.recipeService.getRecipes()
        console.log(recipes);
        return this.http
        .post('http://localhost:3000/recipe',recipes)
        .subscribe(
            (response)=>{
                console.log(response)
            }
        )

    }

    fetchRecipe(){

            return this.http
                .get<Recipe[]>(
                    'https://recipebook-48c73-default-rtdb.firebaseio.com/recipes.json'
                ).pipe(

                        map( recipes =>{
                            return recipes.map(recipe =>{
                                return {...recipe,ingredients: recipe.ingredients ? recipe.ingredients : []}
                            });
                        }),

                        tap( recipes =>{
                            this.recipeService.setRecipes(recipes)
                        }),

                      )
            
        
        
        
        // this.http
        // .get('https://recipebook-48c73-default-rtdb.firebaseio.com/recipes.json')
        // .subscribe((recipes:Recipe[])=>{
        //     this.recipeService.setRecipes(recipes)
        // })
    }

}