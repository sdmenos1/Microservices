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
const attendance_module_1 = require("./attendance/attendance.module");
const attendance_entity_1 = require("./attendance/entities/attendance.entity");
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
                database: process.env.DB_DATABASE || "colegio_attendance",
                entities: [attendance_entity_1.Attendance],
                synchronize: true,
                logging: true,
            }),
            attendance_module_1.AttendanceModule,
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map