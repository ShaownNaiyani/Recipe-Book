import { EventEmitter } from "@angular/core";
import { Ingredient } from "../shared/ingredient.model";
export class ShoppingListService{

    changedIngredients = new EventEmitter<Ingredient[]>();

    private ingredients: Ingredient[] = [
        new Ingredient('Apples', 5),
        new Ingredient('Tomatoes', 10),
      ];
    
    getIngredients(){
        return this.ingredients.slice();
    }

    addIngredient(ingredient:Ingredient){

        this.ingredients.push(ingredient);
        this.changedIngredients.emit(this.ingredients);

    }

    addIngredients(ingredients:Ingredient[]){

        // for(let ingredient of ingredients){
        //     this.addIngredient(ingredient);
        // }

        this.ingredients.push(...ingredients);
        this.changedIngredients.emit(this.ingredients);

    }


}