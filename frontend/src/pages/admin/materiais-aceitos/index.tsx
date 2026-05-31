import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPinned, Users, Cpu, Plus, LayoutList, MoreVertical, ChevronLeft, ChevronRight } from 'lucide-react';
import { AppHeader } from '@/components/layout/AppHeader';
import { AppPaths } from '@/app/routes/paths' // Garanta que este import aponte para o local correto do seu projeto
import { MateriaisAceitosTable } from './components/materiais-aceitos.table';
import { MateriaisAceitosModal } from './components/materiais-aceitos.modal';
import { materiaisAceitosService } from './services/materiais-aceitos.service';
import { TipoProdutoResponse } from '@/services/pontoColeta.service';

export const MateriaisAceitosPage: React.FC = () => {
  const navigate = useNavigate();
  const [materiais, setMateriais] = useState<TipoProdutoResponse[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMaterial, setSelectedMaterial] = useState<TipoProdutoResponse | null>(null);
  
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const carregarMateriais = async () => {
    try {
      const data = await materiaisAceitosService.findAll();
      setMateriais(data);
    } catch (error) {
      console.error('Erro ao buscar materiais da API:', error);
    }
  };

  useEffect(() => {
    carregarMateriais();
  }, []);

  const handleSaveMaterial = async (formData: { nome: string; descricaoExemplos: string }) => {
    try {
      if (selectedMaterial) {
        await materiaisAceitosService.update(selectedMaterial.id, formData);
      } else {
        await materiaisAceitosService.create(formData);
      }
      carregarMateriais();
    } catch (error) {
      console.error('Erro ao salvar material:', error);
    }
  };

  const handleDeleteMaterial = async (material: TipoProdutoResponse) => {
    if (window.confirm(`Você está prestes a remover o tipo de resíduo: ${material.nome}. Deseja continuar?`)) {
      try {
        await materiaisAceitosService.delete(material.id);
        carregarMateriais();
      } catch (error) {
        console.error('Erro ao excluir material:', error);
      }
    }
  };

  const totalItems = materiais.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage) || 1;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = materiais.slice(indexOfFirstItem, indexOfLastItem);

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  return (
    <main className="adminv2">
      <AppHeader />

      <section className="adminv2-shell">
        <aside className="adminv2-sidebar">
          <div className="adminv2-user">
            <span className="adminv2-user__avatar" aria-hidden="true" />
            <div>
              <strong>Leonardo Silva</strong>
              <p>Administrador</p>
            </div>
          </div>

          <nav className="adminv2-nav" aria-label="Navegação administrativa">
            <button
              type="button"
              onClick={() => navigate(AppPaths.admin)}
              className="adminv2-nav__item"
              style={{ width: '100%', textLeft: 'left', display: 'flex', alignItems: 'center', background: 'transparent', border: 'none', cursor: 'pointer' }}
            >
              <MapPinned className="adminv2-nav__icon" aria-hidden="true" />
              Pontos de Coleta
            </button>
            <button
              type="button"
              className="adminv2-nav__item"
              style={{ width: '100%', textLeft: 'left', display: 'flex', alignItems: 'center', background: 'transparent', border: 'none', cursor: 'pointer' }}
            >
              <Users className="adminv2-nav__icon" aria-hidden="true" />
              Usuários
            </button>
            <button
              type="button"
              onClick={() => navigate(AppPaths.adminMateriais)}
              className="adminv2-nav__item adminv2-nav__item--active"
              style={{ width: '100%', textLeft: 'left', display: 'flex', alignItems: 'center', background: 'transparent', border: 'none', cursor: 'pointer' }}
            >
              <Cpu className="adminv2-nav__icon" aria-hidden="true" />
              Materiais Aceitos
            </button>
          </nav>
        </aside>

        <section className="adminv2-content">
          <header className="adminv2-content__header">
            <div>
              <h1>Materiais Aceitos</h1>
              <p>Gerencie os tipos de resíduos eletrônicos aceitos na rede municipal de descarte.</p>
            </div>

            <button type="button" className="adminv2-addBtn" onClick={() => { setSelectedMaterial(null); setIsModalOpen(true); }}>
              <Plus className="adminv2-addBtn__icon" aria-hidden="true" />
              Adicionar Novo Material
            </button>
          </header>

          <section className="adminv2-tableCard" aria-label="Tabela de materiais aceitos">
            <header className="adminv2-tableCard__head">
              <h2>Materiais Aceitos</h2>
              <div className="adminv2-tableCard__tools">
                <button type="button" aria-label="Filtros">
                  <LayoutList />
                </button>
                <button type="button" aria-label="Mais opções">
                  <MoreVertical />
                </button>
              </div>
            </header>

            <MateriaisAceitosTable
              materiais={currentItems}
              onEdit={(material) => { setSelectedMaterial(material); setIsModalOpen(true); }}
              onDelete={handleDeleteMaterial}
            />

            {/* Rodapé nativo de Paginação adicionado */}
            <footer className="adminv2-tableFooter">
              <p>
                Exibindo {totalItems > 0 ? indexOfFirstItem + 1 : 0}-{Math.min(indexOfLastItem, totalItems)} de {totalItems} materiais
              </p>
              <div className="adminv2-pagination">
                <button 
                  type="button" 
                  aria-label="Anterior" 
                  onClick={handlePrevPage} 
                  disabled={currentPage === 1}
                  style={{ opacity: currentPage === 1 ? 0.4 : 1, cursor: currentPage === 1 ? 'not-allowed' : 'pointer' }}
                >
                  <ChevronLeft />
                </button>
                <button 
                  type="button" 
                  aria-label="Próximo" 
                  onClick={handleNextPage} 
                  disabled={currentPage === totalPages}
                  style={{ opacity: currentPage === totalPages ? 0.4 : 1, cursor: currentPage === totalPages ? 'not-allowed' : 'pointer' }}
                >
                  <ChevronRight />
                </button>
              </div>
            </footer>
          </section>
        </section>
      </section>

      <MateriaisAceitosModal
        isOpen={isModalOpen}
        onClose={() => { setIsModalOpen(false); setSelectedMaterial(null); }}
        onSave={handleSaveMaterial}
        materialToEdit={selectedMaterial}
      />
    </main>
  );
};