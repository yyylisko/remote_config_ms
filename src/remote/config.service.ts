import { Injectable, Inject, Logger } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Config } from './config.entity';

@Injectable()
export class ConfigService {

  private readonly logger = new Logger(ConfigService.name);

  constructor(
    @Inject('CONFIG_REPOSITORY')
    private configRepository: Repository<Config>,
  ) {}

  async getConfig(name: string): Promise<Config | null> {
    this.logger.debug(`get config for name: ${name}`)
    const config = await this.configRepository.findOneBy({ name: name });
    this.logger.debug(`got config: ${JSON.stringify(config)} for name: ${name}`)
    return config
  }

  async setConfig(name: string, config: Config) {
    let config_db = await this.getConfig(name);
    if (config_db) {
      this.logger.debug(`config already exist for name: ${name}, will be updated`)
      config_db.value = config.value;
    } else {
      this.logger.debug(`config not exist for name: ${name}, will be created`)
      config_db = config
    }
    this.logger.debug(`saving config for name: ${name}`)
    this.configRepository.save(config_db);
  }
}
