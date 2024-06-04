export type InitRepositoryParameters = {
  plugin: {
    name: string;
    description: string;
  };
  maintainer: {
    name: string;
    email: string;
  };
  year: number;
};
