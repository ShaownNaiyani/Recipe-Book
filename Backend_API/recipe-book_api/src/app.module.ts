import { Module } from '@nestjs/common';

import {MongooseModule} from '@nestjs/mongoose'
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { RecipeModule } from './recipe/recipe.module';
import { RecipeService } from './recipe/recipe.service';

@Module({
  imports: [

    MongooseModule.forRoot("mongodb+srv://Shaown:Arpita@cluster0.m94phd5.mongodb.net/RecipeBookDB?retryWrites=true&w=majority"),

    AuthModule,

    RecipeModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
