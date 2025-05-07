import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { AssignPermissionsDTO } from 'src/core/user-management/common/dto/assign-permissions.dto';
import { USER_ACTIONS } from 'src/shared/constants/actions';
import { ActionName } from 'src/shared/decorators/action-name.decorator';
import { IsAuthenticationGuard } from 'src/shared/decorators/is-auth-guard.decorator';
import { LoggedUser } from 'src/shared/decorators/logged-user.decorator';
import { IsValidParamIdDTO } from 'src/shared/dtos/is-valid-id-param.dto';
import { IsValidArrayIdsDTO } from 'src/shared/dtos/is-valid-ids-arr.dto';
import { UserModel } from 'src/shared/types/entities/user-management.model';
import { FileValidator } from 'src/shared/utils/file-validator';
import { AuthGuard } from '../auth/guards/auth.guard';
import { CreateUserDTO } from './dto/create-user.dto';
import { GetAllUsersDTO } from './dto/get-users.dto';
import { UpdateUserDTO } from './dto/update-user.dto';
import { UserService } from './user.service';

@UseGuards(AuthGuard)
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // @DESC: Create a new user
  // @URL: POST => "/users"
  @Post()
  @ActionName(USER_ACTIONS.CREATE_USER)
  @UseInterceptors(
    FileInterceptor('avatar', {
      fileFilter: FileValidator.fileFilter(
        /\.(jpg|jpeg)$/,
        'Only jpg, jpeg, files are allowed',
      ),
      limits: { fileSize: FileValidator.avatarSize },
    }),
  )
  async createUser(
    @Body() body: CreateUserDTO,
    @UploadedFile()
    avatar: Express.Multer.File,
  ) {
    return await this.userService.createUser(body, avatar);
  }

  // @DESC: Get All Users
  // @URL: GET => "/users"
  @Get()
  @ActionName(USER_ACTIONS.LIST_USERS)
  async getAllUsers(@Query() query: GetAllUsersDTO) {
    return await this.userService.getAllUsers(query);
  }

  // @DESC: Get LoggedIn User
  // @URL: GET => "/users/logged"
  @Get('/logged')
  @IsAuthenticationGuard()
  async getLoggedUser(@LoggedUser() user: UserModel) {
    return await this.userService.getUser(user.id);
  }

  // @DESC: Get User
  // @URL: PUT => "/users/:id"
  @Get('/:id')
  @ActionName(USER_ACTIONS.LIST_USERS)
  async getUser(@Param() param: IsValidParamIdDTO) {
    return await this.userService.getUser(param.id);
  }

  // @DESC: Update User
  // @URL: PUT => "/users/:id"
  @Put('/:id')
  @ActionName(USER_ACTIONS.UPDATE_USER)
  @UseInterceptors(
    FileInterceptor('avatar', {
      fileFilter: FileValidator.fileFilter(
        /\.(jpg|jpeg)$/,
        'Only jpg, jpeg, files are allowed',
      ),
      limits: { fileSize: FileValidator.avatarSize },
    }),
  )
  async updateUser(
    @Param() param: IsValidParamIdDTO,
    @Body() body: UpdateUserDTO,
    @UploadedFile()
    avatar: Express.Multer.File,
  ) {
    return await this.userService.updatedUser(param.id, body, avatar);
  }

  // @DESC: Delete One Or More Users
  // @URL: DELETE => "/users"
  @Delete()
  @ActionName(USER_ACTIONS.DELETE_USERS)
  async deleteUsers(@Body() body: IsValidArrayIdsDTO) {
    await this.userService.deleteUsers(body.ids);
  }

  // @DESC: Assign Permissions to User
  // @URL: POST => "/users/:id/permissions"
  @Post('/:id/permissions')
  @ActionName(USER_ACTIONS.ASSIGN_USER_PERMISSIONS)
  async assignUserPermissions(
    @Param() param: IsValidParamIdDTO,
    @Body() body: AssignPermissionsDTO,
  ) {
    return await this.userService.assignUserPermissions(param.id, body.actions);
  }
}
