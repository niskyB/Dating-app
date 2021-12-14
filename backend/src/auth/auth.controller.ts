import { Body, Controller, Post, UsePipes } from '@nestjs/common';
import { JoiValidationPipe } from '../utils/validation/JoiValidationPipe.pipe';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import { createUserSchema } from './schema/create-user.schema';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/signup')
  @UsePipes(new JoiValidationPipe(createUserSchema))
  async create(@Body() createUserDto: CreateUserDto) {
    return await this.authService.create(createUserDto);
  }
}
