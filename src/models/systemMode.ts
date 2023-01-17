export enum LoginState {
  noUserLogged = "noUserLogged",
  personalTrainerLogged = "personalTrainerLogged",
  studentLogged = "studentLogged"
}

export const DefaultUrlPath = "/" as UrlPath;
export enum UnloggedUrlPath {
  home = "/",
  aboutUs = "/about-us",
  workoutMethod = "/workout-method",
  joinUs = "/join-us",
  login = "/login"
}

export enum PersonalTrainerUrlPath {
  studentList = "/",
  profile = "/my-profile"
}

export enum StudentUrlPath {
  profile = "/"
}

export type UrlPath = UnloggedUrlPath | PersonalTrainerUrlPath | StudentUrlPath | "";
