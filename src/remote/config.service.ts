import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Config } from './config.entity';

@Injectable()
export class ConfigService {
  constructor(
    @Inject('CONFIG_REPOSITORY')
    private configRepository: Repository<Config>,
  ) {}

  async getConfig(name: string): Promise<Config | null> {
    return await this.configRepository.findOneBy({ name: name });
  }

  async setConfig(name: string, value: JSON) {
    let config = await this.getConfig(name);
    if (config) {
      config.value = value;
    } else {
      config = new Config((name = name), (value = value));
    }
    this.configRepository.save(config);
  }
}
