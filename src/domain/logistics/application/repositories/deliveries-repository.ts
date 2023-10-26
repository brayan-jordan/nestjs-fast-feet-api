import { Delivery } from '../../enterprise/entities/delivery'

export abstract class DeliveriesRepository {
  abstract create(delivery: Delivery): Promise<void>
  abstract findById(id: string): Promise<Delivery | null>
  abstract delete(delivery: Delivery): Promise<void>
  abstract save(delivery: Delivery): Promise<void>
}
