import { Delivery as DomainDelivery } from '@/domain/logistics/enterprise/entities/delivery'

export class DeliveryPresenter {
  static toHTTP(delivery: DomainDelivery) {
    return {
      id: delivery.id.toString(),
      courierId: delivery.courierId.toString(),
      recipientId: delivery.recipientId.toString(),
      availableToPickupAt: delivery.availableToPickupAt,
      collectedAt: delivery.collectedAt,
      deliveredAt: delivery.deliveredAt,
      returnedAt: delivery.returnedAt,
      latitude: delivery.latitude,
      longitude: delivery.longitude,
      status: delivery.status,
    }
  }
}
