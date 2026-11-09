import { useState } from 'react'
import heroImg from './assets/hero.png'
import './App.css'

function App() {
  const [authForm, setAuthForm] = useState({ name: '', email: '', password: '' })
  const [authMsg, setAuthMsg] = useState('')
  const [pixMsg, setPixMsg] = useState('')

  const handleAuth = async (e) => {
    e.preventDefault()
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(authForm),
      })
      const data = await res.json()
      setAuthMsg(`Login ok: ${data.message || ''}`)
    } catch (err) {
      setAuthMsg('Erro no login')
    }
  }

  const handlePix = async (e) => {
    e.preventDefault()
    try {
      const res = await fetch('/api/payments/stripe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ valor: 25, email: authForm.email }),
      })
      const data = await res.json()
      setPixMsg(`Pix gerado: ${data.message || ''} - Status: ${data.status || ''}`)
    } catch (err) {
      setPixMsg('Erro no pix')
    }
  }

  return (
    <>
      <header className="header">
        <div className="container header-inner">
          <a href="#hero" className="logo">⚡ QuickMoney</a>
          <nav className="nav">
            <a href="#how">Como Funciona</a>
            <a href="#fluxo">Fluxo de Dinheiro</a>
            <a href="#faq">FAQ</a>
            <a href="#jobs">Vacas</a>
            <a href="#pricing">Planos</a>
            <a href="#empresas">Empresas</a>
            <a href="#cta">Começar</a>
          </nav>
          <a href="#cta" className="btn btn-primary btn-sm">Começar Agora</a>
        </div>
      </header>

      <main>
        <section id="hero" className="hero-section">
          <div className="container hero-grid">
            <div className="hero-content">
              <span className="badge">💸 Mais de R$ 1.500 pagos em microtarefas este mês</span>
              <h1>
                Ganhe dinheiro <span className="gradient-text">rápido</span> hoje
              </h1>
              <p className="lead">
                A QuickMoney conecta você a microtarefas pagas: pesquisas, testes de UX,
                avaliações e microsserviços digitais. Sem falso engajamento — você recebe via Pix.
              </p>
              <div className="hero-actions">
                <a href="#cta" className="btn btn-primary">Quero Ganhar Agora</a>
                <a href="#how" className="btn btn-outline">Como Funciona</a>
              </div>
              <div className="hero-stats">
                <div className="stat"><strong>R$ 2.400+</strong><span>pago a criadores</span></div>
                <div className="stat"><strong>12k+</strong><span>usuários ativos</span></div>
                <div className="stat"><strong>4.9/5</strong><span>avaliação média</span></div>
              </div>
            </div>
            <div className="hero-visual">
              <img src={heroImg} alt="QuickMoney" />
            </div>
          </div>
        </section>

        <section id="how" className="section">
          <div className="container">
            <h2>Como Funciona</h2>
            <p className="section-subtitle">Do contrato à Pix em poucos passos</p>
            <div className="steps-grid">
              <div className="card step-card">
                <div className="step-number">1</div>
                <h3>Empresa contrata</h3>
                <p>Empresas publicam tarefas pagas e contratam criadores.</p>
              </div>
              <div className="card step-card">
                <div className="step-number">2</div>
                <h3>Criador picks</h3>
                <p>Criadores escolhem tarefas alinhadas ao perfil.</p>
              </div>
              <div className="card step-card">
                <div className="step-number">3</div>
                <h3>Pix & comissão</h3>
                <p>Pagamento via Pix com repasse e comissão da plataforma.</p>
              </div>
            </div>
          </div>
        </section>

        <section id="fluxo" className="section">
          <div className="container">
            <h2>Como o Dinheiro Circula</h2>
            <p className="section-subtitle">Do pagamento à você, em 3 etapas</p>
            <div className="fluxo-grid">
              <div className="card fluxo-card">
                <div className="fluxo-num">1</div>
                <h3>Contratação</h3>
                <p>Empresa paga a tarefa (ex.: R$ 25,00).</p>
              </div>
              <div className="card fluxo-card">
                <div className="fluxo-num">2</div>
                <h3>Execução</h3>
                <p>Criador picks e entrega o resultado.</p>
              </div>
              <div className="card fluxo-card">
                <div className="fluxo-num">3</div>
                <h3>Repasse</h3>
                <p>Comissão da plataforma (ex.: R$ 5,00) → criador recebe via Pix.</p>
              </div>
            </div>
          </div>
        </section>

        <section id="faq" className="section">
          <div className="container">
            <h2>Perguntas Frequentes</h2>
            <p className="section-subtitle">Tudo o que você precisa saber</p>
            <div className="faq-list">
              <details className="faq-item">
                <summary>O que é o QuickMoney?</summary>
                <p>A QuickMoney conecta pessoas a microtarefas pagas: pesquisas, testes de UX, avaliações e microsserviços digitais.</p>
              </details>
              <details className="faq-item">
                <summary>Como ganho dinheiro?</summary>
                <p>Você picks tarefas, executa e recebe via Pix. A plataforma retém uma comissão sobre cada tarefa.</p>
              </details>
              <details className="faq-item">
                <summary>Quanto tempo levo para receber?</summary>
                <p>Apos a conclusao da tarefa, o repasse via Pix e imediato.</p>
              </details>
              <details className="faq-item">
                <summary>A plataforma e confiavel?</summary>
                <p>A QuickMoney busca reduzir falsos engajamentos com pagamentos reais via Pix.</p>
              </details>
            </div>
          </div>
        </section>

        <section id="jobs" className="section">
          <div className="container">
            <h2>Vagas Abertas</h2>
            <p className="section-subtitle">Tarefas que estão pagando bem agora</p>
            <div className="jobs-grid">
              <div className="card job-card">
                <span className="job-tag">Pesquisa</span>
                <h3>Teste de UX de app de delivery</h3>
                <p className="job-price">R$ 25,00</p>
                <div className="job-meta">⏱ 20 min • Dificuldade: Fácil</div>
              </div>
              <div className="card job-card">
                <span className="job-tag">Avaliação</span>
                <h3>Avaliação de anúncio de serviço</h3>
                <p className="job-price">R$ 15,00</p>
                <div className="job-meta">⏱ 10 min • Dificuldade: Fácil</div>
              </div>
              <div className="card job-card">
                <span className="job-tag">Microtarefa</span>
                <h3>Cadastro e configuração de anúncio</h3>
                <p className="job-price">R$ 30,00</p>
                <div className="job-meta">⏱ 30 min • Dificuldade: Média</div>
              </div>
            </div>
          </div>
        </section>

        <section id="pricing" className="section">
          <div className="container">
            <h2>Planos</h2>
            <p className="section-subtitle">Escolha como quer começar</p>
            <div className="pricing-grid">
              <div className="card price-card">
                <h3>Básico</h3>
                <p className="price"><strong>R$ 0</strong><span>/mês</span></p>
                <ul>
                  <li>3 tarefas por semana</li>
                  <li>Suporte via chat</li>
                  <li>Pagamento via Pix</li>
                </ul>
                <a href="#cta" className="btn btn-outline btn-block">Começar Grátis</a>
              </div>
              <div className="card price-card featured">
                <div className="featured-badge">Mais Popular</div>
                <h3>Pro</h3>
                <p className="price"><strong>R$ 29</strong><span>/mês</span></p>
                <ul>
                  <li>Tarefas ilimitadas</li>
                  <li>Suporte prioritário</li>
                  <li>Pagamento via Pix</li>
                </ul>
                <a href="#cta" className="btn btn-primary btn-block">Assinar Pro</a>
              </div>
            </div>
          </div>
        </section>

        <section id="auth" className="section">
          <div className="container">
            <h2>Entre ou Crie Conta</h2>
            <p className="section-subtitle">Acesse a plataforma em segundos</p>
            <div className="auth-card card">
              <form onSubmit={handleAuth}>
                <input type="text" placeholder="Nome completo" value={authForm.name} onChange={(e) => setAuthForm({ ...authForm, name: e.target.value })} />
                <input type="email" placeholder="E-mail" value={authForm.email} onChange={(e) => setAuthForm({ ...authForm, email: e.target.value })} />
                <input type="password" placeholder="Senha" value={authForm.password} onChange={(e) => setAuthForm({ ...authForm, password: e.target.value })} />
                <button type="submit" className="btn btn-primary btn-block">Entrar</button>
              </form>
              <button type="button" className="btn btn-outline btn-block" onClick={handlePix}>Gerar Pix via Stripe</button>
              {authMsg && <p className="auth-msg">{authMsg}</p>}
              {pixMsg && <p className="auth-msg">{pixMsg}</p>}
            </div>
          </div>
        </section>

        <section id="empresas" className="section">
          <div className="container cta-inner">
            <h2>Sua empresa paga para ter qualidade?</h2>
            <p>Publique tarefas, receba entregas verificadas e controle seus custos.</p>
            <a href="#cta" className="btn btn-primary btn-lg">Quero Publicar Tarefas</a>
          </div>
        </section>

        <section id="cta" className="section cta-section">
          <div className="container cta-inner">
            <h2>Pronto para ganhar seu próximo dinheiro?</h2>
            <p>Junte-se a milhares de pessoas que já ganham com a QuickMoney.</p>
            <a href="#cta-form" className="btn btn-light btn-lg">Quero Começar Agora</a>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="container footer-inner">
          <div className="logo">⚡ QuickMoney</div>
          <p>© {new Date().getFullYear()} QuickMoney. Todos os direitos reservados.</p>
        </div>
      </footer>
    </>
  )
}

export default App
