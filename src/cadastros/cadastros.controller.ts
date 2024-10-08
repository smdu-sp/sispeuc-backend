import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Query,
  NotFoundException,
  UseInterceptors,
} from '@nestjs/common';
import { CadastrosService } from './cadastros.service';
import { CreateCadastroDto } from './dto/create-cadastro.dto';
import { PaginationQueryDto } from './dto/pagination-cadastro.dto';
import { Permissoes } from 'src/auth/decorators/permissoes.decorator';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { UsuarioAtual } from 'src/auth/decorators/usuario-atual.decorator';
import { Usuario } from '@prisma/client';
import { AuditInterceptor } from 'src/common/interceptors/audit.interceptor';

@ApiTags('cadastros')
@Permissoes('ADM', 'SUP', 'DEV')
@ApiBearerAuth()
@UseInterceptors(AuditInterceptor)
@Controller('cadastros')
export class CadastrosController {
  constructor(private readonly cadastrosService: CadastrosService) {}

  @Post('criar-cadastro')
  create(
    @UsuarioAtual() usuario: Usuario,
    @Body() createCadastroDto: CreateCadastroDto,
  ) {
    return this.cadastrosService.create(usuario.login, createCadastroDto);
  }

  @Get('buscar-cadastros')
  findAll(@Query() paginationQuery: PaginationQueryDto) {
    return this.cadastrosService.findAll(paginationQuery);
  }

  @Get('buscar-cadastro/:id')
  findOne(@Param('id') id: string) {
    return this.cadastrosService.findOne(+id);
  }

  @Delete('excluir-cadastro/:id')
  async remove(@Param('id') id: string) {
    try {
      const result = await this.cadastrosService.remove(+id);
      return result;
    } catch (error) {
      if (error.code === 'P2025') {
        throw new NotFoundException(`Registro não encontrado: ${id} ${error}`);
      }
      throw error;
    }
  }
}
