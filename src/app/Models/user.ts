import { userRoles } from "./userRoles";

export interface User {
    id?: number;
    username: string;
    passw: string;
    role: userRoles;
}