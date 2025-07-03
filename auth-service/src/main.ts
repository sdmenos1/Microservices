import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ValidationPipe } from "@nestjs/common";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());

  app.enableCors({
    origin: [
      "http://localhost:3000",
      "http://192.168.1.34:3000", // ✅ tu frontend actual
    ],
    credentials: true,
  });

  await app.listen(3001, "0.0.0.0"); // ✅ escucha desde todas las IPs de la red
  console.log("Auth Service running on port 3001");
}
bootstrap();
