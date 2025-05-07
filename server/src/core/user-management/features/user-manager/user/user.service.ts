import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { Knex } from 'knex';
import { KNEX_CONNECTION } from 'src/database/database.provider';
import { UserModel } from 'src/shared/types/entities/user-management.model';
import { TABLES } from './../../../../../shared/constants/tables';
import { CreateUserDTO } from './dto/create-user.dto';

import { BcryptService } from 'src/core/user-management/common/modules/bcrypt/bcrypt.service';
import { RepositoryService } from 'src/shared/modules/repository/repository.service';
import { GetAllResponse } from 'src/shared/modules/repository/repository.types';
import { GetAllUsersDTO } from './dto/get-users.dto';
import { UpdateUserDTO } from './dto/update-user.dto';
import { I18nCustomService } from 'src/shared/modules/I18n-custom/I18n-custom.service';

@Injectable()
export class UserService {
  constructor(
    @Inject(KNEX_CONNECTION)
    private readonly knex: Knex,
    private readonly bcryptService: BcryptService,
    private readonly repoService: RepositoryService<UserModel>,
    private readonly i18nService: I18nCustomService,
  ) {}

  async createUser(
    body: CreateUserDTO,
    file: Express.Multer.File,
  ): Promise<UserModel> {
    // 1) Check If Email already exists
    const emailExist = await this.repoService.getOne(
      TABLES.USERS,
      {
        email: body.email,
      },
      { withNotFoundError: false },
    );
    if (emailExist) {
      throw new BadRequestException(
        this.i18nService.t('errors.Http_Errors.EMAIL_UNIQUE'),
      );
    }

    // 2) Hash the password before Inserting
    const hashedPassword = await this.bcryptService.hash(body.password);

    // 3) Handle Avatar Uploaded
    if (file) {
      body.avatar = file.buffer;
    } else {
      body.avatar = null;
    }

    // 3) Create a new user
    const newUser = { ...body, password: hashedPassword };
    const [createdUser] = await this.knex(TABLES.USERS)
      .insert(newUser)
      .returning('*');

    return createdUser;
  }

  async getAllUsers(query: GetAllUsersDTO): Promise<GetAllResponse<UserModel>> {
    return await this.repoService.getAll(TABLES.USERS, query);
  }

  async getUser(id: number): Promise<UserModel> {
    return await this.repoService.getOne(TABLES.USERS, { id });
  }

  async deleteUsers(ids: number[]) {
    await this.repoService.deleteByIds(TABLES.USERS, ids);
  }

  async updatedUser(
    id: number,
    body: UpdateUserDTO,
    file: Express.Multer.File,
  ) {
    if (body.password) {
      const hashedPassword = await this.bcryptService.hash(body.password);
      body.password = hashedPassword;
    }

    if (file) {
      body.avatar = file.buffer;
    } else {
      body.avatar = null;
    }

    return await this.repoService.updateOne(TABLES.USERS, { id }, body);
  }

  async assignUserPermissions(id: number, actions: string[]) {
    // 1) CHECK User Exists
    const user = await this.getUser(id);

    // 2) DELETE The Previous User_Actions
    await this.knex(TABLES.USER_ENTITY_ACTION)
      .where({ email: user.email })
      .del();

    // 3) Create a new User_Actions with user.email and body.actions items
    const newUserActions = actions.map((action) => ({
      email: user.email,
      action_key: action,
    }));

    if (newUserActions.length > 0) {
      await this.knex(TABLES.USER_ENTITY_ACTION).insert(newUserActions);
    }

    return { status: 'Success' };
  }
}
