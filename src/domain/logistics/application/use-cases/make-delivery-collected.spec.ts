import { InMemoryDeliveriesRepository } from 'test/repositories/in-memory-deliveries-repository'
import { makeDelivery } from 'test/factories/make-delivery'
import { MakeDeliveryCollectedUseCase } from './make-delivery-collected'

let inMemoryDeliveriesRepository: InMemoryDeliveriesRepository
let sut: MakeDeliveryCollectedUseCase

describe('Make delivery collected use case', () => {
  beforeEach(() => {
    inMemoryDeliveriesRepository = new InMemoryDeliveriesRepository()
    sut = new MakeDeliveryCollectedUseCase(inMemoryDeliveriesRepository)
  })

  it('should be able to change status of a delivery to collected', async () => {
    const delivery = makeDelivery({})

    inMemoryDeliveriesRepository.items.push(delivery)

    const result = await sut.execute({
      deliveryId: delivery.id.toString(),
    })

    expect(result.isRight()).toBe(true)
    expect(inMemoryDeliveriesRepository.items[0].collectedAt).toBeInstanceOf(
      Date,
    )
  })
})
