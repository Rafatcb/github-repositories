import type { RepositoryInfo, UserInfo } from '../services/github';

export type AppStackParamList = {
  EnterAccount: undefined;
  Repositories: {
    repositories: RepositoryInfo[];
    user: UserInfo;
  };
  RepositoryDetails: {
    repository: RepositoryInfo;
  };
};
