export interface Update {
  id?: number;
  name?: string;
  groupId?: number;
}

export interface Create {
  name?: string;
  groupId?: number;
}

export interface FindCriteriaDto {
  id?: number;
  name?: string;
  groupId?: number;
}
