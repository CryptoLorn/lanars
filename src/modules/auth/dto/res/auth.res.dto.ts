import { PublicUserResDto } from '../../../user/dto/res/public-user.res.dto';
import { ITokenPair } from '../../interfaces/token-pair.interface';

export class AuthResDto {
  user: PublicUserResDto;
  tokens: ITokenPair;
}
