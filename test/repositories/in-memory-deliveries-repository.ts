import { DomainEvents } from '@/core/events/domain-events'
import {
  DeliveriesRepository,
  FetchNearbyDeliveriesRequest,
} from '@/domain/logistics/application/repositories/deliveries-repository'
import { Delivery } from '@/domain/logistics/enterprise/entities/delivery'
import { getDistanceBetweenCoordinates } from 'utils/get-distance-between-coordinates'

export class InMemoryDeliveriesRepository implements DeliveriesRepository {
  public items: Delivery[] = []

  async create(delivery: Delivery) {
    this.items.push(delivery)
  }

  async findById(id: string) {
    const delivery = this.items.find((item) => item.id.toString() === id)

    if (!delivery) {
      return null
    }

    return delivery
  }

  async delete(delivery: Delivery): Promise<void> {
    const index = this.items.findIndex((item) => item.id === delivery.id)

    this.items.splice(index, 1)
  }

  async save(delivery: Delivery): Promise<void> {
    const index = this.items.findIndex((item) => item.id === delivery.id)

    this.items[index] = delivery

    DomainEvents.dispatchEventsForAggregate(delivery.id)
  }

  async fetchNearbyDeliveries(params: FetchNearbyDeliveriesRequest) {
    const MAX_DISTANCE_IN_KILOMETERS = 10

    return this.items.filter((item) => {
      const distance = getDistanceBetweenCoordinates(
        {
          latitude: params.latitude,
          longitude: params.longitude,
        },
        {
          latitude: item.latitude,
          longitude: item.longitude,
        },
      )

      return (
        distance < MAX_DISTANCE_IN_KILOMETERS &&
        item.courierId.toString() === params.courierId
      )
    })
  }

  async fetchDeliveriesFromCourier(courierId: string) {
    return this.items.filter((item) => item.courierId.toString() === courierId)
  }

  async fetchDeliveriesFromRecipient(recipientId: string) {
    return this.items.filter(
      (item) => item.recipientId.toString() === recipientId,
    )
  }

  async findMany(): Promise<Delivery[]> {
    return this.items
  }
}
