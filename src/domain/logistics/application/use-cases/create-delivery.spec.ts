import { InMemoryDeliveriesRepository } from 'test/repositories/in-memory-deliveries-repository'
import { CreateDeliveryUseCase } from './create-delivery'
import { InMemoryCouriersRepository } from 'test/repositories/in-memory-couriers-repository'
import { InMemoryRecipientsRepository } from 'test/repositories/in-memory-recipients-repository'
import { makeRecipient } from 'test/factories/make-recipient'
import { makeCourier } from 'test/factories/make-courier'

let inMemoryDeliveriesRepository: InMemoryDeliveriesRepository
let inMemoryCouriersRepository: InMemoryCouriersRepository
let inMemoryRecipientsRepository: InMemoryRecipientsRepository
let sut: CreateDeliveryUseCase

describe('Create recipient use case', () => {
  beforeEach(() => {
    inMemoryDeliveriesRepository = new InMemoryDeliveriesRepository()
    inMemoryCouriersRepository = new InMemoryCouriersRepository()
    inMemoryRecipientsRepository = new InMemoryRecipientsRepository()
    sut = new CreateDeliveryUseCase(
      inMemoryDeliveriesRepository,
      inMemoryRecipientsRepository,
      inMemoryCouriersRepository,
    )
  })

  it('should be able to create a delivery', async () => {
    const recipient = makeRecipient()

    inMemoryRecipientsRepository.items.push(recipient)

    const courier = makeCourier()

    inMemoryCouriersRepository.items.push(courier)

    const result = await sut.execute({
      recipientId: recipient.id.toString(),
      courierId: courier.id.toString(),
      latitude: 1,
      longitude: 1,
    })

    expect(result.isRight()).toBe(true)
    expect(result.value).toEqual({
      delivery: inMemoryDeliveriesRepository.items[0],
    })
  })
})
