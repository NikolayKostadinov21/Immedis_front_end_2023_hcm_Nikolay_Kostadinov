export enum Role {
    admin = 'Admin',
    moderator = 'Moderator',
    user = 'User',
}

export interface User {
    email: string;
    password: string;
    role: Role;
    firstname?: string;
    lastname?: string;
    age?: number;
    department?: string;
    records?: string[];
    salary?: number;
}