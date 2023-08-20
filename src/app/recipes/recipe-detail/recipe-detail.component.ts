import { Component, OnInit } from '@angular/core';

import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
import {ActivatedRoute ,Params,Router} from '@angular/router'
import { MongoIdRecipe } from '../moidrecipe.model';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  recipe: MongoIdRecipe;
  id : number;

  constructor(private recipeService:RecipeService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
    this.route.params.
    subscribe((params:Params)=>{
      this.id = +params['id'];
      this.recipe = this.recipeService.getNewRecipe(this.id);

    })
  }

  onAddShoppinglist(){

    this.recipeService.onAddShoppinglist(this.recipe.ingredients)

  }
  onEditRecipe(){


    this.router.navigate(['edit'],{relativeTo: this.route});
    this.router.navigate(['../',this.id,'edit'],{relativeTo:this.route})

  }

  onDeleteRecipe(){

    this.recipeService.deleteRecipe(this.id);
    this.router.navigate(['/recipes']);

  }

}
