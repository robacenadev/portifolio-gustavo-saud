/* ── main.js ──
   Typed.js · Contadores animados · Scroll reveal
   Nav ativo · Modais de projetos e experiências
─────────────────────────────────────────── */

(function () {
  'use strict';

  /* ════════════════════════════════════════
     TYPED.JS — hero tag rotativo
  ════════════════════════════════════════ */
  new Typed('#typed-tag', {
    strings: ['Backend Dev', 'DevOps', 'NOC Analyst', 'Django Dev', 'Docker Lover'],
    typeSpeed:   70,
    backSpeed:   35,
    backDelay:  1800,
    loop:        true,
  });

  /* ════════════════════════════════════════
     COUNTER ANIMATION — números do hero
  ════════════════════════════════════════ */
  function countUp(el) {
    const target = parseFloat(el.dataset.target);
    const suffix = el.dataset.suffix || '';
    const duration = 1400;
    const startTime = Date.now();

    function tick() {
      const elapsed  = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased    = 1 - Math.pow(1 - progress, 3); // ease out cubic
      const current  = Math.floor(target * eased);

      el.textContent = (progress >= 1 ? target : current) + suffix;
      if (progress < 1) requestAnimationFrame(tick);
    }

    tick();
  }

  /* ════════════════════════════════════════
     SCROLL REVEAL — fade + slide ao entrar na viewport
  ════════════════════════════════════════ */
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;

      const delay = parseFloat(entry.target.style.transitionDelay || 0) * 1000;
      setTimeout(() => {
        entry.target.classList.add('vis');
        // Dispara contadores que estejam dentro deste elemento
        entry.target.querySelectorAll('[data-target]').forEach(countUp);
      }, delay);

      revealObserver.unobserve(entry.target);
    });
  }, { threshold: 0.08 });

  document.querySelectorAll('.reveal, .reveal-left').forEach((el) => {
    revealObserver.observe(el);
  });

  // Hero já visível — anima sem esperar scroll
  setTimeout(() => {
    document.querySelectorAll('#hero .reveal, #hero .reveal-left').forEach((el) => {
      const delay = parseFloat(el.style.transitionDelay || 0) * 1000;
      setTimeout(() => {
        el.classList.add('vis');
        el.querySelectorAll('[data-target]').forEach(countUp);
      }, delay);
    });
  }, 120);

  /* ════════════════════════════════════════
     NAV ACTIVE — destaca link da seção visível
  ════════════════════════════════════════ */
  const navLinks = document.querySelectorAll('.nav-links a');

  document.querySelectorAll('section[id]').forEach((section) => {
    new IntersectionObserver((entries) => {
      if (!entries[0].isIntersecting) return;
      navLinks.forEach((a) => a.classList.remove('active'));
      const active = document.querySelector(`.nav-links a[href="#${section.id}"]`);
      if (active) active.classList.add('active');
    }, { threshold: 0.35 }).observe(section);
  });

  /* ════════════════════════════════════════
     DATA — conteúdo dos modais
  ════════════════════════════════════════ */
  const DATA = {
    proj: {
      growth: {
        badge:   '● EM PRODUÇÃO · CRM & ERP',
        title:   'Growth Ocean',
        sub:     'AGÊNCIA DE MARKETING DIGITAL · MAR/2026 – ATUAL',
        about:   'Sistema web de gestão interna completo, construído do zero para a Easy Drop. Centraliza toda a operação da empresa — do primeiro contato com o cliente até a entrega final.',
        features: [
          'Funil de captação visual estilo Kanban — do lead ao cliente fechado',
          'Módulo financeiro com controle de receitas, despesas e recorrências',
          'Geração automática de contratos em PDF após aprovação de orçamento',
          'Integração com Google Calendar para agendamentos e reuniões',
          'Cobranças automáticas via Asaas — PIX, boleto e cartão',
          'Portal do cliente para acompanhamento em tempo real',
          'Notificações automáticas via WhatsApp integrado',
          'Cadastro público com proteção anti-bot (honeypot)',
        ],
        stack: [
          ['devicon-django-plain colored',      'Django 5.1'],
          ['devicon-postgresql-plain colored',  'PostgreSQL 16'],
          ['devicon-docker-plain colored',       'Docker'],
          ['',                                   'Railway'],
          ['',                                   'Asaas API'],
          ['devicon-google-plain colored',       'Google Calendar API'],
          ['devicon-javascript-plain colored',   'JavaScript'],
        ],
        actions: `<a href="https://ocean.easydropdigital.com.br/" target="_blank" class="mbtn mbtn-p">🌐 ver ao vivo</a>`,
      },

      billing: {
        badge:   '● EM PRODUÇÃO · CORPORATIVO',
        title:   'Plataforma Multi-Cloud Billing',
        sub:     'EMPRESA DE CIBERSEGURANÇA E INFRAESTRUTURA · DEZ/2025 – ATUAL',
        about:   'Plataforma web corporativa multi-tenant para consolidação, análise e gestão de custos em ambientes AWS, Azure e Huawei Cloud. Assumi o projeto após saída do desenvolvedor anterior.',
        features: [
          'Consolidação de billing de 3 clouds em uma única interface',
          'Pipelines de ingestão automática de dados via n8n',
          'Dashboards interativos com Chart.js por cliente e por serviço',
          'Exportação automatizada de relatórios em PDF',
          'Arquitetura multi-tenant com segregação de dados por cliente',
          'Deploy em Docker Swarm com Traefik como reverse proxy',
          'Refatoração de código legado e otimização de queries MySQL',
        ],
        stack: [
          ['devicon-python-plain colored',  'Python'],
          ['devicon-django-plain',           'Django'],
          ['devicon-mysql-plain colored',    'MySQL'],
          ['',                               'n8n'],
          ['devicon-docker-plain colored',   'Docker Swarm'],
          ['',                               'Traefik'],
          ['devicon-javascript-plain colored','Chart.js'],
        ],
        lock:    true,
        actions: '',
      },

      transparencia: {
        badge:   'DESAFIO TÉCNICO · RPA',
        title:   'Transparência Bot',
        sub:     'BOT DE AUTOMAÇÃO WEB · PORTAL DA TRANSPARÊNCIA GOV.BR',
        about:   'Bot RPA para consulta de pessoas físicas no Portal da Transparência do Governo Federal, com bypass de WAF e retorno de evidência em Base64.',
        features: [
          'Bypass de WAF AWS CloudFront com Chromium headless + anti-detecção',
          'Navegação por DOM assíncrono usando aria-controls',
          'Captura de evidência em Base64 com accordion expandido',
          'API REST com FastAPI e documentação Swagger automática',
          'Suporte a busca por nome, CPF e NIS',
          'Orquestração via n8n: Webhook → API → Google Drive → Sheets',
          'Containerização com Docker Compose',
        ],
        stack: [
          ['devicon-python-plain colored',  'Python 3.12'],
          ['devicon-fastapi-plain colored', 'FastAPI'],
          ['',                              'Playwright'],
          ['devicon-docker-plain colored',  'Docker'],
          ['',                              'n8n'],
          ['devicon-google-plain colored',  'Google Drive API'],
        ],
        actions: `<a href="https://github.com/robacenadev/transparencia-bot" target="_blank" class="mbtn mbtn-g"><i class="devicon-github-original"></i> ver no GitHub</a>`,
      },

      homelab: {
        badge:   'PROJETO PESSOAL · INFRA',
        title:   'Saud Homelab',
        sub:     'LABORATÓRIO PESSOAL DE INFRAESTRUTURA',
        about:   'Ambiente pessoal de infraestrutura montado para estudos e aprendizado. Foco em monitoramento, automação e virtualização.',
        features: [
          'Zabbix Server em VM Ubuntu 22.04 via Hyper-V, configurado do zero',
          'Monitoramento de hosts, triggers e alertas personalizados',
          'Script Python para envio de alertas via Telegram Bot API',
          'Suporte a múltiplos usuários e host groups no bot',
          'Containerização de serviços auxiliares com Docker',
          'Documentação completa de toda a infraestrutura',
        ],
        stack: [
          ['',                              'Zabbix'],
          ['devicon-ubuntu-plain colored',  'Ubuntu Server 22.04'],
          ['devicon-python-plain colored',  'Python'],
          ['devicon-telegram-plain colored','Telegram Bot API'],
          ['',                              'Hyper-V'],
          ['devicon-docker-plain colored',  'Docker'],
          ['devicon-mysql-plain colored',   'MySQL'],
          ['devicon-bash-plain colored',    'Bash'],
        ],
        actions: `<a href="https://github.com/robacenadev/saud-homelab" target="_blank" class="mbtn mbtn-g"><i class="devicon-github-original"></i> ver no GitHub</a>`,
      },
    },

    exp: {
      noc: {
        badge:   '● ATUAL · NOC · PROLINX',
        title:   'Analista de Monitoramento Jr. (NOC)',
        sub:     'OUT/2025 – ATUAL · 8 MESES · BELO HORIZONTE, MG · HÍBRIDO',
        about:   'Atuação no Centro de Operações de Rede (NOC) da Prolinx em regime 24x7, monitorando e respondendo a incidentes na infraestrutura de múltiplos clientes.',
        features: [
          'Monitoramento contínuo 24x7 via Zabbix em infraestrutura de múltiplos clientes',
          'Análise e tratativa de alertas críticos: indisponibilidade, CPU, memória e disco',
          'Atuação proativa na identificação de falhas e riscos operacionais',
          'Verificação do status de links, firewalls, servidores e serviços críticos',
          'Administração básica de servidores Linux: logs, proxies Zabbix e serviços',
          'Instalação, configuração e troubleshooting de agentes Zabbix em Linux e Windows',
          'Criação e validação de itens, triggers e monitoramentos personalizados',
          'Apoio em incidentes envolvendo VMware, redes e sistemas operacionais',
          'Registro e atualização de chamados em service desk com rastreabilidade',
          'Comunicação direta com clientes e escalonamento para times N2/N3',
        ],
        stack: [
          ['',                               'Zabbix'],
          ['devicon-linux-plain colored',    'Linux'],
          ['',                               'VMware'],
          ['',                               'Hyper-V'],
          ['',                               'NOC 24x7'],
          ['',                               'ServiceDesk'],
          ['devicon-windows8-plain colored', 'Windows Server'],
        ],
        actions: `<a href="https://www.linkedin.com/company/1762342/" target="_blank" class="mbtn mbtn-g">↗ LinkedIn da empresa</a>`,
      },

      suporte_prolinx: {
        badge:   'PROLINX · SUPORTE TÉCNICO',
        title:   'Assistente de Suporte Técnico',
        sub:     'DEZ/2024 – OUT/2025 · 11 MESES · BELO HORIZONTE, MG · HÍBRIDO',
        about:   'Suporte técnico para clientes da Prolinx com foco em sistemas operacionais, Microsoft 365 e segurança de redes.',
        features: [
          'Atendimento via chat, telefone e acesso remoto',
          'Suporte ao Windows: instalação e configuração de impressoras',
          'Apoio nas ferramentas Microsoft 365: SharePoint, Exchange e Office',
          'Suporte a firewalls Sophos e pfSense: VPNs site-to-site e conectividade',
          'Administração e suporte no painel de antivírus Bitdefender',
          'Apoio em atividades dentro de servidores conforme necessidade',
        ],
        stack: [
          ['devicon-windows8-plain colored', 'Windows'],
          ['',                               'Microsoft 365'],
          ['',                               'Sophos'],
          ['',                               'pfSense'],
          ['',                               'VPN'],
          ['',                               'Bitdefender'],
          ['',                               'Anydesk'],
          ['',                               'Exchange'],
        ],
        actions: `<a href="https://www.linkedin.com/company/1762342/" target="_blank" class="mbtn mbtn-g">↗ LinkedIn da empresa</a>`,
      },

      siematec: {
        badge:   'SIEMATEC INFORMÁTICA · SUPORTE ERP',
        title:   'Analista de Suporte',
        sub:     'JUN/2024 – NOV/2024 · 6 MESES · BELO HORIZONTE, MG',
        about:   'Suporte especializado no sistema ERP da Siematec, com análise de banco de dados, testes e atendimento direto ao cliente.',
        features: [
          'Atendimento por chat e telefone com suporte ao sistema ERP',
          'Análise de banco de dados SQL e scripts para correção de erros',
          'Testes e avaliações do ERP para identificar melhorias',
          'Suporte técnico remoto via Anydesk com instalação e verificação do sistema',
          'Abertura e documentação de chamados via ServiceDesk',
        ],
        stack: [
          ['devicon-microsoftsqlserver-plain colored', 'SQL'],
          ['',                                          'ERP'],
          ['',                                          'Anydesk'],
          ['',                                          'ServiceDesk'],
          ['devicon-mysql-plain colored',               'MySQL'],
        ],
        actions: '',
      },

      space_telecom: {
        badge:   'SPACE TELECOM · INFRAESTRUTURA',
        title:   'Técnico de Suporte',
        sub:     'OUT/2023 – JUL/2024 · 10 MESES · BELO HORIZONTE, MG · PRESENCIAL',
        about:   'Suporte técnico de redes e infraestrutura em provedor de internet, com foco em provisionamento de ONU/ONT e monitoramento de rede.',
        features: [
          'Atendimento e suporte de rede: roteadores, dados e conectividade',
          'Liberação de ONU e ONT e monitoramento contínuo',
          'Utilização do U2000 para análise e monitoramento da rede interna',
          'Análise da rede via gráficos de desempenho e qualidade de sinal',
        ],
        stack: [
          ['', 'Redes'],
          ['', 'ONU/ONT'],
          ['', 'Roteadores'],
          ['', 'U2000'],
          ['', 'FTTH'],
          ['', 'Fibra Óptica'],
        ],
        actions: '',
      },
    },
  };

  /* ════════════════════════════════════════
     MODAL — abre com spring + stagger
  ════════════════════════════════════════ */
  function openModal(type, id) {
    const p = DATA[type][id];

    // Header
    document.getElementById('mhc').innerHTML = `
      <div>
        <div class="modal-badge">${p.badge}</div>
        <div class="modal-title">${p.title}</div>
        <div class="modal-sub">${p.sub}</div>
      </div>`;

    // Stack tags
    const stackHTML = p.stack
      .map(([icon, name]) =>
        `<span class="mstag">${icon ? `<i class="${icon}"></i>` : ''}${name}</span>`
      ).join('');

    // Body
    let body = `
      <div class="m-item">
        <div class="mstitle">// sobre</div>
        <p class="mtext">${p.about}</p>
      </div>
      <div class="m-item">
        <div class="mdiv"></div>
        <div class="mstitle">// ${type === 'exp' ? 'atividades' : 'funcionalidades'}</div>
        <ul class="mfeatures">${p.features.map((f) => `<li>${f}</li>`).join('')}</ul>
      </div>
      <div class="m-item">
        <div class="mdiv"></div>
        <div class="mstitle">// tecnologias</div>
        <div class="mstack">${stackHTML}</div>
      </div>`;

    if (p.lock) {
      body += `
        <div class="m-item">
          <div class="mlock">
            <span style="font-size:18px">🔒</span>
            <div class="mlock-text">Projeto de uso interno corporativo. Por questões de
              <strong>LGPD e confidencialidade</strong>, o código e a URL não são divulgados.
              Em produção ativa e sob manutenção contínua.
            </div>
          </div>
        </div>`;
    }

    if (p.actions) {
      body += `<div class="m-item"><div class="mactions">${p.actions}</div></div>`;
    }

    document.getElementById('mb').innerHTML = body;
    document.getElementById('mo').classList.add('open');
    document.body.style.overflow = 'hidden';

    // Stagger das seções internas
    setTimeout(() => {
      document.querySelectorAll('.m-item').forEach((el, i) => {
        setTimeout(() => el.classList.add('visible'), 80 + i * 70);
      });
    }, 200);
  }

  function closeModal() {
    document.getElementById('mo').classList.remove('open');
    document.body.style.overflow = '';
  }

  document.getElementById('mcl').addEventListener('click', closeModal);
  document.getElementById('mo').addEventListener('click', (e) => {
    if (e.target === e.currentTarget) closeModal();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
  });

  // Expõe openModal globalmente para os onclick do HTML
  window.openM = openModal;

})();
