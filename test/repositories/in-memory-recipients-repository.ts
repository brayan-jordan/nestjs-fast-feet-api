import { RecipientsRepository } from '@/domain/logistics/application/repositories/recipients-repository'
import { Recipient } from '@/domain/logistics/enterprise/entities/recipient'

export class InMemoryRecipientsRepository implements RecipientsRepository {
  public items: Recipient[] = []

  async create(recipient: Recipient) {
    this.items.push(recipient)
  }

  async findByCpf(cpf: string) {
    const recipient = this.items.find((item) => item.cpf === cpf)

    if (!recipient) {
      return null
    }

    return recipient
  }

  async findById(id: string) {
    const recipient = this.items.find((item) => item.id.toString() === id)

    if (!recipient) {
      return null
    }

    return recipient
  }

  async delete(recipient: Recipient): Promise<void> {
    const index = this.items.findIndex((item) => item.id === recipient.id)

    this.items.splice(index, 1)
  }

  async save(recipient: Recipient): Promise<void> {
    const index = this.items.findIndex((item) => item.id === recipient.id)

    this.items[index] = recipient
  }
}
