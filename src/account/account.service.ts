import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Accounts } from '../entities/account.entity';
import { AccountDto, AccountType, AuthDto } from 'src/dto/accountDto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { JwtAuthService } from 'src/auth/jwt.service';

@Injectable()
export class AccountService {
  constructor(
    @InjectRepository(Accounts)
    private accountsRepository: Repository<Accounts>,
    private jwtService: JwtService,
    private jwtAuthService: JwtAuthService,
  ) {}
  async getAccount(auth: AuthDto): Promise<AccountDto> {
    const result = await this.findOne(auth.account_number);
    if (!result) {
      throw new NotFoundException('Account not found!');
    }
    const accounts = new AccountDto();
    accounts.account_number = result.account_number;
    accounts.account_type = result.type;
    return accounts;
  }

  async getAccountFromHeaders(authorization: string): Promise<Accounts | null> {
    const account = await this.jwtAuthService.decodeHeaders(authorization);
    const result = await this.findOne(account.sub);
    return result;
  }

  async deposit(body: any, authorization: string): Promise<Accounts> {
    const account = await this.jwtAuthService.decodeHeaders(authorization);
    const result = await this.addAmount(account.sub, body.amount);
    return result;
  }
  async withdraw(body: any, authorization: string): Promise<Accounts> {
    const account = await this.jwtAuthService.decodeHeaders(authorization);
    const result = await this.subtractAmount(account.sub, body.amount);
    return result;
  }

  protected async findOne(account_number: number): Promise<Accounts | null> {
    return this.accountsRepository.findOneBy({ account_number });
  }

  protected async addAmount(account_number, quantity): Promise<any> {
    let total;
    const account = await this.accountsRepository.findOneBy({ account_number });
    if (account.type == AccountType.Credit && account.amount + quantity > 0) {
      throw new BadRequestException(
        'You cannot deposit more than the credit amount',
      );
    } else {
      total = account.amount + quantity;
    }
    const result = await this.accountsRepository.update(account_number, {
      amount: total,
    });
    return result;
  }

  protected async subtractAmount(account_number, quantity): Promise<any> {
    if (quantity % 5 != 0) {
      throw new BadRequestException(
        'You can only withdraw an amount by a factor of $5',
      );
    }
    const account = await this.accountsRepository.findOneBy({ account_number });
    if (account.type == AccountType.Credit) {
      if (account.amount + account.credit_limit - quantity < 0) {
        throw new BadRequestException(
          'Your withdrawal amunt exceeds the credit limit',
        );
      }
    } else {
      if (account.amount < quantity) {
        throw new BadRequestException(
          'Your withdrawal amunt exceeds your account balance',
        );
      }
    }
    const total = account.amount - quantity;
    const result = await this.accountsRepository.update(account_number, {
      amount: total,
    });
    return result;
  }
}
