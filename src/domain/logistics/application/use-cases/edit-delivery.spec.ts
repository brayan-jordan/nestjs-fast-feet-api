import { InMemoryDeliveriesRepository } from 'test/repositories/in-memory-deliveries-repository'
import { makeDelivery } from 'test/factories/make-delivery'
import { EditDeliveryUseCase } from './edit-delivery'

let inMemoryDeliveriesRepository: InMemoryDeliveriesRepository
let sut: EditDeliveryUseCase

describe('Edit delivery use case', () => {
  beforeEach(() => {
    inMemoryDeliveriesRepository = new InMemoryDeliveriesRepository()
    sut = new EditDeliveryUseCase(inMemoryDeliveriesRepository)
  })

  it('should be able to edit a delivery', async () => {
    const delivery = makeDelivery({
      latitude: 1,
      longitude: 1,
    })

    inMemoryDeliveriesRepository.items.push(delivery)

    const result = await sut.execute({
      deliveryId: delivery.id.toString(),
      latitude: 2,
      longitude: 2,
    })

    expect(result.isRight()).toBe(true)
    expect(inMemoryDeliveriesRepository.items[0].latitude).toEqual(2)
    expect(inMemoryDeliveriesRepository.items[0].longitude).toEqual(2)
  })
})
