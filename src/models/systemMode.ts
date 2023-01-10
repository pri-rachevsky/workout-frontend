export enum LoginState {
  noUserLogged = "noUserLogged",
  personalTrainerLogged = "personalTrainerLogged",
  studentLogged = "studentLogged"
}

export enum NoUserLoggedPage {
  home = "",
  aboutUs = "about-us",
  workoutMethod = "workout-method",
  joinUs = "join-us",
  login = "login"
}
export const NoUserLoggedDefaultPage = NoUserLoggedPage.home;

export enum PersonalTrainerLoggedPage {
  studentList = "",
  profile = "my-profile"
}
export const PersonalTrainerDefaultPage = PersonalTrainerLoggedPage.studentList;

export enum StudentLoggedPage {
  profile = ""
}
export const StudentDefaultPage = StudentLoggedPage.profile;

export type Page = NoUserLoggedPage | PersonalTrainerLoggedPage | StudentLoggedPage;
