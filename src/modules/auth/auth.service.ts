import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../common/services/prisma.service';
import { SignupUserDto } from './dto/signup.dto';

@Injectable()
export class AuthService {
    constructor(private readonly prismaService: PrismaService) {}


    async SignupService(body:SignupUserDto){
        try {
            const checkUser = await this.prismaService.user.findUnique({
                where: {
                    email: body.email
                }
            });
            if(checkUser){  
                
            }
        } catch (error) {
            
        }
    }
}
