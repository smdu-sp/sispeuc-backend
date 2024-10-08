import { Module } from '@nestjs/common';
import { BuscasService } from './buscas.service';
import { BuscasController } from './buscas.controller';
import { VistoriaBuscaStrategy } from './strategies/vistoria-busca.strategy';
import { ProcessoBuscaStrategy } from './strategies/processo-busca.strategy';
import { ImovelBuscaStrategy } from './strategies/imovel-busca.strategy';
import { ImovelBuscaTextoStrategy } from './strategies/imovel-busca-texto.strategy';
import { ProcessoBuscaTextoStrategy } from './strategies/processo-busca-texto.strategy';
import { VistoriaBuscaTextoStrategy } from './strategies/vistoria-busca-texto.strategy';
import { ProspeccoesService } from 'src/prospeccoes/prospeccoes.service';
import { CadastrosService } from 'src/cadastros/cadastros.service';
import { VistoriasService } from 'src/vistorias/vistorias.service';
import { SalvaguardaModule } from 'src/salvaguarda/salvaguarda.module';

@Module({
  imports: [SalvaguardaModule],
  controllers: [BuscasController],
  providers: [
    BuscasService,
    VistoriaBuscaStrategy,
    VistoriaBuscaTextoStrategy,
    ProcessoBuscaStrategy,
    ProcessoBuscaTextoStrategy,
    ImovelBuscaStrategy,
    ImovelBuscaTextoStrategy,
    ProspeccoesService,
    CadastrosService,
    VistoriasService,
  ],
})
export class BuscasModule {}
