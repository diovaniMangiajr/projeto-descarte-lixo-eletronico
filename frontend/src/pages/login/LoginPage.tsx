import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LockKeyhole, LogIn, Mail, AlertCircle, Loader2 } from 'lucide-react';
import { AppHeader } from '@/components/layout/AppHeader';
import { authService } from '@/services/auth.service';
import { AppPaths } from '@/app/routes/paths';
import './login-page.css';

export function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault(); 
    setError(''); 

    if (!email || !password) {
      setError('Por favor, preencha todos os campos.');
      return;
    }

    if (!email.includes('@')) {
      setError('Insira um e-mail válido.');
      return;
    }

    try {
      setIsLoading(true);
    
      const response = await authService.login({ email, senha: password });
      
      localStorage.setItem('@ELixo:token', response.accessToken);
      
      navigate(AppPaths.admin);
      
    } catch (err: any) {
      if (err.response?.status === 401) {
        setError('Credenciais inválidas. Verifique seu e-mail e senha.');
      } else {
        setError('Ocorreu um erro ao conectar com o servidor. Tente novamente.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="loginv2">
      <AppHeader />

      <section className="loginv2-shell">
        <div className="loginv2-card">
          <p className="loginv2-eyebrow">Acesso administrativo</p>
          <h1>Entrar no painel</h1>
          <p className="loginv2-copy">
            Acesse para gerenciar pontos de coleta e validar relatórios.
          </p>

          <form className="loginv2-form" onSubmit={handleLogin} noValidate>
            
            <label className="loginv2-field">
              <span>E-mail</span>
              <div className="loginv2-inputWrap">
                <Mail className="loginv2-inputIcon" />
                <input 
                  type="email" 
                  placeholder="admin@elixolavras.com.br"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={isLoading}
                />
              </div>
            </label>

            <label className="loginv2-field">
              <span>Senha</span>
              <div className="loginv2-inputWrap">
                <LockKeyhole className="loginv2-inputIcon" />
                <input 
                  type="password" 
                  placeholder="Sua senha"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={isLoading}
                />
              </div>
            </label>

            {error && (
              <div className="loginv2-error">
                <AlertCircle size={14} />
                <span>{error}</span>
              </div>
            )}

            <button type="submit" className="loginv2-submit" disabled={isLoading}>
              {isLoading ? (
                <Loader2 className="loginv2-submit__icon animate-spin" />
              ) : (
                <LogIn className="loginv2-submit__icon" />
              )}
              {isLoading ? 'Entrando...' : 'Entrar'}
            </button>
          </form>
        </div>
      </section>
    </main>
  );
}