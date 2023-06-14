import {Column, PrimaryColumn} from "typeorm";

export class UpdateUserDto {
  name?: string;
  login?: string;
  password?: string;
}

export class CreateUserDto {
  name: string;
  login: string;
  password: string;
}

export class FindCriteria {
  id?: number;
  groupId?: number;
  name?: string;
  login?: string;
}
