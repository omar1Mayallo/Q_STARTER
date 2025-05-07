import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { IsValidArrayIdsDTO } from 'src/shared/dtos/is-valid-ids-arr.dto';
import { AuthGuard } from '../../user-manager/auth/guards/auth.guard';
import { IsValidParamIdDTO } from 'src/shared/dtos/is-valid-id-param.dto';
import { IsAuthenticationGuard } from 'src/shared/decorators/is-auth-guard.decorator';
import { CreateGroupDTO } from './dto/create-group.dto';
import { GetAllGroupsDTO } from './dto/get-groups.dto';
import { UpdateGroupDTO } from './dto/update-group.dto';
import { GroupService } from './group.service';

@UseGuards(AuthGuard)
@IsAuthenticationGuard()
@Controller('groups')
export class GroupController {
  constructor(private readonly groupService: GroupService) {}

  // @DESC: Create a new group
  // @URL: POST => "/groups"
  @Post()
  async createGroup(@Body() body: CreateGroupDTO) {
    return await this.groupService.createGroup(body);
  }

  // @DESC: Get All Groups
  // @URL: GET => "/groups"
  @Get()
  async getAllGroups(@Query() query: GetAllGroupsDTO) {
    return await this.groupService.getAllGroups(query);
  }

  // @DESC: Get Group
  // @URL: GET => "/groups/:id"
  @Get('/:id')
  async getGroup(@Param() param: IsValidParamIdDTO) {
    return await this.groupService.getGroup(param.id);
  }

  // @DESC: Update Group
  // @URL: PUT => "/groups/:id"
  @Put('/:id')
  async updateGroup(
    @Param() param: IsValidParamIdDTO,
    @Body() body: UpdateGroupDTO,
  ) {
    return await this.groupService.updateGroup(param.id, body);
  }

  // @DESC: Delete One Or More Groups
  // @URL: DELETE => "/groups"
  @Delete()
  async deleteGroups(@Body() body: IsValidArrayIdsDTO) {
    await this.groupService.deleteGroups(body.ids);
  }
}
