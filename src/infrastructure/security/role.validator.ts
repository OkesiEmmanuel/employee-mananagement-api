// import { UnauthorizedException } from "@nestjs/common";
// import { Role } from "@prisma/client";
// import { UserService } from "src/modules/users/services/user.service";
// // Helper function to check if the user has the required role
// export async function validateUserRole(
//     userService: any,  // This could be your user service with a `findOneById` method
//     userId: string,
//     requiredRoles: Role[],
//   ): Promise<void> {
//     const user = await (userId);
  
//     if (!user) {
//       throw new UnauthorizedException('User not found');
//     }
  
//     const hasRole = requiredRoles.includes(user.role);
//     if (!hasRole) {
//       throw new UnauthorizedException('Forbidden: Insufficient role');
//     }
//   }