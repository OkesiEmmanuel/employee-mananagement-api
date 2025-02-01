import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsUUID, IsOptional } from 'class-validator';

export class CreateEmployeeDto {
  @ApiProperty({ example: 'John', description: 'Employee first name' })
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @ApiProperty({ example: 'Doe', description: 'Employee last name' })
  @IsString()
  @IsNotEmpty()
  lastName: string;

  @ApiProperty({ example: '123e4567-e89b-12d3-a456-426614174000', description: 'User ID linked to the employee' })
  @IsUUID()
  @IsNotEmpty()
  userId: string;

  @ApiProperty({ example: '123e4567-e89b-12d3-a456-426614174111', description: 'Department ID (optional)' })
  @IsUUID()
  departmentId?: string;
}
export class AssignDepartmentDto {
  @ApiProperty({ example: '123e4567-e89b-12d3-a456-426614174111', description: 'Department ID' })
  @IsUUID()
  @IsNotEmpty()
  departmentId: string;
}

export class UpdateEmployeeDto {
  @ApiProperty({ example: 'Okesi', description: 'Updated first name', required: false })
  @IsString()
  @IsOptional()
  firstName?: string;

  @ApiProperty({ example: 'Emmanuel', description: 'Updated last name', required: false })
  @IsString()
  @IsOptional()
  lastName?: string;

  @ApiProperty({ example: '123e4567-e89b-12d3-a456-426614174111', description: 'Updated Department ID', required: false })
  @IsUUID()
  @IsOptional()
  departmentId?: string;
}
