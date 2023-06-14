export class CreateGroupDto {
  name: string;
  owner: number;
}

export class UpdateGroupDto {
  name: string;
}

enum With {
  USERS = 'users',
}

export class FindCriteria {
  id?: number;
  name?: string;
  code?: string;
  owner?: number;
}
