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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NoteshareController = void 0;
const common_1 = require("@nestjs/common");
const noteshare_service_1 = require("./noteshare.service");
const noteshare_entity_1 = require("../../database/entities/noteshare.entity");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
let NoteshareController = class NoteshareController {
    constructor(noteshareService) {
        this.noteshareService = noteshareService;
    }
    share(req, shareNoteDto) {
        return this.noteshareService.shareNote(req.user.userId, shareNoteDto);
    }
    getSharedWithMe(req) {
        return this.noteshareService.getSharedWithMe(req.user.userId);
    }
    getSharedByMe(req) {
        return this.noteshareService.getSharedByMe(req.user.userId);
    }
    updatePermission(id, req, permission) {
        return this.noteshareService.updatePermission(id, req.user.userId, permission);
    }
    remove(id, req) {
        return this.noteshareService.unshareNote(id, req.user.userId);
    }
};
exports.NoteshareController = NoteshareController;
__decorate([
    (0, common_1.Post)('share'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], NoteshareController.prototype, "share", null);
__decorate([
    (0, common_1.Get)('shared-with-me'),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], NoteshareController.prototype, "getSharedWithMe", null);
__decorate([
    (0, common_1.Get)('shared-by-me'),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], NoteshareController.prototype, "getSharedByMe", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Request)()),
    __param(2, (0, common_1.Body)('permission')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, String]),
    __metadata("design:returntype", void 0)
], NoteshareController.prototype, "updatePermission", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], NoteshareController.prototype, "remove", null);
exports.NoteshareController = NoteshareController = __decorate([
    (0, common_1.Controller)('shares'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __metadata("design:paramtypes", [noteshare_service_1.NoteshareService])
], NoteshareController);
//# sourceMappingURL=noteshare.controller.js.map