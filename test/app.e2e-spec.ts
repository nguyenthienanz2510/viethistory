import { Test } from '@nestjs/testing';
import { AppModule } from '../src/app.module';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { PrismaService } from '../src/prisma/prisma.service';
import * as pactum from 'pactum';
import { InitService } from '../src/init/init.service';

const PORT = 4001;

describe('APP ENDTOEND TEST', () => {
  let app: INestApplication;
  let prismaService: PrismaService;
  let initService: InitService;
  beforeAll(async () => {
    const appModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
    app = await appModule.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();
    await app.listen(PORT);
    console.log(`listening app test on port ${PORT}`);
    prismaService = app.get(PrismaService);
    await prismaService.cleanDatabase();

    initService = app.get(InitService);
    await initService.initDatabase();

    pactum.request.setBaseUrl(`http://localhost:${PORT}`);
  });

  describe('Test Authentication', () => {
    describe('Register', () => {
      it('should register successful', () => {
        return pactum
          .spec()
          .post('/auth/register')
          .withBody({
            email: 'andreenguyen@gmail.com',
            password: 'umap12345',
            role: 'admin',
            status: 'active',
          })
          .expectStatus(201);
      });

      it('should error when email already exist', () => {
        return pactum
          .spec()
          .post('/auth/register')
          .withBody({
            email: 'andreenguyen@gmail.com',
            password: 'umap12345',
            role: 'admin',
            status: 'active',
          })
          .expectStatus(400);
      });

      it('should error when email invalid', () => {
        return pactum
          .spec()
          .post('/auth/register')
          .withBody({
            email: 'andreenguyen',
            password: 'umap12345',
            role: 'admin',
            status: 'active',
          })
          .expectStatus(400);
      });

      it('should error when email empty', () => {
        return pactum
          .spec()
          .post('/auth/register')
          .withBody({
            email: '',
            password: 'umap12345',
            role: 'admin',
            status: 'active',
          })
          .expectStatus(400);
      });

      it('should error when password empty', () => {
        return pactum
          .spec()
          .post('/auth/register')
          .withBody({
            email: 'andreenguyen02@gmail.com',
            password: '',
            role: 'admin',
            status: 'active',
          })
          .expectStatus(400);
      });
    });

    describe('Login', () => {
      it('should login successful', () => {
        return pactum
          .spec()
          .post('/auth/login')
          .withBody({
            email: 'andreenguyen@gmail.com',
            password: 'umap12345',
          })
          .expectStatus(201)
          .stores('accessToken', 'accessToken')
          .stores('refreshToken', 'refreshToken');
      });

      it('should error when email not found', () => {
        return pactum
          .spec()
          .post('/auth/login')
          .withBody({
            email: 'andreenguyennotfound@gmail.com',
            password: 'umap12345',
          })
          .expectStatus(400);
      });

      it('should error when email invalid', () => {
        return pactum
          .spec()
          .post('/auth/login')
          .withBody({
            email: 'andreenguyen',
            password: 'umap12345',
          })
          .expectStatus(400);
      });

      it('should error when email empty', () => {
        return pactum
          .spec()
          .post('/auth/login')
          .withBody({
            email: '',
            password: 'umap12345',
          })
          .expectStatus(400);
      });

      it('should error when password empty', () => {
        return pactum
          .spec()
          .post('/auth/login')
          .withBody({
            email: 'andreenguyen02@gmail.com',
            password: '',
          })
          .expectStatus(400);
      });
      it('should error when password incorrect', () => {
        return pactum
          .spec()
          .post('/auth/login')
          .withBody({
            email: 'andreenguyen02@gmail.com',
            password: 'umap44444',
          })
          .expectStatus(400);
      });
    });

    describe('User', () => {
      it('should get me information', () => {
        return pactum
          .spec()
          .get('/users/me')
          .withHeaders({
            Authorization: `Bearer $S{accessToken}`,
          })
          .expectStatus(200);
      });
    });
  });

  afterAll(async () => {
    app.close();
  });
});
