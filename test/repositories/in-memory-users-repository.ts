import { UsersRepository } from '@/domain/logistics/application/repositories/users-repository'
import { InMemoryRecipientsRepository } from './in-memory-recipients-repository'
import { InMemoryCouriersRepository } from './in-memory-couriers-repository'
import { InMemoryAdminsRepository } from './in-memory-admins-repository'

export class InMemoryUsersRepository implements UsersRepository {
  constructor(
    private recipientsRepository: InMemoryRecipientsRepository,
    private couriersRepository: InMemoryCouriersRepository,
    private adminsRepository: InMemoryAdminsRepository,
  ) {}

  async findByCpf(cpf: string) {
    const recipients = this.recipientsRepository.items
    const couriers = this.couriersRepository.items
    const admins = this.adminsRepository.items

    let user

    user = recipients.find((item) => item.cpf === cpf)

    if (!user) {
      user = couriers.find((item) => item.cpf === cpf)
    }

    if (!user) {
      user = admins.find((item) => item.cpf === cpf)
    }

    return user
  }
}
