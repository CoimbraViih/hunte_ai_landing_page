# PROJECT ARCHITECTURE: Hunter.AI

## 1. CONTEXT & PROBLEM

Pequenos e médios negócios (comércio local, clínicas, prestadores de serviço, e-commerces enxutos) perdem vendas porque não conseguem responder clientes com rapidez e consistência. O atendimento é manual e disperso entre WhatsApp, Instagram e site, sem padronização — o dono ou a equipe reduzida vive sobrecarregado apagando incêndio.

Isso gera demora na primeira resposta, leads não qualificados que consomem tempo do time, atendimento genérico quando alguém tenta automatizar com chatbot de script fixo, e nenhuma visibilidade sobre o que está convertendo ou travando a venda. O resultado é baixa taxa de conversão e oportunidades perdidas para o concorrente que responde primeiro.

## 2. PROPOSED SOLUTION

A Hunter.AI atua como uma agência de soluções digitais para pequenos e médios negócios. Nesta primeira fase, o que será desenvolvido é uma landing page institucional que apresenta a marca e os serviços da Hunter.AI, com um botão de WhatsApp para o lead entrar em contato direto — sem formulário, sem login, sem plataforma de autoatendimento.

Serviços oferecidos pela Hunter.AI (apresentados na landing page):
1) Desenvolvimento de agentes de IA humanizados para atendimento — atendem o cliente final do contratante pelo WhatsApp, Instagram ou site, com tom de voz natural, qualificação de lead e agendamento.
2) Criação de site para empresas que ainda não têm presença digital.
3) Redesign e otimização de site já existente, para empresas que têm site mas não convertem.

Nota interna (não expor ao lead/cliente final): os agentes de IA são construídos internamente com n8n. A comunicação pública da Hunter.AI deve apresentar apenas o resultado — 'agentes de IA humanizados para atendimento' — sem mencionar a ferramenta de automação por trás.

## 3. FUNCTIONAL REQUIREMENTS

- Landing Page

Sem funcionalidades de plataforma nesta fase. A landing page é institucional/estática: apresenta os 3 serviços da Hunter.AI (agentes de IA para atendimento, criação de site, redesign de site) e direciona o lead para contato direto via botão de WhatsApp (link wa.me), sem formulário de captação.

## 4. USER PERSONAS

Persona única — cliente-alvo da Hunter.AI (não há usuários internos de plataforma nesta fase):

Dono(a) de pequeno ou médio negócio (comércio local, clínica, prestador de serviço, e-commerce enxuto) que atende clientes por WhatsApp, Instagram ou telefone e sente que está perdendo venda por demora ou desorganização no atendimento. Não tem equipe de tecnologia e busca uma solução pronta, sem precisar entender de IA ou de código.

Dentro desse perfil, dois momentos de necessidade coexistem:
— Sem site: quer presença digital profissional para transmitir credibilidade e ser encontrado.
— Com site desatualizado ou que não converte: quer um redesign focado em gerar contato e venda.

Chega até a Hunter.AI buscando resolver um problema concreto (atendimento lento, site que não gera resultado), não em busca de 'contratar uma agência de tecnologia' — a decisão é motivada por resultado percebido, não por características técnicas.

## 5. TECHNICAL STACK

- Next.js
- React
- Tailwind CSS
- shadcn/ui
- Supabase
- Vercel
- Claude Code
- TypeScript

Landing page institucional e estática — não requer integração de backend nesta fase, apenas um link direto para WhatsApp (wa.me) como único CTA.

Resend será incorporado futuramente, caso a landing page passe a ter também formulário de contato por e-mail.

Nota: os agentes de IA vendidos como serviço pela Hunter.AI são implementados internamente com n8n — isso não faz parte do stack desta landing page, é a ferramenta de entrega do serviço ao cliente contratante.

## 6. DESIGN LANGUAGE

Linear — interface limpa, hierarquia tipográfica forte, uso de cor como acento e não como decoração; referência de clareza visual para a landing page.

Vercel / Intercom (sites institucionais) — páginas enxutas, bem hierarquizadas, com CTA único e direto; referência para apresentar os 3 serviços sem ruído, guiando o lead até o botão de WhatsApp.

Identidade visual própria da Hunter.AI: fundo escuro (ink #0A0F0D), verde-sinal (#2EE6A0) como cor de ação/IA ativa, âmbar (#FFB23E) como acento de calor humano. Tipografia Space Grotesk (display) + Manrope (corpo) + JetBrains Mono (dados). Símbolo de mira (crosshair) como elemento de marca. Brand book completo já disponível no projeto (ver `brand/`).

## 7. PROCESS

- Break app build into logical milestones (steps)
- Each milestone should be a deliverable increment
- Prioritize core functionality first, then iterate
- Test each milestone before moving to the next
