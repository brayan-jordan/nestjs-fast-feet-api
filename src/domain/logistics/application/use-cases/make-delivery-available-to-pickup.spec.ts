import { InMemoryDeliveriesRepository } from 'test/repositories/in-memory-deliveries-repository'
import { makeDelivery } from 'test/factories/make-delivery'
import { MakeDeliveryAvailableToPickupUseCase } from './make-delivery-available-to-pickup'

let inMemoryDeliveriesRepository: InMemoryDeliveriesRepository
let sut: MakeDeliveryAvailableToPickupUseCase

describe('Make delivery available to pickup use case', () => {
  beforeEach(() => {
    inMemoryDeliveriesRepository = new InMemoryDeliveriesRepository()
    sut = new MakeDeliveryAvailableToPickupUseCase(inMemoryDeliveriesRepository)
  })

  it('should be able to change status of a delivery to available to pickup', async () => {
    const delivery = makeDelivery({})

    inMemoryDeliveriesRepository.items.push(delivery)

    const result = await sut.execute({
      deliveryId: delivery.id.toString(),
    })

    expect(result.isRight()).toBe(true)
    expect(
      inMemoryDeliveriesRepository.items[0].availableToPickupAt,
    ).toBeInstanceOf(Date)
  })
})
