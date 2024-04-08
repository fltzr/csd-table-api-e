
export type Account = {
  id: string;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  birthDate: string;
  gender: string | null;
  zipCode: string;
  createdAt: string | Date;
  updatedAt: string | Date;
};


export type AuthApiResponse =
  | {
      authenticated: true;
      user: Partial<Account>;
    }
  | {
      authenticated: false;
      user: null;
      message?: string;
    };
