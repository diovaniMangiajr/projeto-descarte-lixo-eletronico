import { useState } from 'react';
import type { PontoColetaResponse } from '@/services/pontoColeta.service';
import { X, TriangleAlert, Send, Check, ChevronDown, AlertCircle } from 'lucide-react';

interface ReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  point: PontoColetaResponse | null;
}

const OPCOES_PROBLEMA = [
  { value: "ponto_nao_existe", label: "O ponto de coleta não existe aqui" },
  { value: "lixeira_danificada", label: "Lixeira danificada ou vandalizada" },
  { value: "horario_incorreto", label: "O horário de funcionamento está incorreto" },
  { value: "materiais_recusados", label: "Eles não aceitaram os materiais listados" },
  { value: "outro", label: "Outro problema" }
];

export function ReportModal({ isOpen, onClose, point }: ReportModalProps) {
  const [step, setStep] = useState<'form' | 'success'>('form');
  
  const [tipoProblema, setTipoProblema] = useState('');
  const [observacoes, setObservacoes] = useState('');

  const [isSelectOpen, setIsSelectOpen] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen || !point) return null;

  const handleClose = () => {
    setTimeout(() => {
      setStep('form');
      setTipoProblema('');
      setObservacoes('');
      setIsSelectOpen(false);
      setError('');
    }, 200);
    onClose();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!tipoProblema) {
      setError("Por favor, selecione um tipo de problema.");
      return;
    }
    
    // Lógica de envio aqui (Chamada para a API futuramente)...
    
    setStep('success');
  };

  const labelSelecionada = OPCOES_PROBLEMA.find(opt => opt.value === tipoProblema)?.label;

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
              <button type="button" className="mapv2-modal__close" onClick={handleClose}>
                <X size={20} />
              </button>
            </div>

            <div className="mapv2-modal__body">
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
                      color: tipoProblema ? 'var(--app-text)' : 'var(--app-text-muted)',
                      borderColor: error ? 'var(--danger)' : ''
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
                      style={{ 
                        position: 'absolute', 
                        top: '100%', 
                        left: 0, 
                        right: 0, 
                        marginTop: '8px', 
                        zIndex: 10 
                      }}
                    >
                      {OPCOES_PROBLEMA.map((opt) => (
                        <button
                          key={opt.value}
                          type="button"
                          className="mapv2-search-item"
                          onClick={() => {
                            setTipoProblema(opt.value);
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

              <div className="mapv2-form-group">
                <label htmlFor="observacoes">
                  Observações <span style={{ fontWeight: 400, opacity: 0.7 }}>(Opcional)</span>
                </label>
                <textarea 
                  id="observacoes"
                  className="mapv2-textarea"
                  placeholder="Descreva os detalhes do problema..."
                  value={observacoes}
                  onChange={(e) => setObservacoes(e.target.value)}
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
                style={{ width: 'auto', padding: '0 24px' }}
              >
                CANCELAR
              </button>
              <button 
                type="submit" 
                className="mapv2-btn mapv2-btn--primary"
                style={{ width: 'auto', padding: '0 24px' }}
              >
                ENVIAR NOTIFICAÇÃO
                <Send size={16} />
              </button>
            </div>
          </form>
        ) : (
          <div className="mapv2-modal-success">
            <div className="mapv2-modal-success__icon">
              <Check size={40} strokeWidth={3} />
            </div>
            <h3>Mensagem enviada com sucesso !</h3>
            <button 
              type="button" 
              className="mapv2-btn mapv2-btn--primary"
              onClick={handleClose}
              style={{ width: '120px', marginTop: '10px' }}
            >
              OK
            </button>
          </div>
        )}
      </div>
    </div>
  );
}