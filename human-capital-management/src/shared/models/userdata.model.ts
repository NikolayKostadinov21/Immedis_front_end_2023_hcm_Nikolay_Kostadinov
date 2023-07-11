import { User } from "./user.model";

export interface UserData {
    accessToken: string;
    user: User;
}