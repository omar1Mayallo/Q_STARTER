import { Inject, Injectable } from '@nestjs/common';
import { Knex } from 'knex';
import { KNEX_CONNECTION } from 'src/database/database.provider';
import { RepositoryService } from 'src/shared/modules/repository/repository.service';
import { GroupModel } from 'src/shared/types/entities/user-management.model';
import { TABLES } from 'src/shared/constants/tables';
import { CreateGroupDTO } from './dto/create-group.dto';
import { GetAllGroupsDTO } from './dto/get-groups.dto';
import { UpdateGroupDTO } from './dto/update-group.dto';

@Injectable()
export class GroupService {
  constructor(
    @Inject(KNEX_CONNECTION)
    private readonly knex: Knex,
    private readonly repoService: RepositoryService<GroupModel>,
  ) {}

  async createGroup(body: CreateGroupDTO) {
    const [createdGroup] = await this.knex(TABLES.GROUP)
      .insert(body)
      .returning('*');

    return createdGroup;
  }

  async getAllGroups(query: GetAllGroupsDTO) {
    return await this.repoService.getAll(TABLES.GROUP, query);
  }

  async getGroup(id: number) {
    return await this.repoService.getOne(TABLES.GROUP, { id });
  }

  async updateGroup(id: number, body: UpdateGroupDTO) {
    return await this.repoService.updateOne(TABLES.GROUP, { id }, body);
  }
  async deleteGroups(ids: number[]) {
    return await this.repoService.deleteByIds(TABLES.GROUP, ids);
  }
}
