import { Role } from "@prisma/client";
import { Auth } from "../entities/auth.entity";

export interface IAuthRepository{
    createUser(email: string, password: string, role: Role| "EMPLOYEE"): Promise<Auth>;
    findUserByEmail(email: string): Promise<Auth | null>;
}