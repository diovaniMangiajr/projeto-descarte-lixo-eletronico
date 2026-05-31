import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Bell, X, Trash2, CheckCircle, AlertTriangle } from 'lucide-react';
import { notificacaoService, NotificacaoResponse } from '@/services/notificacao.service';

export const NotificacaoWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [notificacoes, setNotificacoes] = useState<NotificacaoResponse[]>([]);
  const [selectedNotificacao, setSelectedNotificacao] = useState<NotificacaoResponse | null>(null);

  const carregarNotificacoes = async () => {
    try {
      const data = await notificacaoService.findAll();
      const sorted = data.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
      setNotificacoes(sorted);
    } catch (error) {
      console.error('Erro ao buscar notificações', error);
    }
  };

  useEffect(() => {
    carregarNotificacoes();
  }, []);

  const unreadCount = notificacoes.filter(n => n.entityStatus === 'ACTIVE').length;

  const handleOpenDetalhes = async (notificacao: NotificacaoResponse) => {
    setSelectedNotificacao(notificacao);
    setIsOpen(false); 

    if (notificacao.entityStatus === 'ACTIVE') {
      try {
        await notificacaoService.markAsViewed(notificacao.id);
        setNotificacoes(prev => 
          prev.map(n => n.id === notificacao.id ? { ...n, entityStatus: 'INACTIVE' } : n)
        );
      } catch (error) {
        console.error('Erro ao marcar como lida', error);
      }
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await notificacaoService.delete(id);
      setNotificacoes(prev => prev.filter(n => n.id !== id));
      setSelectedNotificacao(null);
    } catch (error) {
      console.error('Erro ao deletar notificação', error);
    }
  };

  return (
    <div className="relative" style={{ position: 'relative' }}>
      <button 
        type="button" 
        onClick={() => {
          if (!isOpen) carregarNotificacoes();
          setIsOpen(!isOpen);
        }}
        className="app-header__link"
        style={{ background: 'transparent', border: 'none', cursor: 'pointer', position: 'relative', display: 'flex', alignItems: 'center' }}
        aria-label="Notificações"
      >
        <Bell size={20} />
        {unreadCount > 0 && (
          <span 
            style={{
              position: 'absolute',
              top: '-4px',
              right: '-8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '18px',
              height: '18px',
              fontSize: '10px',
              fontWeight: 'bold',
              color: '#fff',
              backgroundColor: '#ef4444',
              borderRadius: '50%'
            }}
          >
            {unreadCount > 9 ? '9+' : unreadCount}
          </span>
        )}
      </button>

      {isOpen && (
        <>
          <div 
            style={{ position: 'fixed', inset: 0, zIndex: 40 }} 
            onClick={() => setIsOpen(false)} 
          />
          
          <div 
            style={{
              position: 'absolute',
              right: 0,
              top: '40px',
              zIndex: 50,
              width: '320px',
              backgroundColor: '#0f172a',
              border: '1px solid #1e293b',
              borderRadius: '16px',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
              overflow: 'hidden'
            }}
          >
            <div style={{ padding: '12px 16px', backgroundColor: '#020617', borderBottom: '1px solid #1e293b', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3 style={{ margin: 0, fontSize: '14px', fontWeight: 600, color: '#e2e8f0' }}>Central de Alertas</h3>
              {unreadCount > 0 && <span style={{ fontSize: '12px', color: '#38bdf8', fontWeight: 500 }}>{unreadCount} novas</span>}
            </div>

            <div style={{ maxHeight: '380px', overflowY: 'auto' }}>
              {notificacoes.length === 0 ? (
                <div style={{ padding: '24px', textAlign: 'center', color: '#64748b', fontSize: '14px' }}>
                  Nenhuma notificação no momento.
                </div>
              ) : (
                notificacoes.map((notificacao) => (
                  <div 
                    key={notificacao.id} 
                    onClick={() => handleOpenDetalhes(notificacao)}
                    style={{
                      padding: '16px',
                      borderBottom: '1px solid rgba(30, 41, 59, 0.5)',
                      cursor: 'pointer',
                      backgroundColor: notificacao.entityStatus === 'ACTIVE' ? 'rgba(30, 41, 59, 0.3)' : 'transparent',
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '12px'
                    }}
                  >
                    {notificacao.entityStatus === 'ACTIVE' ? (
                      <AlertTriangle color="#f59e0b" size={16} style={{ flexShrink: 0, marginTop: '2px' }} />
                    ) : (
                      <CheckCircle color="#64748b" size={16} style={{ flexShrink: 0, marginTop: '2px' }} />
                    )}
                    <div>
                      <p style={{ margin: 0, fontSize: '14px', fontWeight: notificacao.entityStatus === 'ACTIVE' ? 600 : 400, color: notificacao.entityStatus === 'ACTIVE' ? '#f1f5f9' : '#94a3b8' }}>
                        {notificacao.titulo}
                      </p>
                      <p style={{ margin: '4px 0 0', fontSize: '12px', color: '#64748b', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                        {notificacao.mensagem}
                      </p>
                      <p style={{ margin: '8px 0 0', fontSize: '10px', color: '#475569' }}>
                        {new Date(notificacao.createdAt).toLocaleDateString('pt-BR', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </>
      )}

      {selectedNotificacao && createPortal(
        <div className="adminv2-modal" role="presentation" onClick={() => setSelectedNotificacao(null)}>
          <section
            className="adminv2-dialog"
            role="dialog"
            aria-modal="true"
            onClick={(event) => event.stopPropagation()}
            style={{ maxWidth: '500px' }}
          >
            <header className="adminv2-dialog__header">
              <div>
                <p className="adminv2-dialog__eyebrow">Alerta do Sistema</p>
                <h3 style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Bell size={20} color="#0ea5e9" />
                  Detalhes da Notificação
                </h3>
              </div>
              <button type="button" className="adminv2-dialog__close" onClick={() => setSelectedNotificacao(null)} aria-label="Fechar">
                <X />
              </button>
            </header>

            <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ padding: '16px', backgroundColor: 'rgba(0,0,0,0.2)', borderRadius: '12px', border: '1px solid #1e293b' }}>
                <p style={{ fontSize: '14px', fontWeight: 500, color: '#38bdf8', marginBottom: '8px', marginTop: 0 }}>
                  {selectedNotificacao.titulo}
                </p>
                <p style={{ color: '#cbd5e1', fontSize: '14px', lineHeight: 1.6, margin: 0 }}>
                  {selectedNotificacao.mensagem}
                </p>
              </div>

              {selectedNotificacao.pontoColetaNome && (
                <div style={{ fontSize: '14px' }}>
                  <span style={{ color: '#64748b', display: 'block', marginBottom: '4px' }}>
                    Ponto de Coleta afetado:
                  </span>
                  <span style={{ color: '#f1f5f9', fontWeight: 500 }}>
                    {selectedNotificacao.pontoColetaNome}
                  </span>
                </div>
              )}

              <div style={{ fontSize: '12px', color: '#64748b' }}>
                Recebido em: {new Date(selectedNotificacao.createdAt).toLocaleString('pt-BR')}
              </div>
            </div>

            <footer className="adminv2-dialog__footer" style={{ justifyContent: 'space-between' }}>
              <button
                type="button"
                onClick={() => handleDelete(selectedNotificacao.id)}
                className="adminv2-dangerBtn"
                style={{ background: 'transparent', color: '#ef4444', border: '1px solid rgba(239, 68, 68, 0.2)' }}
              >
                Excluir alerta
              </button>
              <button
                type="button"
                onClick={() => setSelectedNotificacao(null)}
                className="adminv2-secondaryBtn"
              >
                Fechar
              </button>
            </footer>
          </section>
        </div>,
        document.body
      )}
    </div>
  );
};