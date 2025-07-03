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

  await app.listen(3004)
  console.log("Grades Service running on port 3004")
}
bootstrap()
