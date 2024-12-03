import { 
  Controller, 
  Post, 
  Body, 
  Get, 
  Param, 
  Put, 
  Delete, 
  UseGuards,
  Request,
  Logger 
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('users')
export class UsersController {
  private readonly logger = new Logger(UsersController.name);

  constructor(private readonly usersService: UsersService) {}

  @Post()
  async createUser(@Body() userData: CreateUserDto) {
    this.logger.log(`Creating user with email: ${userData.email}`);
    try {
      const user = await this.usersService.createUser(userData);
      this.logger.log(`User created successfully: ${user.id}`);
      return user;
    } catch (error) {
      this.logger.error(`Failed to create user: ${error.message}`, error.stack);
      throw error;
    }
  }

  @Get(':id')
  async getUserById(@Param('id') id: string) {
    this.logger.log(`Fetching user with id: ${id}`);
    return this.usersService.findUserById(id);
  }

  @Put(':id')
  async updateUser(
    @Param('id') id: string, 
    @Body() updateData: Partial<CreateUserDto>
  ) {
    this.logger.log(`Updating user with id: ${id}`);
    return this.usersService.updateUser(id, updateData);
  }

  @Delete(':id')
  async deleteUser(@Param('id') id: string) {
    this.logger.log(`Deleting user with id: ${id}`);
    return this.usersService.deleteUser(id);
  }
}
