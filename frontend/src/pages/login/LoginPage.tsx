import { LockKeyhole, LogIn, Mail } from 'lucide-react';
import { AppHeader } from '@/components/layout/AppHeader';
import './login-page.css';

export function LoginPage() {
  return (
    <main className="loginv2">
      <AppHeader />

      <section className="loginv2-shell">
        <div className="loginv2-card" role="region" aria-label="Acesso administrativo">
          <p className="loginv2-eyebrow">Acesso administrativo</p>
          <h1>Entrar no painel</h1>
          <p className="loginv2-copy">
            Acesse para gerenciar pontos de coleta, validar relatórios e acompanhar o fluxo de descarte.
          </p>

          <form className="loginv2-form">
            <label className="loginv2-field">
              <span>E-mail</span>
              <div className="loginv2-inputWrap">
                <Mail className="loginv2-inputIcon" aria-hidden="true" />
                <input type="email" name="email" placeholder="admin@elixolavras.com.br" />
              </div>
            </label>

            <label className="loginv2-field">
              <span>Senha</span>
              <div className="loginv2-inputWrap">
                <LockKeyhole className="loginv2-inputIcon" aria-hidden="true" />
                <input type="password" name="password" placeholder="Sua senha" />
              </div>
            </label>

            <button type="submit" className="loginv2-submit">
              <LogIn className="loginv2-submit__icon" aria-hidden="true" />
              Entrar
            </button>
          </form>
        </div>
      </section>
    </main>
  );
}
