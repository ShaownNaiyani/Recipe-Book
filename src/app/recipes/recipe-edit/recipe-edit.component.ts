import { Component, OnInit } from '@angular/core';

import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
import {ActivatedRoute ,Params} from '@angular/router'
import { FormArray, FormControl, FormGroup } from '@angular/forms';
@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
  id : number;
  editMode:boolean=false;
  recipeForm: FormGroup


  constructor(private route: ActivatedRoute,private recipeService:RecipeService) { }

  ngOnInit() {
    this.route.params.
    subscribe((params:Params)=>{

      this.id = +params['id'];
      this.editMode= params['id'] != null;
      this.initForm();
      

    })
  }

  private initForm(){
    let recipeName='';
    let recipeImagepath='';
    let recipeDescription='';
    let recipeIngredients = new FormArray([]);
   

    if(this.editMode)
    {
      const Recipe = this.recipeService.getRecipe(this.id);
      recipeName=Recipe.name;
      recipeImagepath=Recipe.imagePath;
      recipeDescription=Recipe.description;

      if(Recipe['ingredients']){
        for(let ingredient of Recipe.ingredients){
          recipeIngredients.push(
            new FormGroup({
              'name':new FormControl(ingredient.name),
              'amount':new FormControl(ingredient.amount)
            })
          )
        }
      }
    }

    this.recipeForm= new FormGroup({
      'name': new FormControl(recipeName),
      'imagePath': new FormControl(recipeImagepath),
      'description': new FormControl(recipeDescription),
      'ingredients': recipeIngredients
    })

  }

  get controls() { 
    return (<FormArray>this.recipeForm.get('ingredients')).controls;
  }

  onAddIngredient(){

    (<FormArray>this.recipeForm.get('ingredients')).push(
      new FormGroup({
        'name':new FormControl(),
        'amount':new FormControl()
      })
    )

  }

  onSubmit(){

  }
}
