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

export interface UserInfo {
  avatarUrl: string;
  username: string;
}

export interface RepositoryInfo {
  createdAt: string;
  description: string | null;
  language: string | null;
  languagesUrl: string;
  name: string;
}

export const getRepositories = async (
  user: string,
): Promise<{ repositories: RepositoryInfo[]; user: UserInfo }> => {
  const endpoint = `https://api.github.com/users/${user}/repos`;

  const response = await fetch(endpoint);
  const data = (await response.json()) as ReposResponseData[];

  const repositories: RepositoryInfo[] = data.map(repo => ({
    createdAt: repo.created_at,
    description: repo.description,
    language: repo.language,
    languagesUrl: repo.languages_url,
    name: repo.name,
  }));

  const owner: UserInfo = {
    avatarUrl: '',
    username: '',
  };

  if (data.length) {
    owner.avatarUrl = data[0].owner.avatar_url;
    owner.username = data[0].owner.login;
  }

  return { repositories, user: owner };
};
