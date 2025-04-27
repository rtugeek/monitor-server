import fs from 'node:fs'
import path from 'node:path'
import { Logger } from '@nestjs/common'

const tokenFilePath = path.resolve(__dirname, 'token.txt')

export class TokenService {
  private readonly logger = new Logger(TokenService.name)
  private _token: string = ''
  constructor() {
    this._token = this.initToken()
  }

  updateToken(token: string) {
    this._token = token
    fs.writeFileSync(tokenFilePath, token, 'utf-8')
    this.logger.log(`update token:${this._token}`)
  }

  get token(): string {
    return this._token
  }

  readToken(): string {
    return fs.readFileSync(tokenFilePath, 'utf-8')
  }

  genToken(): string {
    return [...Array.from({ length: 32 })]
      .map(() => Math.random().toString(36)[2])
      .join('')
  }

  initToken(): string {
    if (fs.existsSync(tokenFilePath)) {
      return this.readToken()
    }
    else {
      const token = this.genToken()
      fs.writeFileSync(tokenFilePath, token, 'utf-8')
      return token
    }
  }
}
