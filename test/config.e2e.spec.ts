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

  afterAll(async () => {
    await app.close()
  })

  it('/ (GET) 404 config not found', async () => {
    const result = await request(app.getHttpServer()).get('/config/unkown')
    expect(result.status).toBe(400)
    expect(result.body).toEqual({
      message: 'Config not found',
      error: 'Bad Request',
      statusCode: 400,
    });
  });

  it('/ (POST and get) 200', async () =>  {
    const config_value = { "name": "android", "value":"{}"}
    const server = app.getHttpServer()
    const result = await request(server).post('/config/android').send(config_value);
    expect(result.status).toBe(201)
    const getResult = await request(server).get('/config/android');
    expect(getResult.status).toBe(200);
    config_value["id"] = 1
    expect(getResult.body).toEqual(config_value)
  });
});
