import type { Relation } from '@nozbe/watermelondb';
import { Model } from '@nozbe/watermelondb';
import type { Associations } from '@nozbe/watermelondb/Model';
import { date, field, relation } from '@nozbe/watermelondb/decorators';

import type { UserModel } from './User';

export class RepositoryModel extends Model {
  static table = 'repositories';

  static associations = {
    users: { key: 'user_id', type: 'belongs_to' },
  } as Associations;

  @date('created_at') createdAt!: number;

  @field('description') description!: string | null;

  @field('language') language!: string | null;

  @field('languages_url') languagesUrl!: string;

  @field('name') name!: string;

  @relation('users', 'user_id') user!: Relation<UserModel>;
}
