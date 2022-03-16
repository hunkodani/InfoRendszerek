import { Person } from "./person";

export interface Transaction {
    id?: number;
    date: Date;
    amount: number;
    balanceAfter: number;
    description?: string;
    types: string;
    resident: Person;
}