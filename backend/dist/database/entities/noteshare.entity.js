"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NoteShare = exports.SharePermission = void 0;
const typeorm_1 = require("typeorm");
const note_entity_1 = require("./note.entity");
const usuario_entity_1 = require("./usuario.entity");
var SharePermission;
(function (SharePermission) {
    SharePermission["READ"] = "READ";
    SharePermission["WRITE"] = "WRITE";
})(SharePermission || (exports.SharePermission = SharePermission = {}));
let NoteShare = class NoteShare {
};
exports.NoteShare = NoteShare;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], NoteShare.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)('Note', 'shares', { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", note_entity_1.Note)
], NoteShare.prototype, "note", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], NoteShare.prototype, "noteId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)('Usuario'),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", usuario_entity_1.Usuario)
], NoteShare.prototype, "sharedWith", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], NoteShare.prototype, "sharedWithId", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: SharePermission,
        default: SharePermission.READ,
    }),
    __metadata("design:type", String)
], NoteShare.prototype, "permission", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], NoteShare.prototype, "sharedAt", void 0);
exports.NoteShare = NoteShare = __decorate([
    (0, typeorm_1.Entity)('note_shares')
], NoteShare);
//# sourceMappingURL=noteshare.entity.js.map