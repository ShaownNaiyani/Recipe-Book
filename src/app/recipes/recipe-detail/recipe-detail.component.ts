import { Component, OnInit } from '@angular/core';

import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
import {ActivatedRoute ,Params,Router} from '@angular/router'
import { MongoIdRecipe } from '../moidrecipe.model';
import { DataStorageService } from 'src/app/shared/data-storage.service';
import { ApiCallService } from '../apicall.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  recipe: MongoIdRecipe ={
    _id: '',
    name: '',
    description: '',
    imagePath: '',
    ingredients: [],
    };
    
  id : string = '';
  name:string = '';

  constructor(private recipeService:RecipeService,
              private route: ActivatedRoute,
              private router: Router,
              private dataStorageService : DataStorageService,
              private apiCallService : ApiCallService) { }

  ngOnInit() {
    this.route.params.
    subscribe((params:Params)=>{
      this.id = params['id'];

      if(this.id){
        this.dataStorageService.fetchRecipeById(this.id).subscribe( (data) =>{
          this.recipe._id = data._id;
          this.recipe.name = data.name;
          this.recipe.description = data.description;
          this.recipe.imagePath = data.imagePath;
          this.recipe.ingredients = data.ingredients;
        });
        // this.apiCallService.getnewRecipe(this.id);
      }
      
      //console.log(this.recipe);

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

    // this.recipeService.deleteRecipe(this.id);

    // console.log(this.id);

    if(this.id){
      this.dataStorageService.deleteReipeById(this.id); //API call
      setTimeout(() => {
        this.dataStorageService.fetchRecipeAll().subscribe()
      }, 10);
      
      this.router.navigate(['../'],{relativeTo: this.route})
    }  

    // this.router.navigate(['/recipes']);

  }

}
