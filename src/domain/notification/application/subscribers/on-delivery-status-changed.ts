import { DomainEvents } from '@/core/events/domain-events'
import { EventHandler } from '@/core/events/event-handler'
import { SendNotificationUseCase } from '../use-cases/send-notification'
import { DeliveryStatusChangedEvent } from '@/domain/logistics/enterprise/events/delivery-status-changed-event'
import { Injectable } from '@nestjs/common'

@Injectable()
export class OnDeliveryStatusChanged implements EventHandler {
  constructor(private sendNotificationUseCase: SendNotificationUseCase) {
    this.setupSubscriptions()
  }

  setupSubscriptions(): void {
    DomainEvents.register(
      this.sendOnDeliveryStatusChangedNotification.bind(this),
      DeliveryStatusChangedEvent.name,
    )
  }

  private async sendOnDeliveryStatusChangedNotification({
    delivery,
  }: DeliveryStatusChangedEvent) {
    await this.sendNotificationUseCase.execute({
      title: 'Houve uma mudança no status da sua entrega',
      content: 'A entrega foi atualizada para o status: ' + delivery.status,
      recipientId: delivery.recipientId.toString(),
    })
  }
}
