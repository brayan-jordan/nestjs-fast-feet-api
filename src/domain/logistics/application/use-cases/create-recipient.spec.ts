import { FakeHasher } from 'test/cryptography/fake-hasher'
import { InMemoryRecipientsRepository } from 'test/repositories/in-memory-recipients-repository'
import { CreateRecipientUseCase } from './create-recipient'
import { makeRecipient } from 'test/factories/make-recipient'
import { ResourceAlreadyExistsError } from './errors/resource-already-exists-error'

let inMemoryRecipientsRepository: InMemoryRecipientsRepository
let fakeHasher: FakeHasher
let sut: CreateRecipientUseCase

describe('Create recipient use case', () => {
  beforeEach(() => {
    inMemoryRecipientsRepository = new InMemoryRecipientsRepository()
    fakeHasher = new FakeHasher()
    sut = new CreateRecipientUseCase(inMemoryRecipientsRepository, fakeHasher)
  })

  it('should be able to create a recipient', async () => {
    const result = await sut.execute({
      cpf: '123.456.789-10',
      name: 'John Doe',
      password: '123456',
    })

    expect(result.isRight()).toBe(true)
    expect(result.value).toEqual({
      recipient: inMemoryRecipientsRepository.items[0],
    })
  })

  it('should hash recipient password upon registration', async () => {
    const result = await sut.execute({
      cpf: '123.456.789-10',
      name: 'John Doe',
      password: '123456',
    })

    expect(result.isRight()).toBe(true)
    expect(inMemoryRecipientsRepository.items[0].password).toEqual(
      '123456-hashed',
    )
  })

  it('not should be able to create a recipient with same cpf', async () => {
    const existingRecipient = makeRecipient()

    inMemoryRecipientsRepository.items.push(existingRecipient)

    const result = await sut.execute({
      cpf: existingRecipient.cpf,
      name: 'John Doe',
      password: '123456',
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(ResourceAlreadyExistsError)
  })
})
