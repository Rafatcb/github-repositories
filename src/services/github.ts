import { database } from '../database/database';
import type { RepositoryAttributes, UserAttributes } from '../database/schemas';

interface ReposResponseData {
  created_at: string;
  description: string | null;
  language: string;
  languages_url: string;
  name: string;
  owner: {
    avatar_url: string;
    login: string;
  };
}

export interface User {
  avatarUrl: string;
  username: string;
}

export interface Repository {
  createdAt: string;
  description?: string | null;
  language?: string | null;
  languagesUrl: string;
  name: string;
}

interface ExpectedReturn {
  repositories: Repository[];
  user: User;
}

export const getRepositories = async (
  user: string,
): Promise<ExpectedReturn> => {
  const endpoint = `https://api.github.com/users/${user}/repos`;

  try {
    const response = await fetch(endpoint);
    const data = (await response.json()) as ReposResponseData[];

    const repositories: Repository[] = data.map(repo => ({
      createdAt: repo.created_at,
      description: repo.description,
      language: repo.language,
      languagesUrl: repo.languages_url,
      name: repo.name,
    }));

    const owner: User = {
      avatarUrl: '',
      username: '',
    };

    if (data.length) {
      owner.avatarUrl = data[0].owner.avatar_url;
      owner.username = data[0].owner.login;
    }

    await syncToDatabase(owner, repositories);

    return { repositories, user: owner };
  } catch {
    return getFromDatabase(user);
  }
};

async function getFromDatabase(username: string): Promise<ExpectedReturn> {
  const realm = await database.open();

  const users = realm.objects<UserAttributes>('User');
  const userFound = users.filtered(`username = "${username}"`);

  if (userFound.isEmpty()) {
    return { repositories: [], user: { avatarUrl: '', username } };
  }

  const userToReturn = userFound[0];
  const parsedUser: User = { avatarUrl: userToReturn.avatarUrl, username };
  const parsedRepos: Repository[] = parseRepositories(
    userToReturn.repositories,
  );

  realm.close();

  return { repositories: parsedRepos, user: parsedUser };
}

async function syncToDatabase(user: User, repositories: Repository[]) {
  const realm = await database.open();
  realm.write(() => {
    const users = realm.objects<UserAttributes>('User');
    const userFound = users.filtered(`username = "${user.username}"`);

    if (userFound.isEmpty()) {
      realm.create<UserAttributes>('User', {
        avatarUrl: user.avatarUrl,
        repositories: unparseRepositories(repositories),
        username: user.username,
      });
    } else {
      const userToUpdate = userFound[0];
      userToUpdate.avatarUrl = user.avatarUrl;
      userToUpdate.repositories = unparseRepositories(repositories);
    }
  });

  realm.close();
}

function parseRepositories(repositories: RepositoryAttributes[]): Repository[] {
  return repositories.map(
    ({ createdAt, description, language, languagesUrl, name }) => ({
      createdAt: createdAt.toString(),
      description,
      language,
      languagesUrl,
      name,
    }),
  );
}

function unparseRepositories(
  repositories: Repository[],
): RepositoryAttributes[] {
  return repositories.map(
    ({ createdAt, description, language, languagesUrl, name }) => ({
      createdAt: new Date(createdAt),
      description,
      language,
      languagesUrl,
      name,
    }),
  );
}
