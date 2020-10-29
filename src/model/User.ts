import type { Query } from '@nozbe/watermelondb';
import { Model } from '@nozbe/watermelondb';
import type { Associations } from '@nozbe/watermelondb/Model';
import { action, children, field } from '@nozbe/watermelondb/decorators';

import type { RepositoryInfo } from '../services/github';

import type { RepositoryModel } from './Repository';

export class UserModel extends Model {
  static associations = {
    repositories: { foreignKey: 'user_id', type: 'has_many' },
  } as Associations;

  static table = 'users';

  @field('avatarUrl') avatarUrl!: string;

  @field('username') username!: string;

  @children('repositories') repositories!: Query<RepositoryModel>;

  @action async addRepository({
    createdAt,
    description,
    language,
    languagesUrl,
    name,
  }: RepositoryInfo): Promise<RepositoryModel> {
    return this.repositories.collection.create(record => {
      record.user.set(this);
      record.description = description;
      record.createdAt = Date.parse(createdAt);
      record.language = language;
      record.languagesUrl = languagesUrl;
      record.name = name;
    });
  }

  // eslint-disable-next-line @typescript-eslint/require-await
  @action async addRepositories(
    repositories: RepositoryInfo[],
  ): Promise<Promise<RepositoryModel>[]> {
    const mapped = repositories.map(
      async ({ createdAt, description, language, languagesUrl, name }) => {
        return this.repositories.collection.create(record => {
          record.user.set(this);
          record.description = description;
          record.createdAt = Date.parse(createdAt);
          record.language = language;
          record.languagesUrl = languagesUrl;
          record.name = name;
        });
      },
    );
    return mapped;
  }

  // @action async createOrUpdate(user: UserInfo, repositories: RepositoryInfo[]) {
  //   const existingUser = this.collection.query(
  //     Q.where('username', this.username),
  //   );
  //   console.log(existingUser);
  //   // const existingRepositories = await this.repositories.collection.query(
  //   //   Q.where('id', Q.oneOf(['abcdef', 'dasdasd', 'asdasd'])),
  //   // );

  //   // const postsToCreate = IDs that are not contained in existingPosts
  //   // const poststoUpdate = Posts that are contained in existing Posts

  //   // await database.batch(
  //   //   ...postsToUpdate.map(post => post.prepareUpdate(() => {
  //   //     post.title = 'Updated title'
  //   //   })),
  //   //   ... postsToCreate.map(postData => collection.prepareCreate(post => {
  //   //   post.title = 'New title'
  //   // }))
  //   // )
  // }
}
