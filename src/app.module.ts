import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import 'dotenv/config';
import { DataSource } from 'typeorm';
import { AuthModule } from './auth/auth.module';
import { AuthService } from './auth/auth.service';
import { JwtAuthService } from './auth/jwt.service';
import { AccountService } from './account/account.service';

const db: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  entities: ['dist/**/*.entity{.ts,.js}'],
  synchronize: true,
};

@Module({
  imports: [TypeOrmModule.forRoot(db), AuthModule],
  controllers: [AppController],
  providers: [AuthService, JwtAuthService, AccountService],
})
export class AppModule {
  constructor(
    private dataSource: DataSource,
    private authService: AuthService,
    private jwtAuthService: JwtAuthService,
    private accountService: AccountService,
  ) {}
}
