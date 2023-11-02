import { Attachment } from '@/domain/logistics/enterprise/entities/attachment'
import { Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma.service'
import { PrismaAttachmentMapper } from '../mappers/prisma-attachment-mapper'
import { AttachmentsRepository } from '@/domain/logistics/application/repositories/attachments-repository'

@Injectable()
export class PrismaAttachmentsRepository implements AttachmentsRepository {
  constructor(private prisma: PrismaService) {}

  async create(attachment: Attachment): Promise<void> {
    const data = PrismaAttachmentMapper.toPersistence(attachment)

    await this.prisma.attachment.create({
      data,
    })
  }

  async findById(id: string): Promise<Attachment> {
    const attachment = await this.prisma.attachment.findUnique({
      where: { id },
    })

    if (!attachment) {
      return null
    }

    return PrismaAttachmentMapper.toDomain(attachment)
  }
}
