import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostModule } from './post/post.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import databaseConfig from './config/database.config';
import serverConfig from './config/server.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [databaseConfig, serverConfig],
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return {
          type: 'mysql',
          host: configService.get<string>('db_host'),
          port: configService.get<number>('db_port'),
          username: configService.get<string>('db_username'),
          password: configService.get<string>('db_password'),
          database: configService.get<string>('db_name'),
          autoLoadEntities: true,
          synchronize: true,
        };
      },
    }),
    PostModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
