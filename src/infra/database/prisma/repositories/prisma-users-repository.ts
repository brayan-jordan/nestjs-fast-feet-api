import { Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma.service'
import { PrismaUserMapper } from '../mappers/prisma-user-mapper'
import { UsersRepository } from '@/domain/logistics/application/repositories/users-repository'
import { Courier } from '@/domain/logistics/enterprise/entities/courier'
import { Recipient } from '@/domain/logistics/enterprise/entities/recipient'
import { Admin } from '@/domain/logistics/enterprise/entities/admin'

@Injectable()
export class PrismaUsersRepository implements UsersRepository {
  constructor(private prisma: PrismaService) {}

  async findByCpf(cpf: string): Promise<Courier | Recipient | Admin | null> {
    const user = await this.prisma.user.findUnique({
      where: { cpf },
    })

    if (!user) {
      return null
    }

    return PrismaUserMapper.toDomain(user)
  }
}
