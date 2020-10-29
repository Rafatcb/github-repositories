import Realm from 'realm';

import { RepositoryModel, UserModel } from './schemas';

export const database = {
  open: async (): Promise<Realm> =>
    Realm.open({
      schema: [RepositoryModel, UserModel],
    }),
};
