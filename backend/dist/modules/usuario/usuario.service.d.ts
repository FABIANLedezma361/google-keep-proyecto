import { Repository } from 'typeorm';
import { Usuario } from '../../database/entities/usuario.entity';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
export declare class UsuarioService {
    private usuarioRepository;
    constructor(usuarioRepository: Repository<Usuario>);
    create(createUsuarioDto: CreateUsuarioDto): Promise<Usuario>;
    findAll(): Promise<Usuario[]>;
    findOne(id: string): Promise<Usuario>;
    findByEmail(email: string): Promise<Usuario>;
    update(id: string, updateUsuarioDto: UpdateUsuarioDto): Promise<Usuario>;
    remove(id: string): Promise<void>;
}
