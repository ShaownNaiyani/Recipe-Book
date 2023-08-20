import { Component, OnDestroy, OnInit } from '@angular/core';
import {ActivatedRoute ,Params,Router} from '@angular/router'
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
import { Subscription } from 'rxjs';
import { MongoIdRecipe } from '../moidrecipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit,OnDestroy {
  recipes:MongoIdRecipe[];
  subscription:Subscription;
  
  constructor( private recipeService:RecipeService,
               private router:Router,
               private route:ActivatedRoute) {  }

  ngOnInit() {

    this.subscription=this.recipeService.fetchedRecipeChanged
    .subscribe(
      (recipes:MongoIdRecipe[]) => {
        this.recipes=recipes;
      }
    )

    this.recipes = this.recipeService.getNewRecipes();
  }

  ngOnDestroy(): void {

    this.subscription.unsubscribe();
      
  }

  onNewRecipe(){
    this.router.navigate(['new'],{relativeTo: this.route})
  }


}
