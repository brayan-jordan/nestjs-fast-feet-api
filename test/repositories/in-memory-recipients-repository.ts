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
}
