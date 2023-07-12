import { Role } from "./roles.model";

export interface User {
    id: number;
    email: string;
    password: string;
    role: Role;
    firstname?: string;
    lastname?: string;
    age?: number;
    department?: string;
    salary?: number;
}