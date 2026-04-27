import { UsuarioService } from './usuario.service';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
export declare class UsuarioController {
    private readonly usuarioService;
    constructor(usuarioService: UsuarioService);
    create(createUsuarioDto: CreateUsuarioDto): Promise<import("../../database/entities/usuario.entity").Usuario>;
    findAll(): Promise<import("../../database/entities/usuario.entity").Usuario[]>;
    findOne(id: string): Promise<import("../../database/entities/usuario.entity").Usuario>;
    update(id: string, updateUsuarioDto: UpdateUsuarioDto): Promise<import("../../database/entities/usuario.entity").Usuario>;
    remove(id: string): Promise<void>;
}
