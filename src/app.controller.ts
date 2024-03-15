import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth/auth.service';
import { AuthDto, HeaderDto } from './dto/accountDto';
import { AuthGuard } from './auth/auth.guard';
import { AccountService } from './account/account.service';
import { Request } from 'express';
import { depositDto, withdrawDto } from './dto/depositDto';

@Controller()
export class AppController {
  constructor(
    private readonly authService: AuthService,
    private readonly accountService: AccountService,
  ) {}

  @Post()
  async auth(@Body() auth: AuthDto): Promise<HeaderDto> {
    return this.authService.auth(auth);
  }

  @UseGuards(AuthGuard)
  @Get('balance')
  async getBalance(@Req() req: Request) {
    return this.accountService.getAccountFromHeaders(req.headers.authorization);
  }

  @UseGuards(AuthGuard)
  @Post('deposit')
  async addDeposit(@Body() amount: depositDto, @Req() req: Request) {
    return this.accountService.deposit(amount, req.headers.authorization);
  }

  @UseGuards(AuthGuard)
  @Post('withdraw')
  async withdrawDto(@Body() amount: withdrawDto, @Req() req: Request) {
    return this.accountService.withdraw(amount, req.headers.authorization);
  }
}
