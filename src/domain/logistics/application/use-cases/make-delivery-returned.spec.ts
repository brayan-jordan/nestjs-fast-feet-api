import { InMemoryDeliveriesRepository } from 'test/repositories/in-memory-deliveries-repository'
import { makeDelivery } from 'test/factories/make-delivery'
import { MakeDeliveryReturnedUseCase } from './make-delivery-returned'

let inMemoryDeliveriesRepository: InMemoryDeliveriesRepository
let sut: MakeDeliveryReturnedUseCase

describe('Make delivery returned use case', () => {
  beforeEach(() => {
    inMemoryDeliveriesRepository = new InMemoryDeliveriesRepository()
    sut = new MakeDeliveryReturnedUseCase(inMemoryDeliveriesRepository)
  })

  it('should be able to change status of a delivery to returned', async () => {
    const delivery = makeDelivery({})

    inMemoryDeliveriesRepository.items.push(delivery)

    const result = await sut.execute({
      deliveryId: delivery.id.toString(),
    })

    expect(result.isRight()).toBe(true)
    expect(inMemoryDeliveriesRepository.items[0].returnedAt).toBeInstanceOf(
      Date,
    )
  })
})
