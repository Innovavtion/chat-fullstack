import { IsString, IsNotEmpty } from 'class-validator';

export class CreateChatDto {
  @IsString()
  @IsNotEmpty()
  userId: string;
}
