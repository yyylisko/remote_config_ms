import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/ (GET) 404 config not found', () => {
    return request(app.getHttpServer()).get('/config/unkown').expect(400).expect({
      message: 'Config not found',
      error: 'Bad Request',
      statusCode: 400,
    });
  });

  it('/ (POST and get) 200', () => {
    const config_value = { "name": "android", "value":"{}"}
    const server = app.getHttpServer()
    request(server).post('/config/android').send(config_value).expect(201);
    return request(server).get('/config/android').expect(200).expect(config_value);
  });
});
