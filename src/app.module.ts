import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LogsModule } from './logs/logs.module';

@Module({
  imports: [
    AuthModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'password',
      database: 'log-api',
      autoLoadEntities: true,
      synchronize: true,
    }),
    LogsModule
  ],
})
export class AppModule {}
