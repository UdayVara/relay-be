import { HttpException, Injectable } from '@nestjs/common';
import { PrismaService } from '../../common/services/prisma.service';
import { SignupUserDto } from './dto/signup.dto';
import bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { SigninUserDto } from './dto/signin.dto';


const saltOrRounds = 10;
const password = 'random_password';

@Injectable()
export class AuthService {
    constructor(private readonly prismaService: PrismaService, private readonly jwtService: JwtService) {}


    async SignupService(body:SignupUserDto){
        try {
            const checkUser = await this.prismaService.user.findUnique({
                where: {
                    email: body.email
                }
            });
            if(checkUser){  
                if(checkUser.is_deleted){
                    throw new HttpException('Your account is deleted', 400);
                }
                throw new HttpException('User already exists', 400);
            }

            const hashedPassword = await bcrypt.hash(body.password, saltOrRounds);

            const user = await this.prismaService.user.create({
                data: {
                    email: body.email,
                    name: body.name,
                    password: hashedPassword,
                }
            });

            const token = this.jwtService.sign({ ...user, password: undefined });
            if(user){
                return {
                    message: 'User Signup successfully',
                    user: {
                        id: user.id,
                        email: user.email,
                        name: user.name,
                    },
                    token: token
                }
            }
        } catch (error) {
            throw error;
        }
    }

    async SigninService(body:SigninUserDto){
        try {
            const user = await this.prismaService.user.findUnique({
                where: {
                    email: body.email,
                    is_deleted: false
                }
            });
            if(!user){
                throw new HttpException('User not found', 404);
            }

            const isPasswordValid = await bcrypt.compare(body.password, user.password);
            if(!isPasswordValid){
                throw new HttpException('Invalid password', 400);
            }    
            
            const token = this.jwtService.sign({ ...user, password: undefined });
            return {
                message: 'User Signin successfully',
                user: {
                    id: user.id,
                    email: user.email,
                    name: user.name,
                },
                token: token
            }

        } catch (error) {
            throw error;
        }
    }
}
