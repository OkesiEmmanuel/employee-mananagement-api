import { Auth } from "src/modules/auth/entities/auth.entity";

export interface IUserRepository{
    getAllUsers(page: number, limit: number): Promise<Auth[] | null>;
    getUserById(id: string): Promise<Auth | null>;
    getUserByEmail(email: string): Promise<Auth | null>;
    updateUser(email: string, data: Partial<Auth>): Promise<Auth>;
    updateUserRole(userId: string, role: 'ADMIN' | 'MANAGER' | 'EMPLOYEE'): Promise<Auth>;
    deleteUser(userId: string): Promise<void>;
}