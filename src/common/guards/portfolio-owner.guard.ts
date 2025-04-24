import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';

import { PortfolioService } from '../../modules/portfolio/portfolio.service';

@Injectable()
export class PortfolioOwnerGuard implements CanActivate {
  constructor(private readonly portfolioService: PortfolioService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    const portfolioId = request.params.id || request.params.portfolioId;

    const portfolio = await this.portfolioService.getById(portfolioId);
    if (!portfolio || portfolio.user_id !== user.id) {
      throw new ForbiddenException('No access');
    }

    return true;
  }
}
