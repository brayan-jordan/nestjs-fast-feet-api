import { InMemoryDeliveriesRepository } from 'test/repositories/in-memory-deliveries-repository'
import { makeDelivery } from 'test/factories/make-delivery'
import { FetchDeliveriesFromRecipientUseCase } from './fetch-deliveries-from-recipient'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'

let inMemoryDeliveriesRepository: InMemoryDeliveriesRepository
let sut: FetchDeliveriesFromRecipientUseCase

describe('Fetch deliveries from recipient use case', () => {
  beforeEach(() => {
    inMemoryDeliveriesRepository = new InMemoryDeliveriesRepository()
    sut = new FetchDeliveriesFromRecipientUseCase(inMemoryDeliveriesRepository)
  })

  it('should be able to fetch deliveries from recipient', async () => {
    const recipientId1 = new UniqueEntityID()
    const recipientId2 = new UniqueEntityID()

    const delivery1 = makeDelivery({
      recipientId: recipientId1,
    })

    inMemoryDeliveriesRepository.items.push(delivery1)

    const delivery2 = makeDelivery({
      recipientId: recipientId2,
    })

    inMemoryDeliveriesRepository.items.push(delivery2)

    const result = await sut.execute({
      recipientId: recipientId1.toString(),
    })

    expect(result.isRight()).toBe(true)
    expect(result.value.deliveries).toEqual([
      expect.objectContaining({
        id: delivery1.id,
      }),
    ])
  })
})
