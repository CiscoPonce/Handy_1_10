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
  Logger,
  HttpException,
  HttpStatus 
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('users')
export class UsersController {
  private readonly logger = new Logger(UsersController.name);

  constructor(private readonly usersService: UsersService) {}

  @Post()
  async createUser(@Body() userData: CreateUserDto) {
    this.logger.log(`Received user creation request: ${JSON.stringify(userData)}`);
    try {
      const user = await this.usersService.createUser(userData);
      this.logger.log(`User created successfully: ${user.id}`);
      return user;
    } catch (error) {
      this.logger.error(`User creation failed: ${error.message}`, error.stack);
      throw new HttpException({
        status: HttpStatus.BAD_REQUEST,
        error: 'User creation failed',
        details: error.message
      }, HttpStatus.BAD_REQUEST);
    }
  }

  @Get(':id')
  async getUserById(@Param('id') id: string) {
    this.logger.log(`Fetching user with id: ${id}`);
    try {
      const user = await this.usersService.findUserById(id);
      if (!user) {
        throw new HttpException('User not found', HttpStatus.NOT_FOUND);
      }
      return user;
    } catch (error) {
      this.logger.error(`User fetch failed: ${error.message}`, error.stack);
      throw new HttpException({
        status: HttpStatus.NOT_FOUND,
        error: 'User retrieval failed',
        details: error.message
      }, HttpStatus.NOT_FOUND);
    }
  }

  @Put(':id')
  async updateUser(
    @Param('id') id: string, 
    @Body() updateData: Partial<CreateUserDto>
  ) {
    this.logger.log(`Updating user with id: ${id}`);
    try {
      return await this.usersService.updateUser(id, updateData);
    } catch (error) {
      this.logger.error(`User update failed: ${error.message}`, error.stack);
      throw new HttpException({
        status: HttpStatus.BAD_REQUEST,
        error: 'User update failed',
        details: error.message
      }, HttpStatus.BAD_REQUEST);
    }
  }

  @Delete(':id')
  async deleteUser(@Param('id') id: string) {
    this.logger.log(`Deleting user with id: ${id}`);
    try {
      await this.usersService.deleteUser(id);
      return { message: 'User deleted successfully' };
    } catch (error) {
      this.logger.error(`User deletion failed: ${error.message}`, error.stack);
      throw new HttpException({
        status: HttpStatus.BAD_REQUEST,
        error: 'User deletion failed',
        details: error.message
      }, HttpStatus.BAD_REQUEST);
    }
  }
}
