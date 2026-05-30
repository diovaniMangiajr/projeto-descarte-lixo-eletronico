import { useState } from 'react';
import type { PontoColetaResponse } from '@/services/pontoColeta.service';
import { relatoProblemaService, TipoRelato } from '@/services/relatoProblema.service';
import { X, TriangleAlert, Send, Check, ChevronDown, AlertCircle } from 'lucide-react';

interface ReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  point: PontoColetaResponse | null;
}

// Opções espelhadas do Enum TipoRelato do Back-end
const OPCOES_PROBLEMA: { value: TipoRelato; label: string }[] = [
  { value: 'PONTO_NAO_EXISTE', label: 'O ponto de coleta não existe aqui' },
  { value: 'LIXEIRA_DANIFICADA', label: 'Lixeira danificada ou vandalizada' },
  { value: 'LIXEIRA_CHEIA', label: 'Lixeira cheia' },
  { value: 'HORARIO_INCORRETO', label: 'O horário de funcionamento está incorreto' },
  { value: 'MATERIAIS_RECUSADOS', label: 'Eles não aceitaram os materiais listados' },
  { value: 'OUTRO', label: 'Outro problema' }
];

export function ReportModal({ isOpen, onClose, point }: ReportModalProps) {
  const [step, setStep] = useState<'form' | 'success'>('form');
  
  const [tipoRelato, setTipoRelato] = useState<TipoRelato | ''>('');
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [observacao, setObservacao] = useState('');

  const [isSelectOpen, setIsSelectOpen] = useState(false);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen || !point) return null;

  const handleClose = () => {
    setTimeout(() => {
      setStep('form');
      setTipoRelato('');
      setNome('');
      setEmail('');
      setObservacao('');
      setIsSelectOpen(false);
      setError('');
    }, 200);
    onClose();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!tipoRelato) {
      setError("Por favor, selecione um tipo de problema.");
      return;
    }
    if (!nome.trim() || !email.trim()) {
      setError("Por favor, preencha seu nome e e-mail.");
      return;
    }
    if (!email.includes('@')) {
      setError("Por favor, insira um e-mail válido.");
      return;
    }

    try {
      setIsSubmitting(true);
      
      // Chamada real para a sua API!
      await relatoProblemaService.create(point.id, {
        tipoRelato: tipoRelato as TipoRelato,
        nome: nome,
        email: email,
        observacao: observacao.trim() === '' ? undefined : observacao // Envia undefined se vazio
      });

      setStep('success');
    } catch (err: any) {
      console.error(err);
      setError("Ocorreu um erro ao enviar o relato. Tente novamente.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const labelSelecionada = OPCOES_PROBLEMA.find(opt => opt.value === tipoRelato)?.label;

  return (
    <div className="mapv2-modal-overlay" onClick={handleClose}>
      <div 
        className="mapv2-modal" 
        onClick={(e) => e.stopPropagation()} 
        role="dialog" 
        aria-modal="true"
      >
        {step === 'form' ? (
          <form onSubmit={handleSubmit} noValidate>
            <div className="mapv2-modal__header">
              <h2 className="mapv2-modal__title">
                <TriangleAlert className="mapv2-modal__title-icon" size={20} />
                Reportar Problema
              </h2>
              <button type="button" className="mapv2-modal__close" onClick={handleClose} disabled={isSubmitting}>
                <X size={20} />
              </button>
            </div>

            {/* maxHeight e overflow para garantir que não quebre a tela em monitores menores */}
            <div className="mapv2-modal__body" style={{ maxHeight: '65vh', overflowY: 'auto' }}>
              
              {/* SELECT CUSTOMIZADO */}
              <div className="mapv2-form-group">
                <label>Tipo de Problema</label>
                <div style={{ position: 'relative' }}>
                  <div 
                    className="mapv2-input"
                    style={{ 
                      display: 'flex', 
                      justifyContent: 'space-between', 
                      alignItems: 'center',
                      cursor: 'pointer',
                      color: tipoRelato ? 'var(--app-text)' : 'var(--app-text-muted)',
                      borderColor: (error && !tipoRelato) ? 'var(--danger)' : ''
                    }}
                    onClick={() => {
                      setIsSelectOpen(!isSelectOpen);
                      setError('');
                    }}
                  >
                    {labelSelecionada || 'Selecione uma opção'}
                    <ChevronDown size={16} style={{ 
                      transform: isSelectOpen ? 'rotate(180deg)' : 'rotate(0)',
                      transition: 'transform 0.2s'
                    }}/>
                  </div>

                  {isSelectOpen && (
                    <div 
                      className="mapv2-search-dropdown" 
                      style={{ position: 'absolute', top: '100%', left: 0, right: 0, marginTop: '8px', zIndex: 10 }}
                    >
                      {OPCOES_PROBLEMA.map((opt) => (
                        <button
                          key={opt.value}
                          type="button"
                          className="mapv2-search-item"
                          onClick={() => {
                            setTipoRelato(opt.value);
                            setIsSelectOpen(false);
                            setError('');
                          }}
                        >
                          <div className="mapv2-search-item__text">
                            <strong>{opt.label}</strong>
                          </div>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* DADOS DO USUÁRIO */}
              <div className="mapv2-form-group">
                <label htmlFor="nome">Seu Nome</label>
                <input 
                  id="nome"
                  type="text"
                  className="mapv2-input"
                  placeholder="Como podemos te chamar?"
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                  style={{ borderColor: (error && !nome) ? 'var(--danger)' : '' }}
                />
              </div>

              <div className="mapv2-form-group">
                <label htmlFor="email">Seu E-mail</label>
                <input 
                  id="email"
                  type="email"
                  className="mapv2-input"
                  placeholder="exemplo@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  style={{ borderColor: (error && (!email || !email.includes('@'))) ? 'var(--danger)' : '' }}
                />
              </div>

              {/* OBSERVAÇÃO */}
              <div className="mapv2-form-group">
                <label htmlFor="observacao">
                  Observações <span style={{ fontWeight: 400, opacity: 0.7 }}>(Opcional)</span>
                </label>
                <textarea 
                  id="observacao"
                  className="mapv2-textarea"
                  placeholder="Descreva os detalhes do problema..."
                  value={observacao}
                  onChange={(e) => setObservacao(e.target.value)}
                />
              </div>
              
              {error && (
                <div className="mapv2-error-message">
                  <AlertCircle size={14} />
                  <span>{error}</span>
                </div>
              )}
            </div>

            <div className="mapv2-modal__footer">
              <button 
                type="button" 
                className="mapv2-btn mapv2-btn--ghost" 
                onClick={handleClose}
                disabled={isSubmitting}
                style={{ width: 'auto', padding: '0 24px' }}
              >
                CANCELAR
              </button>
              <button 
                type="submit" 
                className="mapv2-btn mapv2-btn--primary"
                disabled={isSubmitting}
                style={{ width: 'auto', padding: '0 24px', opacity: isSubmitting ? 0.7 : 1 }}
              >
                {isSubmitting ? 'ENVIANDO...' : 'ENVIAR RELATO'}
                {!isSubmitting && <Send size={16} />}
              </button>
            </div>
          </form>
        ) : (
          <div className="mapv2-modal-success">
            <div className="mapv2-modal-success__icon">
              <Check size={40} strokeWidth={3} />
            </div>
            <h3>Relato enviado com sucesso!</h3>
            <p style={{ color: 'var(--app-text-muted)', fontSize: '14px', margin: '-10px 0 10px' }}>
              Obrigado por ajudar a manter nossa cidade limpa.
            </p>
            <button 
              type="button" 
              className="mapv2-btn mapv2-btn--primary"
              onClick={handleClose}
              style={{ width: '120px' }}
            >
              OK
            </button>
          </div>
        )}
      </div>
    </div>
  );
}