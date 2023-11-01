import { FakeHasher } from 'test/cryptography/fake-hasher'
import { FakeEncrypter } from 'test/cryptography/fake-encrypter'
import { makeCourier } from 'test/factories/make-courier'
import { AuthenticateUseCase } from './authenticate'
import { InMemoryUsersRepository } from 'test/repositories/in-memory-users-repository'
import { InMemoryCouriersRepository } from 'test/repositories/in-memory-couriers-repository'
import { InMemoryRecipientsRepository } from 'test/repositories/in-memory-recipients-repository'
import { InMemoryAdminsRepository } from 'test/repositories/in-memory-admins-repository'

let inMemoryCouriersRepository: InMemoryCouriersRepository
let inMemoryRecipientsRepository: InMemoryRecipientsRepository
let inMemoryAdminsRepository: InMemoryAdminsRepository
let inMemoryUsersRepository: InMemoryUsersRepository
let fakeHasher: FakeHasher
let fakeEncrypter: FakeEncrypter
let sut: AuthenticateUseCase

describe('Authenticate', () => {
  beforeEach(() => {
    inMemoryCouriersRepository = new InMemoryCouriersRepository()
    inMemoryRecipientsRepository = new InMemoryRecipientsRepository()
    inMemoryAdminsRepository = new InMemoryAdminsRepository()
    inMemoryUsersRepository = new InMemoryUsersRepository(
      inMemoryRecipientsRepository,
      inMemoryCouriersRepository,
      inMemoryAdminsRepository,
    )
    fakeHasher = new FakeHasher()
    fakeEncrypter = new FakeEncrypter()
    sut = new AuthenticateUseCase(
      inMemoryUsersRepository,
      fakeHasher,
      fakeEncrypter,
    )
  })

  it('should be able to authenticate a courier', async () => {
    const courier = makeCourier({
      cpf: '123.456.789-00',
      name: 'John Doe',
      password: await fakeHasher.hash('123456'),
    })

    inMemoryCouriersRepository.items.push(courier)

    const result = await sut.execute({
      cpf: '123.456.789-00',
      password: '123456',
    })

    expect(result.isRight()).toBe(true)
    expect(result.value).toEqual({
      accessToken: expect.any(String),
    })
  })
})
