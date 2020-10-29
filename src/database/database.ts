import { Database } from '@nozbe/watermelondb';
import SQLiteAdapter from '@nozbe/watermelondb/adapters/sqlite';

import { RepositoryModel } from '../model/Repository';
import { UserModel } from '../model/User';
import { schema } from '../model/schema';

const adapter = new SQLiteAdapter({
  schema,
});

export const database = new Database({
  actionsEnabled: true,
  adapter,
  modelClasses: [RepositoryModel, UserModel],
});
