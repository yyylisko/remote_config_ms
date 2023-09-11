import {
  BadRequestException,
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Post,
  Res,
} from '@nestjs/common';
import { ConfigService } from './config.service';
import { Response } from 'express';
import { Config } from './config.entity';
@Controller('config/')
export class ConfigController {
  configService: ConfigService;
  constructor(configService: ConfigService) {
    this.configService = configService;
  }

  @Get(':name')
  async getConfig(@Res() res: Response, @Param('name') name: string) {
    const config = await this.configService.getConfig(name);
    if (config) {
      return res.status(HttpStatus.OK).json(config); // Not really need response object here, but it is a good example for mocking resposne object in unit tests
    } else {
      throw new BadRequestException('Config not found');
    }
  }

  @Post(':name')
  async setConfig(@Param('name') name: string, @Body() body: Config) {
    await this.configService.setConfig(name, body);
  }
}
