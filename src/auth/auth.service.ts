import { Injectable, NotFoundException } from '@nestjs/common';
import { JwtAuthService } from './jwt.service';
import { AuthDto, HeaderDto } from 'src/dto/accountDto';
import { Repository } from 'typeorm';
import { Accounts } from '../entities/account.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { AccountService } from 'src/account/account.service';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Accounts)
    private accountsRepository: Repository<Accounts>,
    private jwtAuthService: JwtAuthService,
    private accountService: AccountService,
  ) {}
  async auth(auth: AuthDto): Promise<HeaderDto> {
    const account = await this.accountService.getAccount(auth);
    if (!account) {
      throw new NotFoundException('Account Not Found!');
    }
    const header = new HeaderDto();
    header.jwt = await this.jwtAuthService.generateJwtToken(account);
    header.account = account;
    return header;
  }
}
