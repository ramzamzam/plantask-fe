export class User {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
}

export class AuthenticatedUserDTO {
  accessToken: string;
  refreshToken: string;
  user: User;
}
