import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { UserDto } from './dto/user.dto';
import { DeleteResult, UpdateResult } from 'typeorm';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Get('searchall')
  public readAll(): Promise<Array<User>> {
    console.log('users-service tests aaaaaaaaaaaa')
    return this.usersService.readAll();
  }

  @Get('searchid=:id')
  public async readUserById(@Param('id', ParseIntPipe) id: number): Promise<UserDto> {
    return this.usersService.readOneById(id);
  }

  @Post('new')
  public async createNewUser(@Body() userData: UserDto): Promise<UserDto> {
    return await this.usersService.createUser(userData)
  }

  @Post('news')
  public async createNewUsers(@Body() usersData: Array<UserDto>): Promise<Array<UserDto>> {
    return await this.usersService.createUsers(usersData)
  }

  @Patch('update=:id')
  public async updateUser(@Param('id', ParseIntPipe) id: number, @Body() userData: UserDto): Promise<UpdateResult> {
    return await this.usersService.updateUser(id, userData)
  }

  @Delete('remove=:id')
  public async deleteUser(@Param('id', ParseIntPipe) id: number): Promise<DeleteResult> {
    return await this.usersService.deleteUser(id);
  }
}
