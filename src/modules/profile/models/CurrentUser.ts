export interface CurrentUser {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  gender: "male" | "female";
  image: string;
}
