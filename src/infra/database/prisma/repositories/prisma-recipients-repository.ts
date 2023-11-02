import { Recipient } from '@/domain/logistics/enterprise/entities/recipient'
import { Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma.service'
import { PrismaRecipientMapper } from '../mappers/prisma-recipient-mapper'
import { RecipientsRepository } from '@/domain/logistics/application/repositories/recipients-repository'

@Injectable()
export class PrismaRecipientsRepository implements RecipientsRepository {
  constructor(private prisma: PrismaService) {}

  async create(recipient: Recipient): Promise<void> {
    const data = PrismaRecipientMapper.toPersistence(recipient)

    await this.prisma.user.create({
      data,
    })
  }

  async save(recipient: Recipient): Promise<void> {
    const data = PrismaRecipientMapper.toPersistence(recipient)

    await this.prisma.user.update({
      where: { id: data.id },
      data,
    })
  }

  async findById(id: string): Promise<Recipient | null> {
    const recipient = await this.prisma.user.findUnique({
      where: { id },
    })

    if (!recipient) {
      return null
    }

    return PrismaRecipientMapper.toDomain(recipient)
  }

  async findByCpf(cpf: string): Promise<Recipient | null> {
    const recipient = await this.prisma.user.findUnique({
      where: { cpf },
    })

    if (!recipient) {
      return null
    }

    return PrismaRecipientMapper.toDomain(recipient)
  }

  async delete(recipient: Recipient): Promise<void> {
    await this.prisma.user.delete({
      where: { id: recipient.id.toString() },
    })
  }

  async findMany(): Promise<Recipient[]> {
    const recipients = await this.prisma.user.findMany()

    return recipients.map(PrismaRecipientMapper.toDomain)
  }
}
