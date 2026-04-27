"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NoteshareModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const noteshare_service_1 = require("./noteshare.service");
const noteshare_controller_1 = require("./noteshare.controller");
const noteshare_entity_1 = require("../../database/entities/noteshare.entity");
const note_entity_1 = require("../../database/entities/note.entity");
const usuario_entity_1 = require("../../database/entities/usuario.entity");
let NoteshareModule = class NoteshareModule {
};
exports.NoteshareModule = NoteshareModule;
exports.NoteshareModule = NoteshareModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([noteshare_entity_1.NoteShare, note_entity_1.Note, usuario_entity_1.Usuario])],
        controllers: [noteshare_controller_1.NoteshareController],
        providers: [noteshare_service_1.NoteshareService],
        exports: [noteshare_service_1.NoteshareService],
    })
], NoteshareModule);
//# sourceMappingURL=noteshare.module.js.map