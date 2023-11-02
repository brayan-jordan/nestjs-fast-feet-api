import {
  UploadParams,
  Uploader,
} from '@/domain/logistics/application/storage/uploader'
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3'
import { EnvService } from '../env/env.service'
import { randomUUID } from 'node:crypto'
import { Injectable } from '@nestjs/common'

@Injectable()
export class TebiStorage implements Uploader {
  private client: S3Client

  constructor(private envService: EnvService) {
    const accessKeyId = envService.get('AWS_ACCESS_KEY_ID')
    const secretAccessKey = envService.get('AWS_SECRET_ACCESS_KEY')

    const credentials = {
      accessKeyId,
      secretAccessKey,
    }

    this.client = new S3Client({
      endpoint: 'https://s3.tebi.io',
      credentials,
      region: 'global',
    })
  }

  async upload({
    body,
    fileName,
    fileType,
  }: UploadParams): Promise<{ url: string }> {
    const uploadId = randomUUID()
    const uniqueFileName = `${uploadId}-${fileName}`

    await this.client.send(
      new PutObjectCommand({
        Bucket: this.envService.get('AWS_BUCKET_NAME'),
        Key: uniqueFileName,
        ContentType: fileType,
        Body: body,
      }),
    )

    // Nunca salvar a URL de um arquivo inteira,
    // e sim somente um identificador único,
    // pois a URL pode mudar, porém o identificador único
    // pode ser mantido mesmo ao trocar de serviço de armazenamento.

    return {
      url: uniqueFileName,
    }
  }
}
