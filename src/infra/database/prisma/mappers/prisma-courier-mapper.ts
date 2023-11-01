import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Courier as DomainCourier } from '@/domain/logistics/enterprise/entities/courier'
import { User as PrismaUser, Prisma } from '@prisma/client'

export class PrismaCourierMapper {
  static toDomain(raw: PrismaUser): DomainCourier {
    return DomainCourier.create(
      {
        name: raw.name,
        password: raw.password,
        cpf: raw.cpf,
      },
      new UniqueEntityID(raw.id),
    )
  }

  static toPersistence(
    courier: DomainCourier,
  ): Prisma.UserUncheckedCreateInput {
    return {
      id: courier.id.toString(),
      name: courier.name,
      cpf: courier.cpf,
      password: courier.password,
      role: courier.role,
    }
  }
}
