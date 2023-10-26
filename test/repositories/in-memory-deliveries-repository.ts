import { DeliveriesRepository } from '@/domain/logistics/application/repositories/deliveries-repository'
import { Delivery } from '@/domain/logistics/enterprise/entities/delivery'

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
  }
}
