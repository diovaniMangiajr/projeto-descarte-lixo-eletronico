import { AppHeader } from '@/components/layout/AppHeader';

const adminCards = [
  {
    title: 'Pontos de coleta',
    description: 'Gerencie cadastros, horários de funcionamento e status operacional.',
  },
  {
    title: 'Materiais aceitos',
    description: 'Mantenha as categorias organizadas para facilitar a busca do cidadão.',
  },
  {
    title: 'Feedbacks',
    description: 'Acompanhe relatos sobre problemas, lotação e inconsistências nos pontos.',
  },
];

export function AdminPage() {
  return (
    <main className="page page--dashboard">
      <AppHeader />
      <section className="dashboard-hero">
        <div>
          <p className="eyebrow">Área restrita</p>
          <h1>Gerencie a operação da plataforma</h1>
          <p className="page-copy">
            Esta tela já está preparada para receber as próximas funcionalidades do MVP.
          </p>
        </div>
        <button type="button" className="button button--primary">
          Novo ponto de coleta
        </button>
      </section>

      <section className="card-grid" aria-label="Resumo administrativo">
        {adminCards.map((card) => (
          <article key={card.title} className="info-card">
            <h2>{card.title}</h2>
            <p>{card.description}</p>
          </article>
        ))}
      </section>
    </main>
  );
}