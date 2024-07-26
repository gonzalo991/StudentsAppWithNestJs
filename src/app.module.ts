import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
// Importe ConfigModule y ConfigService para la confifuración de la base 
// de datos con variables de entorno
import { ConfigModule, ConfigService } from '@nestjs/config';
// Importé las configuraciones de las variables de entorno de la carpeta config/configuration.ts
import configuration from './config/configuration';
// Importé MongooseModule del paquetes de nest mongoose para configurar el acceso a la base de datos mongodb
import { MongooseModule } from '@nestjs/mongoose';
import { PupilsModule } from './pupils/pupils.module';
import { SubjectsModule } from './subjects/subjects.module';

@Module({

  imports: [
    // Usé ConfigModule para cargar las configuraciones de las variables de entorno
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration]
    }),

    // Utilizo el modulo de mongoose para cargar la configuracion de mongoose de forma asincrona
    // e injectar el modulo ConfigModule para poder usar el ConfigService
    MongooseModule.forRootAsync({
      // Importamos al modulo el modulo de configuracion para poder usar su ConfigService
      imports: [ConfigModule],
      // La fabrica obtiene la uri de la base de datos usando el ConfigService
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('database.uri'),
      }),
      inject: [ConfigService],
    }),

    PupilsModule,

    SubjectsModule,

  ],

  controllers: [AppController],

  providers: [AppService],

})
export class AppModule { }
