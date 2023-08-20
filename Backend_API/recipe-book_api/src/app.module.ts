import { Module } from '@nestjs/common';

import {MongooseModule} from '@nestjs/mongoose'
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RecipeModule } from './recipe/recipe.module';
import { RecipeService } from './recipe/recipe.service';
import { UserModule } from './user/user.module';


@Module({
  imports: [

    MongooseModule.forRoot("mongodb+srv://Shaown:Arpita@cluster0.m94phd5.mongodb.net/RecipeBookDB?retryWrites=true&w=majority"),
    RecipeModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
