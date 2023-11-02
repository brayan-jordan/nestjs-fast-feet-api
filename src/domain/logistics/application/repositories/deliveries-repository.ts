import { Delivery } from '../../enterprise/entities/delivery'

export interface FetchNearbyDeliveriesRequest {
  latitude: number
  longitude: number
}

export abstract class DeliveriesRepository {
  abstract create(delivery: Delivery): Promise<void>
  abstract findById(id: string): Promise<Delivery | null>
  abstract delete(delivery: Delivery): Promise<void>
  abstract save(delivery: Delivery): Promise<void>
  abstract fetchNearbyDeliveries(
    props: FetchNearbyDeliveriesRequest,
  ): Promise<Delivery[]>

  abstract fetchDeliveriesFromRecipient(
    recipientId: string,
  ): Promise<Delivery[]>

  abstract fetchDeliveriesFromCourier(courierId: string): Promise<Delivery[]>

  abstract findMany(): Promise<Delivery[]>
}
