import { Controller, Delete, HttpCode, HttpStatus } from '@nestjs/common';

import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { IUserData } from '../auth/interfaces/user-date.interface';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete()
  async deleteMe(@CurrentUser() userData: IUserData): Promise<void> {
    await this.userService.deleteMe(userData);
  }
}
