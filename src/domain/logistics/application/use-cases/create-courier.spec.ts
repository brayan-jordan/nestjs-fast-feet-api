import { FakeHasher } from 'test/cryptography/fake-hasher'
import { InMemoryCouriersRepository } from 'test/repositories/in-memory-couriers-repository'
import { CreateCourierUseCase } from './create-courier'
import { makeCourier } from 'test/factories/make-courier'
import { ResourceAlreadyExistsError } from './errors/resource-already-exists-error'

let inMemoryCouriersRepository: InMemoryCouriersRepository
let fakeHasher: FakeHasher
let sut: CreateCourierUseCase

describe('Create courier use case', () => {
  beforeEach(() => {
    inMemoryCouriersRepository = new InMemoryCouriersRepository()
    fakeHasher = new FakeHasher()
    sut = new CreateCourierUseCase(inMemoryCouriersRepository, fakeHasher)
  })

  it('should be able to create a courier', async () => {
    const result = await sut.execute({
      cpf: '123.456.789-10',
      name: 'John Doe',
      password: '123456',
    })

    expect(result.isRight()).toBe(true)
    expect(result.value).toEqual({
      courier: inMemoryCouriersRepository.items[0],
    })
  })

  it('should hash courier password upon registration', async () => {
    const result = await sut.execute({
      cpf: '123.456.789-10',
      name: 'John Doe',
      password: '123456',
    })

    expect(result.isRight()).toBe(true)
    expect(inMemoryCouriersRepository.items[0].password).toEqual(
      '123456-hashed',
    )
  })

  it('not should be able to create a courier with same cpf', async () => {
    const existingCourier = makeCourier()

    inMemoryCouriersRepository.items.push(existingCourier)

    const result = await sut.execute({
      cpf: existingCourier.cpf,
      name: 'John Doe',
      password: '123456',
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(ResourceAlreadyExistsError)
  })
})
