import { CouriersRepository } from '@/domain/logistics/application/repositories/couriers-repository'
import { Courier } from '@/domain/logistics/enterprise/entities/courier'

export class InMemoryCouriersRepository implements CouriersRepository {
  public items: Courier[] = []

  async create(courier: Courier) {
    this.items.push(courier)
  }

  async findByCpf(cpf: string) {
    const courier = this.items.find((item) => item.cpf === cpf)

    if (!courier) {
      return null
    }

    return courier
  }

  async findById(id: string) {
    const courier = this.items.find((item) => item.id.toString() === id)

    if (!courier) {
      return null
    }

    return courier
  }

  async delete(courier: Courier): Promise<void> {
    const index = this.items.findIndex((item) => item.id === courier.id)

    this.items.splice(index, 1)
  }

  async save(courier: Courier): Promise<void> {
    const index = this.items.findIndex((item) => item.id === courier.id)

    this.items[index] = courier
  }

  async findMany(): Promise<Courier[]> {
    return this.items
  }
}
