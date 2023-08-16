import { Component, OnInit } from '@angular/core';

import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
import {ActivatedRoute ,Params, Router} from '@angular/router'
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { DataStorageService } from 'src/app/shared/data-storage.service';
import { MongoIdRecipe } from '../moidrecipe.model';
@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
  id : string;
  editMode:boolean=false;
  recipeForm: FormGroup;

  recipe: MongoIdRecipe ={
    _id: '',
    name: '',
    description: '',
    imagePath: '',
    ingredients: [],
    };


  constructor(private route: ActivatedRoute,
              private recipeService:RecipeService,
              private router:Router,
              private dataStorageService: DataStorageService) { }

  ngOnInit() {
    this.route.params.
    subscribe((params:Params)=>{

      this.id = params['id'];
      this.editMode= params['id'] != null;
      if(this.id){
        this.dataStorageService.fetchRecipeById(this.id).subscribe( (data) =>{
          this.recipe._id = data._id;
          this.recipe.name = data.name;
          this.recipe.description = data.description;
          this.recipe.imagePath = data.imagePath;
          this.recipe.ingredients = data.ingredients;
        });
      }
     
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
      // const Recipe = this.recipeService.getRecipe(this.id);
      recipeName=this.recipe.name;
      recipeImagepath=this.recipe.imagePath;
      recipeDescription=this.recipe.description;

      if(this.recipe['ingredients']){
        for(let ingredient of this.recipe.ingredients){
          recipeIngredients.push(
            new FormGroup({
              'name':new FormControl(ingredient.name,Validators.required),
              'amount':new FormControl(ingredient.amount,
                [Validators.required,
                  Validators.pattern(/^[1-9]+[0-9]*$/)])
            })
          )
        }
      }
    }

    this.recipeForm= new FormGroup({
      'name': new FormControl(recipeName,Validators.required),
      'imagePath': new FormControl(recipeImagepath,Validators.required),
      'description': new FormControl(recipeDescription,Validators.required),
      'ingredients': recipeIngredients
    })

  }

  get recipeControls() { 
    return (<FormArray>this.recipeForm.get('ingredients')).controls;
  }

  onAddIngredient(){

    (<FormArray>this.recipeForm.get('ingredients')).push(
      new FormGroup({
        'name':new FormControl(null,Validators.required),
        'amount':new FormControl(null,[Validators.required,
          Validators.pattern(/^[1-9]+[0-9]*$/)])
      })
    )

  }

  onCancel(){
    this.router.navigate(['../'],{relativeTo: this.route})
  }

  onDeleteIngredient(index:number){

    (<FormArray>this.recipeForm.get('ingredients')).removeAt(index)

  }

  onSubmit(){

    // const newRecipe = new Recipe(
    //   this.recipeForm.value['name'],
    //   this.recipeForm.value['description'],
    //   this.recipeForm.value['imagePath'],
    //   this.recipeForm.value['ingredients']
    // )

    if(this.editMode){
      // this.recipeService.updateRecipe(this.id,this.recipeForm.value);
      this.dataStorageService.updateRecipeById(this.id,this.recipeForm.value) //API call
    }
    else
    {
      this.recipeService.addRecipe(this.recipeForm.value); //API call
    }

    this.onCancel();

  }
}
