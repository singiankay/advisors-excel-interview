import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { AppController } from '../app.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Accounts } from 'src/entities/account.entity';
import { Module } from '@nestjs/common';
import { AccountService } from 'src/account/account.service';
import { JwtAuthService } from './jwt.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Accounts]),
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '300s' },
    }),
  ],
  providers: [JwtAuthService, AccountService, AuthService],
  controllers: [AppController],
  exports: [TypeOrmModule, AuthService],
})
export class AuthModule {
  constructor(
    private jwtAuthService: JwtAuthService,
    private accountService: AccountService,
  ) {}
}
