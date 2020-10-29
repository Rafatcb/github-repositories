export interface RepositoryAttributes {
  createdAt: Date;
  description?: string | null;
  language?: string | null;
  languagesUrl: string;
  name: string;
}

export class RepositoryModel {
  static schema = {
    name: 'Repository',
    primaryKey: 'name',
    properties: {
      createdAt: 'date',
      description: 'string?',
      language: 'string?',
      languagesUrl: 'string',
      name: 'string',
    },
  };
}

export interface UserAttributes {
  avatarUrl: string;
  repositories: RepositoryAttributes[];
  username: string;
}

export class UserModel {
  static schema = {
    name: 'User',
    primaryKey: 'username',
    properties: {
      avatarUrl: 'string',
      repositories: 'Repository[]',
      username: 'string',
    },
  };
}
