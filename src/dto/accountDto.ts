import { jwtDto } from './jwtDto';

export class AccountDto {
  account_number: number;
  account_type: string;
}

export class HeaderDto {
  account: AccountDto;
  jwt: jwtDto;
}

export enum AccountType {
  Checking = 'checking',
  Savings = 'savings',
  Credit = 'credit',
}

export class AuthDto {
  account_number: number;
}
