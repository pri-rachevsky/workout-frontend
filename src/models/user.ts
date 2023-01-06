export interface User {
  id: string;
  name: string;
  username: string;
  password: string;
  role: Role;
}

export enum Role {
  PersonalTrainer = "personal trainer",
  Student = "student"
}
