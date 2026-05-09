// 1. IMPORTAÇÕES: Trazemos ferramentas de fora para usar no nosso arquivo.
import { useState } from 'react'; // O 'useState' é como uma "memória" para o componente.
import { LockKeyhole, LogIn, Mail, AlertCircle } from 'lucide-react'; // Ícones prontos para o visual.
import { AppHeader } from '@/components/layout/AppHeader'; // O cabeçalho padrão que o Leo criou.
import './login-page.css'; // O arquivo onde definimos as cores e o layout.

export function LoginPage() {
  // 2. ESTADOS (A Memória do Componente):
  // O React não "enxerga" variáveis comuns se elas mudarem. 
  // Usamos o 'useState' para que, quando o valor mudar, a tela se atualize sozinha.
  
  // 'email' guarda o texto digitado; 'setEmail' é a função que usamos para trocar esse texto.
  const [email, setEmail] = useState('');
  
  // 'password' guarda a senha; 'setPassword' atualiza a senha.
  const [password, setPassword] = useState('');
  
  // 'error' guarda uma mensagem de texto se algo der errado (ex: campo vazio).
  const [error, setError] = useState('');

  // 3. AÇÃO DE LOGIN: O que acontece quando o usuário clica no botão "Entrar".
  const handleLogin = (e: React.FormEvent) => {
    // Esse comando evita que o navegador recarregue a página (comportamento padrão de formulários).
    e.preventDefault(); 
    
    // Toda vez que tentamos logar, limpamos o erro anterior para começar do zero.
    setError(''); 

    // Verificação de segurança 1: Os campos estão preenchidos?
    if (!email || !password) {
      setError('Por favor, preencha todos os campos.');
      return; // Para a execução aqui se houver erro.
    }

    // Verificação de segurança 2: O e-mail parece um e-mail de verdade (tem @)?
    if (!email.includes('@')) {
      setError('Insira um e-mail válido.');
      return;
    }

    // Simulação de verificação no Banco de Dados:
    // INTEGRAÇÃO COM O BACKEND:
        // No futuro, este trecho enviará os dados para o servidor backend
        // desenvolvido com Spring Boot e JPA, que gerencia os dados no PostgreSQL
        // e está orquestrado via Docker. Usaremos uma biblioteca 
        // chamada 'Axios' para fazer essa ponte entre o React e o Java.
    if (email !== 'admin@elixolavras.com.br') {
       setError('Credenciais inválidas. Verifique seu e-mail e senha.');
    } else {
       console.log('Sucesso! O usuário pode entrar no painel.');
    }
  };

  // 4. O VISUAL (JSX): É o que será desenhado na tela do navegador.
  return (
    <main className="loginv2">
      {/* Exibe o cabeçalho no topo da página */}
      <AppHeader />

      <section className="loginv2-shell">
        <div className="loginv2-card">
          <p className="loginv2-eyebrow">Acesso administrativo</p>
          <h1>Entrar no painel</h1>
          <p className="loginv2-copy">
            Acesse para gerenciar pontos de coleta e validar relatórios.
          </p>

          {/* Quando o formulário for enviado (Submit), ele chama a nossa função 'handleLogin' */}
          <form className="loginv2-form" onSubmit={handleLogin}>
            
            {/* Campo de E-mail */}
            <label className="loginv2-field">
              <span>E-mail</span>
              <div className="loginv2-inputWrap">
                <Mail className="loginv2-inputIcon" />
                <input 
                  type="email" 
                  placeholder="admin@elixolavras.com.br"
                  value={email} // O campo mostra o que está na nossa "memória" (estado)
                  onChange={(e) => setEmail(e.target.value)} // Quando o usuário digita, avisamos a memória
                />
              </div>
            </label>

            {/* Campo de Senha */}
            <label className="loginv2-field">
              <span>Senha</span>
              <div className="loginv2-inputWrap">
                <LockKeyhole className="loginv2-inputIcon" />
                <input 
                  type="password" 
                  placeholder="Sua senha"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </label>

            {/* Lógica "E": Se houver um texto dentro de 'error', desenhe esse bloco vermelho abaixo */}
            {error && (
              <div style={{ color: '#ff486e', fontSize: '13px', display: 'flex', alignItems: 'center', gap: '6px', marginTop: '4px' }}>
                <AlertCircle size={14} />
                <span>{error}</span>
              </div>
            )}

            <button type="submit" className="loginv2-submit">
              <LogIn className="loginv2-submit__icon" />
              Entrar
            </button>
          </form>
        </div>
      </section>
    </main>
  );
}