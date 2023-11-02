import { InMemoryDeliveriesRepository } from 'test/repositories/in-memory-deliveries-repository'
import { makeDelivery } from 'test/factories/make-delivery'
import { MakeDeliveryDeliveredUseCase } from './make-delivery-delivered'
import { makeCourier } from 'test/factories/make-courier'
import { makeAttachment } from 'test/factories/make-attachment'
import { InMemoryAttachmentsRepository } from 'test/repositories/in-memory-attachments-repository'

let inMemoryAttachmentsRepository: InMemoryAttachmentsRepository
let inMemoryDeliveriesRepository: InMemoryDeliveriesRepository
let sut: MakeDeliveryDeliveredUseCase

describe('Make delivery delivered use case', () => {
  beforeEach(() => {
    inMemoryAttachmentsRepository = new InMemoryAttachmentsRepository()
    inMemoryDeliveriesRepository = new InMemoryDeliveriesRepository()
    sut = new MakeDeliveryDeliveredUseCase(
      inMemoryDeliveriesRepository,
      inMemoryAttachmentsRepository,
    )
  })

  it('should be able to change status of a delivery to delivered', async () => {
    const courier = makeCourier()
    const attachment = makeAttachment()

    inMemoryAttachmentsRepository.items.push(attachment)

    const delivery = makeDelivery({
      courierId: courier.id,
    })

    inMemoryDeliveriesRepository.items.push(delivery)

    const result = await sut.execute({
      deliveryId: delivery.id.toString(),
      courierId: courier.id.toString(),
      attachmentId: attachment.id.toString(),
    })

    expect(result.isRight()).toBe(true)
    expect(inMemoryDeliveriesRepository.items[0].deliveredAt).toBeInstanceOf(
      Date,
    )
    expect(
      inMemoryDeliveriesRepository.items[0].attachmentProopOfShippingId.toString(),
    ).toBe(attachment.id.toString())
  })
})
