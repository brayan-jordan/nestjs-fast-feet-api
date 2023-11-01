import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Admin } from '@/domain/logistics/enterprise/entities/admin'
import { Courier } from '@/domain/logistics/enterprise/entities/courier'
import { Recipient } from '@/domain/logistics/enterprise/entities/recipient'
import { User as PrismaUser } from '@prisma/client'

export class PrismaUserMapper {
  static toDomain(raw: PrismaUser): Recipient | Courier | Admin {
    if (raw.role === 'ADMIN') {
      return Admin.create(
        {
          name: raw.name,
          password: raw.password,
          cpf: raw.cpf,
        },
        new UniqueEntityID(raw.id),
      )
    }

    if (raw.role === 'COURIER') {
      return Courier.create(
        {
          name: raw.name,
          password: raw.password,
          cpf: raw.cpf,
        },
        new UniqueEntityID(raw.id),
      )
    }

    if (raw.role === 'RECIPIENT') {
      return Recipient.create(
        {
          name: raw.name,
          password: raw.password,
          cpf: raw.cpf,
        },
        new UniqueEntityID(raw.id),
      )
    }
  }
}
