import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './products/products.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import typeOrmConfig from './config/typeorm';
import { CategoryModule } from './categories/category.module';
import { OrdersModule } from './orders/orders.module';
import { FilesModule } from './files/files.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [typeOrmConfig],
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) =>
        configService.get('typeorm'),
    }),
    ProductsModule,
    UsersModule,
    AuthModule,
    CategoryModule,
    OrdersModule,
    FilesModule,
    JwtModule.register({
      global:true,
      signOptions:{expiresIn:'1h'},
      secret:process.env.JWT_SECRET
    })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}


