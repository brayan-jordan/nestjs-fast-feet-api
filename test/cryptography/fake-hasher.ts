import { HashGenerator } from '@/domain/logistics/application/cryptography/hash-generator'

export class FakeHasher implements HashGenerator {
  async hash(plain: string): Promise<string> {
    return plain.concat('-hashed')
  }
}