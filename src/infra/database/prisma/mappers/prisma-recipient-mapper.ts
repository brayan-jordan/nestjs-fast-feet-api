import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Recipient as DomainRecipient } from '@/domain/logistics/enterprise/entities/recipient'
import { User as PrismaUser, Prisma } from '@prisma/client'

export class PrismaRecipientMapper {
  static toDomain(raw: PrismaUser): DomainRecipient {
    return DomainRecipient.create(
      {
        name: raw.name,
        password: raw.password,
        cpf: raw.cpf,
      },
      new UniqueEntityID(raw.id),
    )
  }

  static toPersistence(
    recipient: DomainRecipient,
  ): Prisma.UserUncheckedCreateInput {
    return {
      id: recipient.id.toString(),
      name: recipient.name,
      cpf: recipient.cpf,
      password: recipient.password,
      role: recipient.role,
    }
  }
}
