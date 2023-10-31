import { Courier } from '@/domain/logistics/enterprise/entities/courier'
import { Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma.service'
import { PrismaCourierMapper } from '../mappers/prisma-courier-mapper'
import { CouriersRepository } from '@/domain/logistics/application/repositories/couriers-repository'

@Injectable()
export class PrismaCouriersRepository implements CouriersRepository {
  constructor(private prisma: PrismaService) {}

  async create(courier: Courier): Promise<void> {
    const data = PrismaCourierMapper.toPersistence(courier)

    await this.prisma.user.create({
      data,
    })
  }

  async save(courier: Courier): Promise<void> {
    const data = PrismaCourierMapper.toPersistence(courier)

    await this.prisma.user.update({
      where: { id: data.id },
      data,
    })
  }

  async findById(id: string): Promise<Courier | null> {
    const courier = await this.prisma.user.findUnique({
      where: { id },
    })

    if (!courier) {
      return null
    }

    return PrismaCourierMapper.toDomain(courier)
  }

  async findByCpf(cpf: string): Promise<Courier | null> {
    const courier = await this.prisma.user.findUnique({
      where: { cpf },
    })

    if (!courier) {
      return null
    }

    return PrismaCourierMapper.toDomain(courier)
  }

  async delete(courier: Courier): Promise<void> {
    await this.prisma.user.delete({
      where: { id: courier.id.toString() },
    })
  }
}
