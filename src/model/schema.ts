/* eslint-disable sort-keys */
import { appSchema, tableSchema } from '@nozbe/watermelondb';

export const schema = appSchema({
  version: 1,
  tables: [
    tableSchema({
      name: 'repositories',
      columns: [
        { name: 'name', type: 'string' },
        { name: 'description', type: 'string', isOptional: true },
        { name: 'language', type: 'string', isOptional: true },
        { name: 'languages_url', type: 'string' },
        { name: 'created_at', type: 'number' },
        { name: 'user_id', type: 'number', isIndexed: true },
      ],
    }),
    tableSchema({
      name: 'users',
      columns: [
        { name: 'username', type: 'string' },
        { name: 'avatar_url', type: 'string' },
      ],
    }),
  ],
});
