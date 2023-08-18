import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserDetails, UserSchema } from './schema/user.schema';
import { UserController } from './user.controller';

@Module({

  imports:[
    MongooseModule.forFeature([{
      name : 'UserDetails',
      schema: UserSchema,
      collection: 'UserDetails'
    }])
  ],
  exports:[UserService],
  providers: [UserService],
  controllers: [UserController]
})
export class UserModule {}
