import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ResourcesController } from './resources/resources.controller';
import { ResourcesService } from './service/resources.service';

@Module({
  imports: [],
  controllers: [AppController, ResourcesController],
  providers: [AppService, ResourcesService],
})
export class AppModule {}
