import { NestFactory } from "@nestjs/core"
import { AppModule } from "./app.module"
import { ValidationPipe } from "@nestjs/common"

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  app.useGlobalPipes(new ValidationPipe())
  app.enableCors({
    origin: ["http://localhost:3000"],
    credentials: true,
  })

  await app.listen(3002)
  console.log("Students Service running on port 3002")
}
bootstrap()
