import { UsersRepository } from '@/domain/logistics/application/repositories/users-repository'
import { InMemoryRecipientsRepository } from './in-memory-recipients-repository'
import { InMemoryCouriersRepository } from './in-memory-couriers-repository'

export class InMemoryUsersRepository implements UsersRepository {
  constructor(
    private recipientsRepository: InMemoryRecipientsRepository,
    private couriersRepository: InMemoryCouriersRepository,
  ) {}

  async findByCpf(cpf: string) {
    const recipients = this.recipientsRepository.items
    const couriers = this.couriersRepository.items

    const allUsersOfSystem = recipients.concat(couriers)

    const user = allUsersOfSystem.find((item) => item.cpf === cpf)

    if (!user) {
      return null
    }

    return user
  }
}
