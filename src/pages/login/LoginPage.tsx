import { AppHeader } from '@/components/layout/AppHeader';

export function LoginPage() {
  return (
    <main className="page page--auth">
      <AppHeader />
      <section className="auth-shell">
        <div className="auth-card">
          <p className="eyebrow">Acesso administrativo</p>
          <h1>Entrar no painel</h1>
          <p className="page-copy">
            A base de autenticação ficará pronta para receber o backend Spring Boot mais à frente.
          </p>
          <form className="form-stack">
            <label className="field">
              <span>E-mail</span>
              <input type="email" name="email" placeholder="admin@elixolavras.com.br" />
            </label>
            <label className="field">
              <span>Senha</span>
              <input type="password" name="password" placeholder="Sua senha" />
            </label>
            <button type="submit" className="button button--primary">
              Entrar
            </button>
          </form>
        </div>
      </section>
    </main>
  );
}