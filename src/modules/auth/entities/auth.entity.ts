import { ApiProperty } from '@nestjs/swagger';
import { Role, $Enums } from '@prisma/client';

// type Role = $Enums.Role; 

export class Auth {
  @ApiProperty({ example: '123e4567-e89b-12d3-a456-426614174000', description: 'User ID' })
  id: string;

  @ApiProperty({ example: 'user@example.com', description: 'User email address' })
  email: string;

  @ApiProperty({ example: 'EMPLOYEE', description: 'User role', enum: Object.values(Role) })
  role: Role;

  @ApiProperty({ example: 'PASSWORD', description: 'Password' })
  password: string;

  @ApiProperty({ example: '2025-01-01T00:00:00.000Z', description: 'User account creation date' })
  createdAt: Date;

  @ApiProperty({ example: '2025-01-02T00:00:00.000Z', description: 'User account last update date' })
  updatedAt: Date;
}
