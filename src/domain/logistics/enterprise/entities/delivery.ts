import { AggregateRoot } from '@/core/entities/aggregate-root'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { DeliveryStatusChangedEvent } from '../events/delivery-status-changed-event'

export interface DeliveryProps {
  recipientId: UniqueEntityID
  courierId: UniqueEntityID
  attachmentProopOfShippingId?: UniqueEntityID
  latitude: number
  longitude: number
  availableToPickupAt?: Date | null
  collectedAt?: Date | null
  deliveredAt?: Date | null
  returnedAt?: Date | null
}

export class Delivery extends AggregateRoot<DeliveryProps> {
  get recipientId() {
    return this.props.recipientId
  }

  get courierId() {
    return this.props.courierId
  }

  get availableToPickupAt() {
    return this.props.availableToPickupAt
  }

  get collectedAt() {
    return this.props.collectedAt
  }

  get deliveredAt() {
    return this.props.deliveredAt
  }

  get returnedAt() {
    return this.props.returnedAt
  }

  get latitude() {
    return this.props.latitude
  }

  get longitude() {
    return this.props.longitude
  }

  get attachmentProopOfShippingId() {
    return this.props.attachmentProopOfShippingId
  }

  get status() {
    if (this.props.returnedAt) {
      return 'Devolvido'
    }

    if (this.props.deliveredAt) {
      return 'Entregue'
    }

    if (this.props.collectedAt) {
      return 'Coletado'
    }

    if (this.props.availableToPickupAt) {
      return 'Disponível para coleta'
    }
  }

  set latitude(latitude: number) {
    this.props.latitude = latitude
  }

  set longitude(longitude: number) {
    this.props.longitude = longitude
  }

  set availableToPickupAt(availableToPickupAt: Date) {
    this.props.availableToPickupAt = availableToPickupAt

    this.addDomainEvent(new DeliveryStatusChangedEvent(this))
  }

  set collectedAt(collectedAt: Date) {
    this.props.collectedAt = collectedAt

    this.addDomainEvent(new DeliveryStatusChangedEvent(this))
  }

  set deliveredAt(deliveredAt: Date) {
    this.props.deliveredAt = deliveredAt

    this.addDomainEvent(new DeliveryStatusChangedEvent(this))
  }

  set returnedAt(returnedAt: Date) {
    this.props.returnedAt = returnedAt

    this.addDomainEvent(new DeliveryStatusChangedEvent(this))
  }

  set attachmentProopOfShippingId(attachmentProopOfShippingId: UniqueEntityID) {
    this.props.attachmentProopOfShippingId = attachmentProopOfShippingId
  }

  static create(props: DeliveryProps, id?: UniqueEntityID) {
    const delivery = new Delivery(props, id)

    return delivery
  }
}
