import { ConfigController } from './config.controller';
import { ConfigService } from './config.service';
import { TestBed } from '@automock/jest';
import { BadRequestException } from '@nestjs/common/exceptions';
import { Config } from './config.entity';
import httpMocks = require('node-mocks-http');

describe('ConfigController', () => {
  let configController: ConfigController;
  let configService: jest.Mocked<ConfigService>;

  beforeAll(() => {
    const { unit, unitRef } = TestBed.create(ConfigController)
      .mock(ConfigService)
      .using({ getConfig: jest.fn() })
      .compile();
    configController = unit;
    configService = unitRef.get(ConfigService);
  });

  describe('configController tests', () => {
    it('should return 404', () => {
      const config_name = 'unkown';
      configService.getConfig.mockResolvedValue(null);
      const response = httpMocks.createResponse();

      expect(
        configController.getConfig(response, config_name),
      ).rejects.toThrowError(BadRequestException);
      expect(configService.getConfig).toHaveBeenCalled();
    });

    it('should return 200 with right config', async () => {
      const config_name = 'android_startup_config';
      const expected_config = new Config(config_name, JSON.parse('{}'));

      configService.getConfig.mockResolvedValue(expected_config);
      const response = httpMocks.createResponse();

      const result = await configController.getConfig(response, config_name);

      expect(result).toBe(expected_config);
      expect(configService.getConfig).toHaveBeenCalled();
    });
  });
});
