"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const config_1 = require("@nestjs/config");
const users_module_1 = require("./users/users.module");
const student_entity_1 = require("./users/entities/student.entity");
const course_entity_1 = require("./users/entities/course.entity");
const student_course_entity_1 = require("./users/entities/student-course.entity");
const teacher_entity_1 = require("./users/entities/teacher.entity");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
            }),
            typeorm_1.TypeOrmModule.forRoot({
                type: "mysql",
                host: process.env.DB_HOST || "localhost",
                port: Number.parseInt(process.env.DB_PORT) || 3306,
                username: process.env.DB_USERNAME || "root",
                password: process.env.DB_PASSWORD || "password",
                database: process.env.DB_DATABASE || "colegio_students",
                entities: [student_entity_1.Student, course_entity_1.Course, student_course_entity_1.StudentCourse, teacher_entity_1.Teacher],
                synchronize: true,
                logging: true,
            }),
            users_module_1.StudentsModule,
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map