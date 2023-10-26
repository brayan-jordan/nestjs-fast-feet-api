import { InMemoryCouriersRepository } from 'test/repositories/in-memory-couriers-repository'
import { makeCourier } from 'test/factories/make-courier'
import { EditCourierUseCase } from './edit-courier'
import { ResourceAlreadyExistsError } from './errors/resource-already-exists-error'

let inMemoryCouriersRepository: InMemoryCouriersRepository
let sut: EditCourierUseCase

describe('Edit courier use case', () => {
  beforeEach(() => {
    inMemoryCouriersRepository = new InMemoryCouriersRepository()
    sut = new EditCourierUseCase(inMemoryCouriersRepository)
  })

  it('should be able to edit a courier', async () => {
    const courier = makeCourier({
      cpf: '987.654.321-10',
      name: 'Old name',
    })

    inMemoryCouriersRepository.items.push(courier)

    const result = await sut.execute({
      courierId: courier.id.toString(),
      cpf: '123.456.789-10',
      name: 'New name',
    })

    expect(result.isRight()).toBe(true)
    expect(inMemoryCouriersRepository.items[0].cpf).toEqual('123.456.789-10')
    expect(inMemoryCouriersRepository.items[0].name).toEqual('New name')
  })

  it('should not be able to edit a courier cpf to an already existing one', async () => {
    const existentCourier = makeCourier({
      cpf: '987.654.321-10',
    })

    inMemoryCouriersRepository.items.push(existentCourier)

    const courier = makeCourier({
      cpf: '123.456.789-10',
    })

    inMemoryCouriersRepository.items.push(courier)

    const result = await sut.execute({
      courierId: courier.id.toString(),
      cpf: '987.654.321-10',
      name: 'New name',
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(ResourceAlreadyExistsError)
  })
})
