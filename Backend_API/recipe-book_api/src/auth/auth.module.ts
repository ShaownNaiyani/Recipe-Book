import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserDetails, UserDetailsSchema } from './schema/auth.schema';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';

@Module({
    imports:[
        MongooseModule.forFeature([{  // forFeature select korbo child componen
            name:'UserDetails',
            schema: UserDetailsSchema,
            collection:'UserDetails'
        }])
    ],
    providers: [AuthService],
    controllers: [AuthController]
})
export class AuthModule {}
