import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ItemsModule } from './items/items.module';
import { ConfigModule } from '@nestjs/config';

@Module({

  imports: [
    ConfigModule,
    ItemsModule
  ],

  controllers: [AppController],

  providers: [AppService],
  
})
export class AppModule {}
