import { InMemoryDeliveriesRepository } from 'test/repositories/in-memory-deliveries-repository'
import { makeDelivery } from 'test/factories/make-delivery'
import { MakeDeliveryDeliveredUseCase } from './make-delivery-delivered'

let inMemoryDeliveriesRepository: InMemoryDeliveriesRepository
let sut: MakeDeliveryDeliveredUseCase

describe('Make delivery delivered use case', () => {
  beforeEach(() => {
    inMemoryDeliveriesRepository = new InMemoryDeliveriesRepository()
    sut = new MakeDeliveryDeliveredUseCase(inMemoryDeliveriesRepository)
  })

  it('should be able to change status of a delivery to delivered', async () => {
    const delivery = makeDelivery({})

    inMemoryDeliveriesRepository.items.push(delivery)

    const result = await sut.execute({
      deliveryId: delivery.id.toString(),
    })

    expect(result.isRight()).toBe(true)
    expect(inMemoryDeliveriesRepository.items[0].deliveredAt).toBeInstanceOf(
      Date,
    )
  })
})
