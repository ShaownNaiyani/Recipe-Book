import { Module } from '@nestjs/common';

import {MongooseModule} from '@nestjs/mongoose'
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { RecipeModule } from './recipe/recipe.module';
import { ShoppingListModule } from './shopping-list/shopping-list.module';
import { IngredientsModule } from './ingredients/ingredients.module';

@Module({
  imports: [

    MongooseModule.forRoot("mongodb+srv://Shaown:Arpita@cluster0.m94phd5.mongodb.net/RecipeBookDB?retryWrites=true&w=majority"),

    AuthModule,

    RecipeModule,

    ShoppingListModule,

    IngredientsModule
    
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
