import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Admin as DomainAdmin } from '@/domain/logistics/enterprise/entities/admin'
import { User as PrismaUser, Prisma } from '@prisma/client'

export class PrismaAdminMapper {
  static toDomain(raw: PrismaUser): DomainAdmin {
    return DomainAdmin.create(
      {
        name: raw.name,
        password: raw.password,
        cpf: raw.cpf,
      },
      new UniqueEntityID(raw.id),
    )
  }

  static toPersistence(admin: DomainAdmin): Prisma.UserUncheckedCreateInput {
    return {
      id: admin.id.toString(),
      name: admin.name,
      cpf: admin.cpf,
      password: admin.password,
      role: admin.role,
    }
  }
}
