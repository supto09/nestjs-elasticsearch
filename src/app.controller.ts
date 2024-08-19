import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import {
  ELASTIC_CONFIG_KEY,
  ElasticConfigType,
} from '@/config/configs/elastic.config';
import { ConfigService } from '@nestjs/config';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private configsService: ConfigService,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
