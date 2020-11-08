import ApprError from '@shared/errors/AppError';

import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';
import FakeUsersRepository from '../repositories/fakes/FakeUserRepository';
import CreateUsersService from './CreateUsersService';
import FakeHashRepository from '../providers/HashProvider/fakes/FakeHashProvider';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashRepository: FakeHashRepository;
let createUser: CreateUsersService;
let fakeCacheProvider: FakeCacheProvider;

describe('CreateUser', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashRepository = new FakeHashRepository();
    fakeCacheProvider = new FakeCacheProvider();
    createUser = new CreateUsersService(
      fakeUsersRepository,
      fakeHashRepository,
      fakeCacheProvider,
    );
  });

  it('should be to create a new user', async () => {
    const user = await createUser.execute({
      name: 'Jhone Doe',
      email: 'jhondoe@example.com',
      password: '123456',
    });

    expect(user).toHaveProperty('id');
  });

  it('should be to create a new user with same email from another', async () => {
    await createUser.execute({
      name: 'Jhone Doe',
      email: 'jhondoe@example.com',
      password: '123456',
    });

    await expect(
      createUser.execute({
        name: 'Jhone Doe',
        email: 'jhondoe@example.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(ApprError);
  });
});
