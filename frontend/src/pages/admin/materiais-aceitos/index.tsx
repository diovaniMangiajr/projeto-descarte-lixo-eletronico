import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, ChevronLeft, ChevronRight } from 'lucide-react';
import { AppHeader } from '@/components/layout/AppHeader';
import { AdminSidebar } from '@/components/layout/AdminSidebar'; 
import { MateriaisAceitosTable } from './components/materiais-aceitos.table';
import { MateriaisAceitosModal } from './components/materiais-aceitos.modal';
import { MateriaisAceitosDeleteModal } from './components/materiais-aceitos-delete.modal';
import { materiaisAceitosService } from './services/materiais-aceitos.service';
import { TipoProdutoResponse, SpringPage } from './services/response/materiais-aceitos.response';

export const MateriaisAceitosPage: React.FC = () => {
  const navigate = useNavigate();
  
  const [materiaisPage, setMateriaisPage] = useState<SpringPage<TipoProdutoResponse> | null>(null);
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMaterial, setSelectedMaterial] = useState<TipoProdutoResponse | null>(null);
  
  const [materialPendingDeletion, setMaterialPendingDeletion] = useState<TipoProdutoResponse | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  
  const [currentPage, setCurrentPage] = useState(0); 
  const [isLoading, setIsLoading] = useState(false);

  const carregarMateriais = async (pageIndex: number) => {
    try {
      setIsLoading(true);
      const data = await materiaisAceitosService.findAllPaged(pageIndex, 5);
      setMateriaisPage(data);
    } catch (error) {
      console.error('Erro ao buscar materiais da API:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    carregarMateriais(currentPage);
  }, [currentPage]);

  const handleSaveMaterial = async (formData: { nome: string; descricaoExemplos: string }) => {
    try {
      if (selectedMaterial) {
        await materiaisAceitosService.update(selectedMaterial.id, formData);
      } else {
        await materiaisAceitosService.create(formData);
        setCurrentPage(0); 
      }
      carregarMateriais(currentPage);
    } catch (error) {
      console.error('Erro ao salvar material:', error);
      alert('Erro ao salvar os dados. Verifique o console.');
    }
  };

  const executeDeleteMaterial = async () => {
    if (!materialPendingDeletion) return;
    
    try {
      setIsDeleting(true);
      await materiaisAceitosService.delete(materialPendingDeletion.id);
      
      if (materiaisPage?.content.length === 1 && currentPage > 0) {
        setCurrentPage(prev => prev - 1);
      } else {
        carregarMateriais(currentPage);
      }
      
      setMaterialPendingDeletion(null);
    } catch (error) {
      console.error('Erro ao excluir material:', error);
      alert('Erro ao excluir. Verifique a conexão com o servidor.');
    } finally {
      setIsDeleting(false);
    }
  };

  const totalElements = materiaisPage?.totalElements || 0;
  const startItem = totalElements === 0 ? 0 : currentPage * 5 + 1;
  const endItem = Math.min((currentPage + 1) * 5, totalElements);
  const isFirstPage = currentPage === 0;
  const isLastPage = !materiaisPage || currentPage >= materiaisPage.totalPages - 1;

  return (
    <main className="adminv2">
      <AppHeader />

      <section className="adminv2-shell">
        <AdminSidebar activeTab="materiais" />

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
            </header>

            {isLoading ? (
               <div style={{ padding: '24px', textAlign: 'center' }}>Carregando dados...</div>
            ) : (
              <MateriaisAceitosTable
                materiais={materiaisPage?.content || []}
                onEdit={(material) => { setSelectedMaterial(material); setIsModalOpen(true); }}
                onDelete={(material) => setMaterialPendingDeletion(material)} 
              />
            )}

            <footer className="adminv2-tableFooter">
              <p>
                Exibindo {startItem} a {endItem} de {totalElements} materiais
              </p>
              <div className="adminv2-pagination">
                <button 
                  type="button" 
                  aria-label="Anterior" 
                  onClick={() => setCurrentPage(p => Math.max(0, p - 1))} 
                  disabled={isFirstPage || isLoading}
                  style={{ opacity: isFirstPage ? 0.4 : 1, cursor: isFirstPage ? 'not-allowed' : 'pointer' }}
                >
                  <ChevronLeft />
                </button>
                <button 
                  type="button" 
                  aria-label="Próximo" 
                  onClick={() => setCurrentPage(p => p + 1)} 
                  disabled={isLastPage || isLoading}
                  style={{ opacity: isLastPage ? 0.4 : 1, cursor: isLastPage ? 'not-allowed' : 'pointer' }}
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

      {materialPendingDeletion && (
        <MateriaisAceitosDeleteModal
          material={materialPendingDeletion}
          isDeleting={isDeleting}
          onClose={() => setMaterialPendingDeletion(null)}
          onConfirm={executeDeleteMaterial}
        />
      )}
    </main>
  );
};