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

export class UserRegisterDTO {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export class UserSafeAttributes {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
}
