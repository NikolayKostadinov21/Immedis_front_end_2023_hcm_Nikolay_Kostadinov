import { HttpHeaders } from "@angular/common/http";

export const AUTH_API = 'http://localhost:3000';
export const HTTP_OPTIONS = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
export const ID_TOKEN = 'id_token';
export const EXPIRES_AT = 'expires_at';
export const USER_KEY = 'id_user';