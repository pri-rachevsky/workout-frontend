export enum LoginState {
  noUserLogged = "noUserLogged",
  personalTrainerLogged = "personalTrainerLogged",
  studentLogged = "studentLogged"
}

export const DefaultPage = "" as Page;
export enum NoUserLoggedPage {
  home = "",
  aboutUs = "about-us",
  workoutMethod = "workout-method",
  joinUs = "join-us",
  login = "login"
}

export enum PersonalTrainerLoggedPage {
  studentList = "",
  profile = "my-profile"
}

export enum StudentLoggedPage {
  profile = ""
}

export type Page = NoUserLoggedPage | PersonalTrainerLoggedPage | StudentLoggedPage | "";
