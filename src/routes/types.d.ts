import type { Repository, User } from '../services/github';

export type AppStackParamList = {
  EnterAccount: undefined;
  Repositories: {
    repositories: Repository[];
    user: User;
  };
  RepositoryDetails: {
    repository: Repository;
  };
};
