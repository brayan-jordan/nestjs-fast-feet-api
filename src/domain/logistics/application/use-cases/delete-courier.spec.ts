import { InMemoryCouriersRepository } from 'test/repositories/in-memory-couriers-repository'
import { makeCourier } from 'test/factories/make-courier'
import { DeleteCourierUseCase } from './delete-courier'

let inMemoryCouriersRepository: InMemoryCouriersRepository
let sut: DeleteCourierUseCase

describe('Delete courier use case', () => {
  beforeEach(() => {
    inMemoryCouriersRepository = new InMemoryCouriersRepository()
    sut = new DeleteCourierUseCase(inMemoryCouriersRepository)
  })

  it('should be able to delete a courier', async () => {
    const courier = makeCourier()

    inMemoryCouriersRepository.items.push(courier)

    const result = await sut.execute({
      courierId: courier.id.toString(),
    })

    expect(result.isRight()).toBe(true)
    expect(inMemoryCouriersRepository.items).toHaveLength(0)
  })
})
