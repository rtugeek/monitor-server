import { Logger } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { AppModule } from './app.module'
import { TokenService } from './token.service'

process.on('uncaughtException', (_) => {

})
async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  const logger = new Logger('APP')
  app.enableCors() // 允许所有站点跨域请求

  const config = new DocumentBuilder()
    .setTitle('Monitor Server')
    .setDescription('A simple http server for monitor server status')
    .setVersion('1.0')
    .setContact('Neo Fu', 'https://widgetjs.cn', 'rtugeek@gmail.com')
    .build()
  const documentFactory = () => SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('api', app, documentFactory)

  const envPort = process.env.PORT?.trim()
  const port = envPort ?? 3000
  await app.listen(port)

  const tokenService = app.get(TokenService)
  logger.log(`Server port: ${port}`)
  logger.log(`Add the follow token to http request header or search params`)
  logger.log('↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓')
  logger.log(tokenService.token)
  logger.log('↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑')
  logger.log(`Open http://localhost:${port}/api to see the api doc`)
}
bootstrap()
