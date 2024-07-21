import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ItemsModule } from './items/items.module';
import { ConfigModule } from '@nestjs/config';
import configuration from './config/configuration';

@Module({

  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration]
    }),
    ItemsModule
  ],

  controllers: [AppController],

  providers: [AppService],

})
export class AppModule {}
