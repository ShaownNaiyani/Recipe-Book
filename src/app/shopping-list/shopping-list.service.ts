import { EventEmitter } from "@angular/core";
import { Ingredient } from "../shared/ingredient.model";
import { Subject} from "rxjs/Subject";
export class ShoppingListService{

    changedIngredients = new EventEmitter<Ingredient[]>();
    startEditing = new Subject<number>();

    private ingredients: Ingredient[] = [
        new Ingredient('Apples', 5),
        new Ingredient('Tomatoes', 10),
      ];
    
    getIngredients(){
        return this.ingredients.slice();
    }
    getIngredient(index:number){
        return this.ingredients[index]
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

    updateIngredient(index: number, newIngredient:Ingredient){
        this.ingredients[index] = newIngredient;
        this.changedIngredients.next(this.ingredients.slice());
    }

    deleteIngredient(index:number){
        this.ingredients.splice(index,1);
        this.changedIngredients.next(this.ingredients.slice());
    }


}