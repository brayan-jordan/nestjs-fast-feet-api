import {
  SendNotificationUseCase,
  SendNotificationUseCaseRequest,
  SendNotificationUseCaseResponse,
} from '../use-cases/send-notification'
import { InMemoryNotificationsRepository } from 'test/repositories/in-memory-notifications-repository'
import { SpyInstance, vi } from 'vitest'
import { OnDeliveryStatusChanged } from './on-delivery-status-changed'
import { makeDelivery } from 'test/factories/make-delivery'
import { waitFor } from 'test/utils/wait-for'
import { InMemoryDeliveriesRepository } from 'test/repositories/in-memory-deliveries-repository'

let inMemoryDeliveriesRepository: InMemoryDeliveriesRepository
let inMemoryNotificationsRepository: InMemoryNotificationsRepository
let sendNotificationUseCase: SendNotificationUseCase

let sendNotificationExecuteSpy: SpyInstance<
  [SendNotificationUseCaseRequest],
  Promise<SendNotificationUseCaseResponse>
>

describe('On delivery status changed', () => {
  beforeEach(() => {
    inMemoryDeliveriesRepository = new InMemoryDeliveriesRepository()
    inMemoryNotificationsRepository = new InMemoryNotificationsRepository()
    sendNotificationUseCase = new SendNotificationUseCase(
      inMemoryNotificationsRepository,
    )

    sendNotificationExecuteSpy = vi.spyOn(sendNotificationUseCase, 'execute')

    new OnDeliveryStatusChanged(sendNotificationUseCase)
  })

  it('should send a notification when a delivery status is changed', async () => {
    const delivery = makeDelivery()

    await inMemoryDeliveriesRepository.create(delivery)

    delivery.returnedAt = new Date()

    await inMemoryDeliveriesRepository.save(delivery)

    await waitFor(() => {
      expect(sendNotificationExecuteSpy).toHaveBeenCalled()
    })
  })
})
