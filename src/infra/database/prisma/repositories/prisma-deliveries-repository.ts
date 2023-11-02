import { Delivery } from '@/domain/logistics/enterprise/entities/delivery'
import { Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma.service'
import { PrismaDeliveryMapper } from '../mappers/prisma-delivery-mapper'
import {
  DeliveriesRepository,
  FetchNearbyDeliveriesRequest,
} from '@/domain/logistics/application/repositories/deliveries-repository'
import { Delivery as PrismaDelivery } from '@prisma/client'

@Injectable()
export class PrismaDeliveriesRepository implements DeliveriesRepository {
  constructor(private prisma: PrismaService) {}

  async create(delivery: Delivery): Promise<void> {
    const data = PrismaDeliveryMapper.toPersistence(delivery)

    await this.prisma.delivery.create({
      data,
    })
  }

  async save(delivery: Delivery): Promise<void> {
    const data = PrismaDeliveryMapper.toPersistence(delivery)

    await this.prisma.delivery.update({
      where: { id: data.id },
      data,
    })
  }

  async findById(id: string): Promise<Delivery | null> {
    const delivery = await this.prisma.delivery.findUnique({
      where: { id },
    })

    if (!delivery) {
      return null
    }

    return PrismaDeliveryMapper.toDomain(delivery)
  }

  async delete(delivery: Delivery): Promise<void> {
    await this.prisma.delivery.delete({
      where: { id: delivery.id.toString() },
    })
  }

  async fetchNearbyDeliveries({
    latitude,
    longitude,
  }: FetchNearbyDeliveriesRequest): Promise<Delivery[]> {
    const deliveries = await this.prisma.$queryRaw<[PrismaDelivery]>`
      SELECT * FROM deliveries
      WHERE ( 6371 * acos( cos( radians(${latitude}) ) * cos( radians( latitude ) ) * cos( radians( longitude ) - radians(${longitude}) ) + sin( radians(${latitude}) ) * sin( radians( latitude ) ) ) ) <= 10
    `

    return deliveries.map(PrismaDeliveryMapper.toDomain)
  }

  async fetchDeliveriesFromCourier(courierId: string): Promise<Delivery[]> {
    const deliveries = await this.prisma.delivery.findMany({
      where: { courierId },
    })

    return deliveries.map(PrismaDeliveryMapper.toDomain)
  }

  async fetchDeliveriesFromRecipient(recipientId: string): Promise<Delivery[]> {
    const deliveries = await this.prisma.delivery.findMany({
      where: { recipientId },
    })

    return deliveries.map(PrismaDeliveryMapper.toDomain)
  }

  async findMany(): Promise<Delivery[]> {
    const deliveries = await this.prisma.delivery.findMany()

    return deliveries.map(PrismaDeliveryMapper.toDomain)
  }
}
