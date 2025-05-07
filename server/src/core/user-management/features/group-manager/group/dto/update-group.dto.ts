import { PartialType } from '@nestjs/mapped-types';
import { CreateGroupDTO } from './create-group.dto';

export class UpdateGroupDTO extends PartialType(CreateGroupDTO) {}
