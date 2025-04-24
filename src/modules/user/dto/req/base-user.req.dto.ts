import { IsString, Matches } from 'class-validator';

export class BaseUserReqDto {
  @IsString()
  @Matches(/^[^\s@]+@([^\s@.,]+\.)+[^\s@.,]{2,}$/, {
    message: 'Invalid email',
  })
  public email: string;

  @IsString()
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()]).{7,32}$/, {
    message: 'Invalid password',
  })
  public password: string;
}
