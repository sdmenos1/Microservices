import { Module } from "@nestjs/common"
import { TypeOrmModule } from "@nestjs/typeorm"
import { GradesController } from "./grades.controller"
import { GradesService } from "./grades.service"
import { Grade } from "./entities/grade.entity"
import { HttpModule } from "@nestjs/axios"

@Module({
  imports: [TypeOrmModule.forFeature([Grade]),HttpModule],
  controllers: [GradesController],
  providers: [GradesService],
})
export class GradesModule {}
