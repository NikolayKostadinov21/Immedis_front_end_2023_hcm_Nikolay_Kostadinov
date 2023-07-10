enum Role {
    admin = 'admin',
    moderator = 'moderator',
    user = 'user',
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