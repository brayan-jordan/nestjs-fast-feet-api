import { FakeHasher } from 'test/cryptography/fake-hasher'
import { InMemoryCouriersRepository } from 'test/repositories/in-memory-couriers-repository'
import { makeCourier } from 'test/factories/make-courier'
import { ChangeCourierPasswordUseCase } from './change-courier-password'

let inMemoryCouriersRepository: InMemoryCouriersRepository
let fakeHasher: FakeHasher
let sut: ChangeCourierPasswordUseCase

describe('Change courier password use case', () => {
  beforeEach(() => {
    inMemoryCouriersRepository = new InMemoryCouriersRepository()
    fakeHasher = new FakeHasher()
    sut = new ChangeCourierPasswordUseCase(
      inMemoryCouriersRepository,
      fakeHasher,
    )
  })

  it('should be able to change password of an courier', async () => {
    const courier = makeCourier({
      password: '1234',
    })

    inMemoryCouriersRepository.items.push(courier)

    const result = await sut.execute({
      courierId: courier.id.toString(),
      password: '123456',
    })

    const newPasswordHashed = await fakeHasher.hash('123456')

    expect(result.isRight()).toBe(true)
    expect(inMemoryCouriersRepository.items[0].password).toEqual(
      newPasswordHashed,
    )
  })
})
