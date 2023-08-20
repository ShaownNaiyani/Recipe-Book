import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserDetails, UserSchema } from './schema/user.schema';
import { UserController } from './user.controller';
import { AuthService } from './auth.service';
import { LocalStrategy } from './local.strategy';
import { PassportModule } from '@nestjs/passport';

@Module({

  imports:[
    MongooseModule.forFeature([{
      name : 'UserDetails',
      schema: UserSchema,
      collection: 'UserDetails'
    }]),
    PassportModule,
  ],
  exports:[UserService],
  providers: [UserService,AuthService,LocalStrategy],
  controllers: [UserController]
})
export class UserModule {}
