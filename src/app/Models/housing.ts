import { Person } from "./person";

export interface Housing {
    id?: number;
    floor: number;
    door: number;
    area: number;
    space: number;
    residentId?: number;
}