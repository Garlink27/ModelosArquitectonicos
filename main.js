import { initChaos } from './chaos.js';

// =====================================================================
//  DATA — All original educational content preserved
// =====================================================================

const modelsData = {
  microservicios: {
    icon: '🔷', name: 'Arquitectura de Microservicios', subtitle: 'Microservices Architecture',
    description: 'Patrón arquitectónico que estructura una aplicación como un conjunto de servicios pequeños, autónomos y desplegables de forma independiente. Cada servicio se ejecuta en su propio proceso, se comunica mediante protocolos ligeros (HTTP/REST, gRPC, mensajería) y está organizado en torno a una capacidad de negocio específica.',
    visualizar: { text: 'Los microservicios permiten diagramar el sistema como una constelación de servicios interconectados, donde cada nodo representa un servicio independiente con su propia base de datos y API.', points: ['Diagramas de topología de servicios que muestran cada microservicio como un nodo independiente','Mapas de comunicación inter-servicio (síncrona vía REST/gRPC y asíncrona vía eventos)','Vistas de despliegue mostrando contenedores Docker, pods de Kubernetes y balanceadores de carga','Diagramas C4 (Contexto, Contenedores, Componentes, Código) para zoom progresivo en la arquitectura','Flujos de datos entre servicios con indicación de protocolos y formatos (JSON, Protobuf, Avro)'] },
    planificar: { text: 'Facilita la planificación al permitir que equipos independientes trabajen en paralelo sobre servicios distintos, con sprints desacoplados y estimaciones más precisas por bounded context.', points: ['Cada equipo (squad) puede planificar sprints independientes para su servicio','Estimación granular: cada microservicio es un artefacto de complejidad acotada','Mitigación de riesgos: fallos en un servicio no afectan al sistema completo (bulkhead pattern)','Escalabilidad selectiva: escalar solo los servicios que reciben más tráfico','Estrategias de deploy independientes: canary releases, blue-green, feature flags por servicio','Decisiones tecnológicas por servicio: cada equipo elige su stack según el problema'] },
    comunicar: { text: 'Actúa como lenguaje universal donde cada servicio se traduce en un contrato (API contract), permitiendo que desarrolladores, PMs y stakeholders hablen sobre "el servicio de pagos" o "el servicio de usuarios" como entidades claras.', points: ['Contratos API (OpenAPI/Swagger) como documentación viva entre equipos','Bounded contexts del DDD como vocabulario compartido (lenguaje ubicuo)','Service catalog (ej. Backstage) donde todos pueden descubrir y entender cada servicio','ADRs (Architecture Decision Records) por servicio para rastrear decisiones','Dashboards de observabilidad (Grafana, Datadog) como "radiadores de información"'] },
    pros: ['Despliegue independiente — cada servicio se versiona y despliega por separado','Escalabilidad granular — escalar solo lo que necesita más recursos','Resiliencia — aislamiento de fallos mediante circuit breakers y bulkheads','Flexibilidad tecnológica — cada servicio puede usar el stack más adecuado','Equipos autónomos — ownership claro y reducción de dependencias organizacionales','Facilita CI/CD — pipelines más rápidos y enfocados por servicio'],
    cons: ['Complejidad operacional alta — requiere orquestación, monitoreo distribuido y service mesh','Latencia de red — llamadas inter-servicio añaden latencia vs. llamadas en proceso','Consistencia eventual — transacciones distribuidas son inherentemente más complejas (Saga pattern)','Overhead de infraestructura — cada servicio necesita su pipeline, monitoreo y logging','Testing de integración complejo — requiere contract testing y entornos de staging','Curva de aprendizaje empinada — el equipo debe dominar DevOps, containers y orquestación'],
    caseStudy: { company: 'Netflix', description: 'Netflix migró de una arquitectura monolítica a microservicios entre 2008-2012 para soportar su crecimiento explosivo. Hoy opera más de 1,000 microservicios que manejan 250+ millones de suscriptores, procesando miles de millones de requests diarias. Cada servicio se despliega cientos de veces por día.' }
  },
  capas: {
    icon: '📚', name: 'Arquitectura en Capas (Layered)', subtitle: 'Layered / N-Tier Architecture',
    description: 'Modelo que organiza el sistema en capas horizontales de responsabilidad, donde cada capa proporciona servicios a la capa superior y consume servicios de la capa inferior. Típicamente incluye: Presentación, Lógica de Negocio, Acceso a Datos y Base de Datos.',
    visualizar: { text: 'Se representa como una pila vertical (stack) donde cada capa descansa sobre la anterior, con flechas unidireccionales de arriba hacia abajo indicando la dirección de dependencia.', points: ['Diagrama de pila vertical con 3-4 capas claramente separadas por líneas horizontales','Flechas de dependencia unidireccionales: Presentación → Negocio → Datos → BD','Cada capa como una "caja" con sus responsabilidades listadas internamente','Colores diferenciados por capa para identificación visual rápida','Interfaces entre capas claramente definidas (contratos de servicio)'] },
    planificar: { text: 'Facilita la planificación al dividir el trabajo en capas especializadas, permitiendo que equipos front-end, back-end y de base de datos trabajen con interfaces claras entre sí.', points: ['División natural del trabajo: un equipo por capa (UI, lógica, datos)','Estimaciones predecibles basadas en cambios por capa afectada','Riesgos acotados: cambios en una capa tienen impacto limitado en las demás','Reutilización de la capa de negocio para múltiples interfaces (web, mobile, API)','Testing por capas: unit tests en negocio, integration en datos, E2E en presentación','Escalabilidad limitada pero predecible (scale-up del tier de aplicación)'] },
    comunicar: { text: 'Es el modelo más intuitivo para comunicar la estructura de un sistema a audiencias no técnicas, ya que la metáfora de "capas" es universalmente comprendida.', points: ['Metáfora visual universal: todos entienden el concepto de "capas apiladas"','Ideal para onboarding de developers junior — el primer patrón que se aprende','Facilita la discusión de cambios: "este feature afecta la capa de presentación y negocio"','Documentación clara de responsabilidades por capa','Alineación natural con roles del equipo (frontend dev, backend dev, DBA)'] },
    pros: ['Simplicidad conceptual — fácil de entender, implementar y mantener','Separación de concerns — cada capa tiene responsabilidades bien definidas','Facilidad de testing — cada capa puede probarse de forma aislada','Amplio soporte en frameworks — Spring MVC, ASP.NET MVC, Django siguen este patrón','Ideal para MVPs y proyectos medianos con equipos pequeños','Curva de aprendizaje suave — patrón más enseñado y documentado'],
    cons: ['Escalabilidad limitada — se escala toda la aplicación, no componentes individuales','Monolito disfrazado — puede derivar en acoplamiento fuerte entre capas','Performance — cada request atraviesa todas las capas (incluso si no todas son necesarias)','Rigidez ante cambios transversales (cross-cutting concerns)','Despliegue monolítico — un cambio en cualquier capa requiere redespliegue completo','Tendencia al "sinkhole anti-pattern" (capas que solo pasan datos sin agregar valor)'],
    caseStudy: { company: 'Sistemas Bancarios Tradicionales', description: 'La mayoría de los core banking systems utilizan arquitectura en capas: una capa de presentación (banca online/mobile), una capa de servicios de negocio (motor de reglas financieras), una capa de acceso a datos y la base de datos relacional (Oracle, DB2). Priorizan la consistencia transaccional (ACID) sobre la escalabilidad horizontal.' }
  },
  eventos: {
    icon: '⚡', name: 'Arquitectura Basada en Eventos', subtitle: 'Event-Driven Architecture (EDA)',
    description: 'Modelo en el que los componentes del sistema se comunican produciendo y consumiendo eventos de forma asincrónica. Los eventos representan cambios de estado significativos y fluyen a través de un broker de mensajes (Kafka, RabbitMQ, SNS/SQS).',
    visualizar: { text: 'Se diagrama como un flujo de eventos entre productores y consumidores, con un message broker central actuando como canal de distribución.', points: ['Diagrama de flujo de eventos con productores a la izquierda y consumidores a la derecha','Event broker central (Kafka, RabbitMQ) como hub de distribución de eventos','Líneas de flujo asíncronas (punteadas) para diferenciar de llamadas síncronas','Event storming boards para modelar el dominio (técnica colaborativa visual)','Topologías: Broker topology vs. Mediator topology claramente diferenciadas'] },
    planificar: { text: 'Permite planificar sistemas altamente reactivos y tolerantes a fallos, donde los equipos definen sus eventos como contratos y pueden evolucionar sus consumidores sin afectar a los productores.', points: ['Desacoplamiento temporal: productores y consumidores no necesitan estar activos simultáneamente','Planificación por dominio de eventos: cada equipo es dueño de sus eventos publicados','Escalabilidad natural: agregar consumidores no requiere modificar productores','Resiliencia incorporada: las colas persisten eventos si un consumidor cae','Event versioning para evolución controlada de contratos entre equipos'] },
    comunicar: { text: 'Los eventos actúan como un "diario de sucesos" del sistema que todos los stakeholders pueden entender.', points: ['Event Storming como técnica de workshop colaborativa entre técnicos y negocio','Los nombres de eventos son auto-descriptivos (OrderPlaced, PaymentConfirmed)','Event catalog como documentación viva de todos los eventos del sistema','Flujos de negocio expresados como cadenas de eventos comprensibles','Trazabilidad completa: cada evento deja un registro auditable'] },
    pros: ['Desacoplamiento extremo — productores y consumidores no se conocen entre sí','Escalabilidad horizontal — agregar consumidores sin modificar el sistema existente','Procesamiento en tiempo real — reacción inmediata a cambios de estado','Resiliencia natural — colas persisten eventos ante fallos de consumidores','Auditoría completa — event sourcing permite reconstruir el estado','Ideal para CQRS (Command Query Responsibility Segregation)'],
    cons: ['Complejidad de debugging — rastrear un flujo a través de múltiples eventos es difícil','Consistencia eventual — no hay garantía de orden estricto en todos los casos','Error handling complejo — dead letter queues, retries y compensaciones','Infraestructura adicional — requiere brokers, monitoreo de colas','Testabilidad desafiante — simular flujos de eventos completos es laborioso','Riesgo de "event soup" — proliferación descontrolada de tipos de eventos'],
    caseStudy: { company: 'Uber', description: 'Uber utiliza arquitectura basada en eventos masivamente para su sistema de pricing dinámico (surge pricing). Su plataforma de eventos maneja 1+ PB de datos por día a través de Apache Kafka procesando trillones de mensajes diarios.' }
  },
  'cliente-servidor': {
    icon: '🖥️', name: 'Arquitectura Cliente-Servidor', subtitle: 'Client-Server Architecture',
    description: 'Modelo fundamental donde la aplicación se divide en dos roles: el cliente (que solicita recursos o servicios) y el servidor (que los provee). Es la base de la web moderna (HTTP request-response), APIs REST, y aplicaciones de base de datos.',
    visualizar: { text: 'Se representa con dos bloques principales conectados por una línea de comunicación (red), con el protocolo de comunicación claramente indicado entre ambos.', points: ['Diagrama simple de dos bloques: Cliente (browser/app) y Servidor (backend/API)','Flechas bidireccionales indicando request → y ← response','Protocolos de comunicación etiquetados (HTTP/HTTPS, WebSocket, gRPC)','Variante multi-tier: cliente → servidor de aplicación → servidor de base de datos','Diagrama de secuencia para flujos request-response detallados'] },
    planificar: { text: 'Facilita la planificación al separar claramente las responsabilidades del equipo frontend (cliente) y backend (servidor), con la API como contrato entre ambos.', points: ['División clara de equipos: frontend team y backend team','API contract como punto de integración — se puede definir antes de implementar','Sprints paralelos: frontend y backend pueden trabajar simultáneamente con mocks','Estimación separada para lógica de presentación vs. lógica de negocio','Escalabilidad del servidor mediante load balancing y réplicas'] },
    comunicar: { text: 'Es el modelo más intuitivo para cualquier persona que haya usado un navegador web.', points: ['Metáfora natural: "el navegador pide una página y el servidor la entrega"','Documentación de API (Swagger/OpenAPI) como contrato legible por todos','Ideal para explicar flujos web a stakeholders no técnicos','Separación de UX (diseñadores trabajan en el cliente) y lógica (devs en el servidor)'] },
    pros: ['Simplicidad conceptual — modelo más intuitivo y ampliamente comprendido','Separación clara — frontend y backend son proyectos independientes','Centralización de datos — el servidor es la fuente de verdad','Seguridad — la lógica sensible vive en el servidor','Reutilización — un mismo servidor sirve múltiples clientes','Ecosistema maduro — HTTP, REST, GraphQL, WebSocket son estándares probados'],
    cons: ['Punto único de fallo — si el servidor cae, todos los clientes se afectan','Cuello de botella — todo el tráfico converge en el servidor centralizado','Latencia de red — cada operación requiere un round-trip al servidor','Escalabilidad limitada — escalar el servidor requiere load balancers','Dependencia de conexión — el cliente generalmente no funciona offline','Sobrecarga del servidor — en escenarios de alto tráfico requiere optimización agresiva'],
    caseStudy: { company: 'WordPress / Shopify', description: 'El modelo cliente-servidor es la base de toda la World Wide Web. Cuando un usuario accede a una tienda Shopify, su navegador (cliente) envía un HTTP request al servidor que procesa la petición, consulta la base de datos y devuelve la respuesta.' }
  },
  hexagonal: {
    icon: '⬡', name: 'Arquitectura Hexagonal', subtitle: 'Hexagonal / Ports & Adapters / Clean Architecture',
    description: 'Modelo propuesto por Alistair Cockburn que separa la lógica de negocio (dominio) de los detalles técnicos (frameworks, bases de datos, APIs externas) mediante "puertos" (interfaces) y "adaptadores" (implementaciones). El dominio está en el centro y es completamente agnóstico a la infraestructura.',
    visualizar: { text: 'Se representa como un hexágono con el dominio en el centro, puertos en los bordes y adaptadores en el exterior.', points: ['Hexágono central representando el dominio/lógica de negocio pura','Puertos (interfaces) en los bordes del hexágono','Adaptadores divididos en: Driving (entrada: REST, CLI, UI) y Driven (salida: BD, API, email)','Flechas de dependencia siempre apuntando hacia el centro (Dependency Inversion)','Anillos concéntricos para Clean Architecture'] },
    planificar: { text: 'Permite planificar el desarrollo empezando por la lógica de negocio (inside-out), posponiendo decisiones de infraestructura.', points: ['Desarrollo inside-out: primero la lógica de negocio, luego la infraestructura','Decisiones de framework/BD pospuestas','Testing del dominio sin dependencias externas (100% unit testable)','Múltiples adaptadores de entrada permiten soportar nuevos canales sin reescribir lógica','Riesgos de vendor lock-in mitigados'] },
    comunicar: { text: 'Comunica de forma visual y clara la separación entre "lo que el sistema HACE" (dominio) y "CÓMO lo hace" (infraestructura).', points: ['Vocabulario claro: "puerto", "adaptador", "dominio"','Alineación natural con DDD (Domain-Driven Design)','Facilita la discusión de reglas de negocio aisladas de detalles técnicos','ADRs claros: "cambiamos el adaptador de PostgreSQL a MongoDB, el dominio no se toca"','Onboarding enfocado: nuevos devs pueden aprender el dominio sin conocer la infraestructura'] },
    pros: ['Independencia del framework — el dominio no depende de ninguna tecnología específica','Testabilidad excepcional — el dominio se testea al 100% sin BD, API ni framework','Flexibilidad — cambiar base de datos, framework web o servicio externo es plug-and-play','Lógica de negocio protegida — las reglas no se contaminan con detalles técnicos','Ideal para Domain-Driven Design (DDD)','Múltiples puntos de entrada — soporta REST, GraphQL, CLI, eventos sin duplicar lógica'],
    cons: ['Complejidad estructural — más capas, interfaces y clases','Over-engineering para proyectos pequeños — demasiada ceremonia para CRUDs simples','Curva de aprendizaje — requiere dominar inversión de dependencias y patrones DDD','Más código boilerplate — interfaces, DTOs, mappers entre capas','Disciplina constante — sin governance, los equipos tienden a "romper" las reglas','Dificultad para definir los límites del dominio en sistemas ambiguos'],
    caseStudy: { company: 'Nubank / Stripe', description: 'Nubank, el banco digital más grande de Latinoamérica (+80M clientes), utiliza arquitectura hexagonal con Clojure. Su dominio financiero está completamente aislado de la infraestructura. Pueden cambiar proveedores de pago, scoring crediticio o bases de datos sin modificar una sola línea de lógica de negocio.' }
  }
};

const categoryData = {
  monolitica: { title: '🧱 Arquitectura Monolítica', content: '<p>Una <strong>aplicación monolítica</strong> contiene todos sus componentes (UI, negocio, datos) en una sola unidad.</p><ul><li><strong>Ventajas:</strong> Simple de desarrollar, testear y desplegar inicialmente.</li><li><strong>Desventajas:</strong> Difícil de escalar y mantener.</li></ul><p><strong>Ejemplos:</strong> Shopify (origen), Stack Overflow (.NET), Basecamp (Rails), Etsy, Moodle.</p>' },
  cs: { title: '🖥️ Cliente-Servidor', content: '<p>El modelo <strong>Cliente-Servidor</strong> distribuye tareas entre proveedores de recursos (servidores) y demandantes (clientes).</p><ul><li><strong>Ventajas:</strong> Centralización del control y seguridad.</li><li><strong>Desventajas:</strong> El servidor es un punto único de fallo (SPOF).</li></ul><p><strong>Ejemplos:</strong> Sistemas de Correo (SMTP/IMAP), Navegación Web (HTTP), Juegos multijugador (WoW), FTP, MySQL remoto.</p>' },
  capas: { title: '📚 Arquitectura en Capas', content: '<p>Organización del sistema en <strong>capas horizontales</strong> (Presentación, Negocio, Datos).</p><ul><li><strong>Ventajas:</strong> Separación de responsabilidades clara.</li><li><strong>Desventajas:</strong> Escalabilidad monolítica y acumulación de latencia.</li></ul><p><strong>Ejemplos:</strong> Spring Boot (Controller-Service-Repository), ASP.NET MVC, ERPs, Django MTV, Modelo OSI.</p>' },
  eventos: { title: '⚡ Basada en Eventos', content: '<p>Componentes que se comunican produciendo y consumiendo <strong>eventos asíncronos</strong> a través de un broker.</p><ul><li><strong>Ventajas:</strong> Desacoplamiento extremo y procesamiento reactivo.</li><li><strong>Desventajas:</strong> Debugging complejo y consistencia eventual.</li></ul><p><strong>Ejemplos:</strong> Uber (asignación viajes), LinkedIn (Apache Kafka), Trading NYSE, Stripe (Webhooks), IoT.</p>' },
  microservicios: { title: '🔷 Microservicios', content: '<p>Conjunto de <strong>servicios pequeños y autónomos</strong> comunicándose por protocolos ligeros.</p><ul><li><strong>Ventajas:</strong> Despliegue independiente, aislamiento de fallos (Bulkhead).</li><li><strong>Desventajas:</strong> Alta complejidad operativa y de infraestructura.</li></ul><p><strong>Ejemplos:</strong> Netflix (+1000 servicios), Amazon, Spotify, Uber, SoundCloud (BFF).</p>' },
  hexagonal: { title: '💠 Arquitectura Hexagonal', content: '<p>Aísla el <strong>núcleo de dominio</strong> mediante Puertos y Adaptadores (Clean Architecture).</p><ul><li><strong>Ventajas:</strong> Alta testeabilidad, agnóstica de frameworks o bases de datos.</li><li><strong>Desventajas:</strong> Curva de aprendizaje y verbosidad en el código.</li></ul><p><strong>Ejemplos:</strong> Fintechs, Netflix (DDD), Facturación electrónica, Motores de reglas, Reservas aéreas.</p>' }
};

function modelToHtml(m) {
  let h = `<h3>${m.icon} ${m.name}</h3><p><em>${m.subtitle}</em></p><p>${m.description}</p>`;
  h += `<h4>Visualizar</h4><p>${m.visualizar.text}</p><ul>${m.visualizar.points.map(p => `<li>${p}</li>`).join('')}</ul>`;
  h += `<h4>Planificar</h4><p>${m.planificar.text}</p><ul>${m.planificar.points.map(p => `<li>${p}</li>`).join('')}</ul>`;
  h += `<h4>Comunicar</h4><p>${m.comunicar.text}</p><ul>${m.comunicar.points.map(p => `<li>${p}</li>`).join('')}</ul>`;
  h += `<h4>✅ Pros</h4><ul>${m.pros.map(p => `<li>${p}</li>`).join('')}</ul>`;
  h += `<h4>❌ Contras</h4><ul>${m.cons.map(p => `<li>${p}</li>`).join('')}</ul>`;
  h += `<h4>📋 Caso de Estudio: ${m.caseStudy.company}</h4><p>${m.caseStudy.description}</p>`;
  return h;
}

// =====================================================================
//  CONTENT CHUNKING — splits HTML into fragments for progressive reveal
// =====================================================================

function splitContent(html, maxChunks = 5) {
  const div = document.createElement('div');
  div.innerHTML = html.trim();
  const els = Array.from(div.children);
  if (els.length === 0) return [html];
  if (els.length <= maxChunks) return els.map(e => e.outerHTML);
  const per = Math.ceil(els.length / maxChunks);
  const chunks = [];
  for (let i = 0; i < els.length; i += per) {
    chunks.push(els.slice(i, i + per).map(e => e.outerHTML).join(''));
  }
  return chunks;
}

// =====================================================================
//  CANVAS & CORE STATE
// =====================================================================

const canvas = document.getElementById('game-canvas');
const ctx = canvas.getContext('2d');
let cw = 0, ch = 0;

const STATE = { HUB: 0, WARP_IN: 1, ROOM: 2, WARP_OUT: 3 };
let gameState = STATE.HUB;
let currentLevelIdx = 0;
let keys = {};
let warpProgress = 0;
let activeNode = null;
let savedPos = { x: 0, y: 0 };
let hubEntryCooldownUntil = 0;
let hubNodeBlocked = null;

// Particles
let particles = [];

// Room state
let roomFragments = [];
let revealedChunks = 0;
let contentChunks = [];

// Player
const player = { size: 28, speed: 6, color: '#06b6d4', glow: '#67e8f9', x: 0, y: 0 };

// Prevent scroll on arrows
window.addEventListener('keydown', e => {
  keys[e.key.toLowerCase()] = true;
  if (['arrowup','arrowdown','arrowleft','arrowright',' '].includes(e.key.toLowerCase())) e.preventDefault();
});
window.addEventListener('keyup', e => { keys[e.key.toLowerCase()] = false; });

// =====================================================================
//  FRAGMENT BEHAVIORS
// =====================================================================

const BH = { FLOAT: 0, ORBIT: 1, DODGE: 2, BLINK: 3 };

function updateFragment(f, idx) {
  if (f.collected) return;
  const t = Date.now() / 1000;

  if (f.behavior === BH.FLOAT) {
    f.x = f.baseX + Math.sin(t + f.phase) * 25;
    f.y = f.baseY + Math.cos(t * 0.7 + f.phase) * 20;
  } else if (f.behavior === BH.ORBIT) {
    const cx = f.baseX;
    const cy = f.baseY;
    const r = 40 + idx * 10;
    f.x = cx + Math.cos(t * 0.8 + f.phase) * r;
    f.y = cy + Math.sin(t * 0.8 + f.phase) * r;
  } else if (f.behavior === BH.DODGE) {
    const dist = Math.hypot(player.x - f.x, player.y - f.y);
    if (dist < 120 && dist > 0) {
      const angle = Math.atan2(f.y - player.y, f.x - player.x);
      f.x += Math.cos(angle) * 4;
      f.y += Math.sin(angle) * 4;
    }
    // Gentle drift back toward base
    f.x += (f.baseX - f.x) * 0.005;
    f.y += (f.baseY - f.y) * 0.005;
    // Keep in bounds
    const minX = cw * 0.48, maxX = cw - 30, minY = 30, maxY = ch - 30;
    f.x = Math.max(minX, Math.min(maxX, f.x));
    f.y = Math.max(minY, Math.min(maxY, f.y));
  } else if (f.behavior === BH.BLINK) {
    f.visible = Math.sin(t * 1.5 + f.phase) > -0.3;
    f.x = f.baseX + Math.sin(t * 0.5 + f.phase) * 15;
    f.y = f.baseY + Math.cos(t * 0.3 + f.phase) * 15;
  }
}

// =====================================================================
//  LEVELS
// =====================================================================

const levels = [
  {
    name: 'Fundamentos',
    behavior: BH.FLOAT,
    door: { x: 0, y: 0, width: 120, height: 30, open: false },
    nodes: [
      { id: 'intro', px: 0.25, py: 0.35, read: false, title: '¿Qué son los Modelos Arquitectónicos?', content: '<p>Un modelo arquitectónico es un <strong>blueprint estructural</strong> que define cómo se organizan, conectan y comunican los componentes de un sistema de software.</p><p>Establece las reglas fundamentales de diseño que guían la construcción, el despliegue y la evolución de aplicaciones a escala.</p>' },
      { id: 'vis', px: 0.75, py: 0.35, read: false, title: 'Pilar 1: Visualizar', content: '<p>Diagramar y representar gráficamente el sistema. Permite a los equipos <strong>ver la arquitectura</strong> antes de construirla, usando diagramas UML, C4, o flujos de datos.</p><ul><li>Diagramas de componentes y despliegue</li><li>Mapas de dependencias entre servicios</li><li>Flujos de datos y secuencias de comunicación</li><li>Vistas lógicas, físicas y de proceso</li></ul>' },
      { id: 'plan', px: 0.25, py: 0.65, read: false, title: 'Pilar 2: Planificar', content: '<p>Facilitar la toma de decisiones técnicas, la estimación de recursos y sprints, y la <strong>mitigación de riesgos</strong> desde las fases tempranas del proyecto.</p><ul><li>Estimación de esfuerzo y complejidad por módulo</li><li>Identificación de cuellos de botella y riesgos</li><li>Definición de contratos entre equipos</li><li>Estrategia de escalabilidad y despliegue</li></ul>' },
      { id: 'com', px: 0.75, py: 0.65, read: false, title: 'Pilar 3: Comunicar', content: '<p>Servir como <strong>lenguaje común</strong> entre desarrolladores, arquitectos, diseñadores UX/UI, PMs y stakeholders para alinear expectativas y decisiones.</p><ul><li>Documentación viva y comprensible</li><li>Onboarding acelerado de nuevos miembros</li><li>Alineación entre equipos técnicos y negocio</li><li>ADRs (Architecture Decision Records)</li></ul>' },
      { id: 'most', px: 0.5, py: 0.5, read: false, title: 'Modelo Más Usado', content: '<p>Según encuestas de <strong>O\'Reilly (2024)</strong>, <strong>InfoQ</strong> y reportes de <strong>Gartner</strong>, la arquitectura de microservicios es el modelo dominante en empresas tecnológicas.</p><p><strong>Razones:</strong></p><ul><li>Containerización (Docker + Kubernetes)</li><li>Cloud Computing (AWS, Azure, GCP)</li><li>DevOps y CI/CD</li><li>Escalabilidad selectiva</li></ul>' }
    ]
  },
  {
    name: 'Categorías',
    behavior: BH.ORBIT,
    door: { x: 0, y: 0, width: 120, height: 30, open: false },
    nodes: Object.entries(categoryData).map(([k, d], i) => ({
      id: k, px: 0.2 + (i % 3) * 0.3, py: 0.3 + Math.floor(i / 3) * 0.35,
      read: false, title: d.title, content: d.content
    }))
  },
  {
    name: 'Modelos en Detalle',
    behavior: BH.DODGE,
    door: { x: 0, y: 0, width: 120, height: 30, open: false },
    nodes: Object.entries(modelsData).map(([k, d], i) => ({
      id: k, px: 0.15 + (i % 3) * 0.35, py: 0.3 + Math.floor(i / 3) * 0.35,
      read: false, title: `${d.icon} ${d.name}`, content: modelToHtml(d)
    }))
  },
  {
    name: 'Comparativa & Caos',
    behavior: BH.BLINK,
    door: { x: 0, y: 0, width: 120, height: 30, open: false },
    nodes: [
      { id: 'comp', px: 0.3, py: 0.5, read: false, title: 'Matriz de Decisión', content: `
        <table class="comparison__table"><thead><tr><th>Dimensión</th><th>Micro.</th><th>Capas</th><th>Eventos</th><th>C-S</th><th>Hex.</th></tr></thead><tbody>
        <tr><td class="comparison__label">Complejidad</td><td><span class="badge badge--high">Alta</span></td><td><span class="badge badge--low">Baja</span></td><td><span class="badge badge--high">Alta</span></td><td><span class="badge badge--low">Baja</span></td><td><span class="badge badge--mid">Media</span></td></tr>
        <tr><td class="comparison__label">Escalabilidad</td><td><span class="badge badge--excellent">Excelente</span></td><td><span class="badge badge--limited">Limitada</span></td><td><span class="badge badge--excellent">Excelente</span></td><td><span class="badge badge--mid">Media</span></td><td><span class="badge badge--mid">Media</span></td></tr>
        <tr><td class="comparison__label">Mantenibilidad</td><td><span class="badge badge--excellent">Excelente</span></td><td><span class="badge badge--mid">Media</span></td><td><span class="badge badge--mid">Media</span></td><td><span class="badge badge--mid">Media</span></td><td><span class="badge badge--excellent">Excelente</span></td></tr>
        <tr><td class="comparison__label">Rendimiento</td><td><span class="badge badge--mid">Variable</span></td><td><span class="badge badge--mid">Bueno</span></td><td><span class="badge badge--excellent">Excelente</span></td><td><span class="badge badge--mid">Bueno</span></td><td><span class="badge badge--mid">Bueno</span></td></tr>
        <tr><td class="comparison__label">Testabilidad</td><td><span class="badge badge--excellent">Excelente</span></td><td><span class="badge badge--mid">Media</span></td><td><span class="badge badge--mid">Media</span></td><td><span class="badge badge--mid">Media</span></td><td><span class="badge badge--excellent">Excelente</span></td></tr>
        </tbody></table>
        <h3 class="decision-helper__title">🎯 ¿Cuándo elegir cada modelo?</h3>
        <ul>
          <li><strong>Microservicios:</strong> Equipos grandes (+20 devs), alta escala, despliegues frecuentes.</li>
          <li><strong>En Capas:</strong> MVPs, aplicaciones empresariales clásicas, equipos pequeños.</li>
          <li><strong>Event-Driven:</strong> Sistemas en tiempo real, IoT, procesamiento de streams.</li>
          <li><strong>Cliente-Servidor:</strong> APIs REST, separación clara frontend/backend.</li>
          <li><strong>Hexagonal:</strong> Dominios complejos (DDD), alta testabilidad, fintech.</li>
        </ul>` },
      { id: 'chaos', px: 0.7, py: 0.5, read: false, title: 'Ingeniería del Caos', isChaos: true, content: `
        <div class="chaos-dashboard">
          <div class="chaos-controls">
            <h3 class="chaos-controls__title">Herramientas de Ataque 🐒</h3>
            <div class="chaos-btn-group">
              <button class="btn btn--danger chaos-btn" data-attack="kill-db">🔥 Fallo BD</button>
              <button class="btn btn--warning chaos-btn" data-attack="kill-node">⚡ Caída Comp.</button>
              <button class="btn btn--primary chaos-btn" data-attack="ddos">🌊 Pico Tráfico</button>
              <button class="btn btn--secondary chaos-btn" data-attack="latency">🐌 Latencia</button>
              <button class="btn btn--ghost chaos-btn" data-attack="reset">🔄 Reset</button>
            </div>
            <div class="chaos-log" id="chaos-log"><div class="log-entry success">▶ Sistemas en línea...</div></div>
          </div>
          <div class="chaos-arenas">
            <div class="chaos-arena" id="arena-mono"><h4>Monolito</h4><div class="chaos-status badge badge--excellent" id="status-mono">ONLINE</div><div class="chaos-canvas-wrapper"><canvas id="canvas-mono" width="300" height="250"></canvas></div></div>
            <div class="chaos-arena" id="arena-cs"><h4>Cliente-Servidor</h4><div class="chaos-status badge badge--excellent" id="status-cs">ONLINE</div><div class="chaos-canvas-wrapper"><canvas id="canvas-cs" width="300" height="250"></canvas></div></div>
            <div class="chaos-arena" id="arena-layered"><h4>Capas</h4><div class="chaos-status badge badge--excellent" id="status-layered">ONLINE</div><div class="chaos-canvas-wrapper"><canvas id="canvas-layered" width="300" height="250"></canvas></div></div>
            <div class="chaos-arena" id="arena-events"><h4>Eventos</h4><div class="chaos-status badge badge--excellent" id="status-events">ONLINE</div><div class="chaos-canvas-wrapper"><canvas id="canvas-events" width="300" height="250"></canvas></div></div>
            <div class="chaos-arena" id="arena-micro"><h4>Microservicios</h4><div class="chaos-status badge badge--excellent" id="status-micro">ONLINE</div><div class="chaos-canvas-wrapper"><canvas id="canvas-micro" width="300" height="250"></canvas></div></div>
            <div class="chaos-arena" id="arena-hex"><h4>Hexagonal</h4><div class="chaos-status badge badge--excellent" id="status-hex">ONLINE</div><div class="chaos-canvas-wrapper"><canvas id="canvas-hex" width="300" height="250"></canvas></div></div>
          </div>
        </div>` }
    ]
  }
];

// =====================================================================
//  RESIZE — must come AFTER levels
// =====================================================================

function resize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  cw = canvas.width;
  ch = canvas.height;
  levels.forEach(lvl => {
    lvl.door.x = cw / 2 - 60;
    lvl.door.y = 80; // Below header
    lvl.door.open = lvl.nodes.every(n => n.read); // Preserve open state
  });
}
window.addEventListener('resize', resize);
resize();
player.x = cw / 2;
player.y = ch - 120;

// =====================================================================
//  UTILITY
// =====================================================================

function getLevelNodes() {
  return levels[currentLevelIdx].nodes.map(n => ({ ...n, x: n.px * cw, y: n.py * ch }));
}

function updateHubUI() {
  const lvl = levels[currentLevelIdx];
  document.getElementById('level-indicator').textContent = `Nivel ${currentLevelIdx + 1}: ${lvl.name}`;
  const readCount = lvl.nodes.filter(n => n.read).length;
  const total = lvl.nodes.length;
  document.getElementById('progress-text').textContent = `Nodos: ${readCount} / ${total}`;
  document.getElementById('progress-fill').style.width = `${(readCount / total) * 100}%`;
  if (readCount === total) lvl.door.open = true;
}

function spawnParticles(x, y, color, count = 10) {
  for (let i = 0; i < count; i++) {
    const angle = (i / count) * Math.PI * 2 + Math.random() * 0.5;
    particles.push({
      x, y,
      vx: Math.cos(angle) * (2 + Math.random() * 4),
      vy: Math.sin(angle) * (2 + Math.random() * 4),
      life: 1,
      color,
      size: 2 + Math.random() * 4
    });
  }
}

// =====================================================================
//  ROOM MANAGEMENT
// =====================================================================

function enterRoom(nodeData) {
  activeNode = nodeData;
  savedPos = { x: player.x, y: player.y };
  gameState = STATE.WARP_IN;
  warpProgress = 0;

  if (nodeData.isChaos) {
    contentChunks = [nodeData.content];
  } else {
    contentChunks = splitContent(nodeData.content);
  }
  revealedChunks = 0;
}

function setupRoom() {
  const areaL = cw * 0.46, areaR = cw - 40;
  const areaT = 60, areaB = ch - 80;
  const aCX = (areaL + areaR) / 2, aCY = (areaT + areaB) / 2;

  player.x = aCX;
  player.y = aCY;

  const numFrag = activeNode.isChaos ? 0 : contentChunks.length;

  roomFragments = [];
  for (let i = 0; i < numFrag; i++) {
    const angle = (i / numFrag) * Math.PI * 2 - Math.PI / 2;
    const radius = Math.min(areaR - areaL, areaB - areaT) * 0.28;
    roomFragments.push({
      x: aCX + Math.cos(angle) * radius,
      y: aCY + Math.sin(angle) * radius,
      baseX: aCX + Math.cos(angle) * radius,
      baseY: aCY + Math.sin(angle) * radius,
      collected: false,
      behavior: BH.FLOAT,
      phase: Math.random() * Math.PI * 2,
      visible: true
    });
  }

  // For already-read nodes, reveal all immediately
  if (activeNode.read) {
    revealedChunks = contentChunks.length;
    roomFragments.forEach(f => { f.collected = true; });
  } else if (activeNode.isChaos) {
    // Show chaos content immediately but require fragment collection
    revealedChunks = contentChunks.length;
  }

  // Update UI
  document.getElementById('hub-ui').classList.add('hidden');
  document.getElementById('room-ui').classList.remove('hidden');
  document.getElementById('terminal-title').innerHTML = activeNode.title;
  document.getElementById('room-hint').innerHTML = activeNode.isChaos
    ? '<p>La <strong class="hl-green">salida</strong> está activa. Dirígete al portal.</p>'
    : '<p>🎮 Recoge los <strong class="hl-amber">Fragmentos</strong> para revelar información</p><p>Activa el <strong class="hl-green">Portal</strong> al recolectar todos</p>';
  updateTerminal();

  if (activeNode.isChaos) {
    setTimeout(() => { try { initChaos(); } catch (e) { console.warn('Chaos init error:', e); } }, 300);
  }
}

function updateTerminal() {
  const el = document.getElementById('terminal-content');
  let html = '';
  for (let i = 0; i < revealedChunks && i < contentChunks.length; i++) {
    html += `<div class="chunk-reveal">${contentChunks[i]}</div>`;
  }
  if (!activeNode.isChaos && revealedChunks < contentChunks.length) {
    html += `<div class="chunk-locked">🔒 Recoge el fragmento #${revealedChunks + 1} para desbloquear más datos...</div>`;
  }
  el.innerHTML = html;
  el.scrollTop = el.scrollHeight;

  const progressText = document.getElementById('room-progress-text');
  const progressBar = progressText.nextElementSibling;
  if (activeNode.isChaos) {
    progressText.textContent = 'Salida activa';
    progressBar.hidden = true;
  } else {
    const total = roomFragments.length;
    const collected = roomFragments.filter(f => f.collected).length;
    progressText.textContent = `Datos: ${collected}/${total}`;
    progressBar.hidden = false;
    document.getElementById('room-progress-fill').style.width = total > 0 ? `${(collected / total) * 100}%` : '0%';
  }
}

function collectFragment(idx) {
  const f = roomFragments[idx];
  if (!f || f.collected || idx !== roomFragments.findIndex(fragment => !fragment.collected)) return;
  f.collected = true;
  spawnParticles(f.x, f.y, '#f59e0b', 14);

  if (!activeNode.isChaos && revealedChunks < contentChunks.length) {
    revealedChunks++;
  }

  // Chaos: trigger attack
  if (activeNode.isChaos) {
    const attacks = ['kill-db', 'kill-node', 'ddos'];
    const btn = document.querySelector(`[data-attack="${attacks[idx] || 'reset'}"]`);
    if (btn) btn.click();
  }

  updateTerminal();
}

// =====================================================================
//  DRAWING
// =====================================================================

function drawGrid(color) {
  ctx.strokeStyle = color;
  ctx.lineWidth = 1;
  for (let i = 0; i < cw; i += 50) { ctx.beginPath(); ctx.moveTo(i, 0); ctx.lineTo(i, ch); ctx.stroke(); }
  for (let i = 0; i < ch; i += 50) { ctx.beginPath(); ctx.moveTo(0, i); ctx.lineTo(cw, i); ctx.stroke(); }
}

function drawPlayer() {
  ctx.save();
  ctx.shadowBlur = 20;
  ctx.shadowColor = player.glow;
  ctx.fillStyle = player.color;
  const s = player.size;
  const px = player.x - s / 2, py = player.y - s / 2;
  // Body
  ctx.beginPath();
  ctx.fillRect(px, py, s, s);
  ctx.fill();
  // Eyes
  ctx.fillStyle = '#fff';
  ctx.fillRect(player.x - 7, player.y - 4, 4, 5);
  ctx.fillRect(player.x + 3, player.y - 4, 4, 5);
  // Pupils
  ctx.fillStyle = '#0f172a';
  ctx.fillRect(player.x - 5, player.y - 2, 2, 3);
  ctx.fillRect(player.x + 5, player.y - 2, 2, 3);
  ctx.shadowBlur = 0;
  ctx.restore();
}

function drawHubNodes(nodes) {
  nodes.forEach(node => {
    const r = 18;
    ctx.beginPath();
    ctx.arc(node.x, node.y, r, 0, Math.PI * 2);
    ctx.fillStyle = node.read ? '#10b981' : '#f59e0b';
    ctx.shadowBlur = 15;
    ctx.shadowColor = ctx.fillStyle;
    ctx.fill();
    ctx.closePath();
    ctx.shadowBlur = 0;

    // Pulse ring
    if (!node.read) {
      ctx.beginPath();
      ctx.arc(node.x, node.y, r + 6 + Math.sin(Date.now() / 200) * 4, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(245, 158, 11, 0.4)';
      ctx.lineWidth = 2;
      ctx.stroke();
    }

    // Label
    ctx.fillStyle = '#fff';
    ctx.font = '12px Inter';
    ctx.textAlign = 'center';
    let label = node.title.replace(/<[^>]*>/g, '');
    if (label.length > 22) label = label.substring(0, 22) + '…';
    ctx.fillText(label, node.x, node.y + 38);
  });
}

function drawDoor() {
  const d = levels[currentLevelIdx].door;
  ctx.fillStyle = d.open ? '#10b981' : '#f43f5e';
  ctx.shadowBlur = 20;
  ctx.shadowColor = ctx.fillStyle;
  ctx.beginPath();
  ctx.fillRect(d.x, d.y, d.width, d.height);
  ctx.fill();
  ctx.shadowBlur = 0;

  ctx.fillStyle = '#fff';
  ctx.font = 'bold 11px Inter';
  ctx.textAlign = 'center';
  ctx.fillText(d.open ? '▲ PUERTA ABIERTA ▲' : '🔒 BLOQUEADA', d.x + d.width / 2, d.y + d.height + 18);
}

function drawRoomFragments() {
  const nextFragment = roomFragments.findIndex(f => !f.collected);
  roomFragments.forEach((f, i) => {
    if (f.collected || i !== nextFragment) return;
    if (f.behavior === BH.BLINK && !f.visible) return;

    const r = 10;
    const pulseR = r + 4 + Math.sin(Date.now() / 150 + i) * 3;

    // Glow
    ctx.beginPath();
    ctx.arc(f.x, f.y, pulseR + 8, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(245, 158, 11, 0.08)';
    ctx.fill();

    // Outer ring
    ctx.beginPath();
    ctx.arc(f.x, f.y, pulseR, 0, Math.PI * 2);
    ctx.strokeStyle = 'rgba(245, 158, 11, 0.5)';
    ctx.lineWidth = 1.5;
    ctx.stroke();

    // Core orb
    ctx.beginPath();
    ctx.arc(f.x, f.y, r, 0, Math.PI * 2);
    ctx.fillStyle = '#f59e0b';
    ctx.shadowBlur = 12;
    ctx.shadowColor = '#f59e0b';
    ctx.fill();
    ctx.shadowBlur = 0;

    // Number label
    ctx.fillStyle = '#000';
    ctx.font = 'bold 10px Inter';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(`${i + 1}`, f.x, f.y);
    ctx.textBaseline = 'alphabetic';
  });
}

function isRoomExitUnlocked() {
  if (activeNode?.isChaos) return true;
  return roomFragments.length > 0 ? roomFragments.every(f => f.collected) : Boolean(activeNode?.read);
}

function drawRoomPortal() {
  const allDone = isRoomExitUnlocked();
  const px = cw * 0.75, py = ch - 60;

  // Portal circle
  const t = Date.now() / 500;
  ctx.save();

  if (allDone) {
    // Spinning rings
    for (let i = 0; i < 3; i++) {
      ctx.beginPath();
      ctx.arc(px, py, 28 + i * 8, t + i * 0.5, t + i * 0.5 + Math.PI * 1.5);
      ctx.strokeStyle = `rgba(16, 185, 129, ${0.6 - i * 0.15})`;
      ctx.lineWidth = 3;
      ctx.stroke();
    }
    ctx.beginPath();
    ctx.arc(px, py, 25, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(16, 185, 129, 0.3)';
    ctx.shadowBlur = 30;
    ctx.shadowColor = '#10b981';
    ctx.fill();
  } else {
    ctx.beginPath();
    ctx.arc(px, py, 25, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(244, 63, 94, 0.15)';
    ctx.fill();
    ctx.strokeStyle = 'rgba(244, 63, 94, 0.3)';
    ctx.lineWidth = 2;
    ctx.stroke();
  }
  ctx.shadowBlur = 0;
  ctx.restore();

  // Label
  ctx.fillStyle = '#fff';
  ctx.font = 'bold 11px Inter';
  ctx.textAlign = 'center';
  ctx.fillText(allDone ? '🌀 PORTAL DE SALIDA' : '🔒 BLOQUEADO', px, py - 42);
}

function drawParticles() {
  for (let i = particles.length - 1; i >= 0; i--) {
    const p = particles[i];
    p.x += p.vx;
    p.y += p.vy;
    p.vx *= 0.96;
    p.vy *= 0.96;
    p.life -= 0.025;
    if (p.life <= 0) { particles.splice(i, 1); continue; }

    ctx.globalAlpha = p.life;
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.size * p.life, 0, Math.PI * 2);
    ctx.fillStyle = p.color;
    ctx.fill();
  }
  ctx.globalAlpha = 1;
}

function drawWarp() {
  const progress = warpProgress;
  const brightness = Math.sin(progress * Math.PI);

  // White flash
  ctx.fillStyle = `rgba(255, 255, 255, ${brightness * 0.8})`;
  ctx.fillRect(0, 0, cw, ch);

  // Spinning shrinking player
  ctx.save();
  ctx.translate(player.x, player.y);
  ctx.rotate(progress * Math.PI * 6);
  const scale = gameState === STATE.WARP_IN ? 1 - progress : progress;
  ctx.scale(scale, scale);
  ctx.fillStyle = player.color;
  ctx.shadowBlur = 40;
  ctx.shadowColor = '#67e8f9';
  ctx.fillRect(-player.size / 2, -player.size / 2, player.size, player.size);
  ctx.shadowBlur = 0;
  ctx.restore();

  // Concentric rings
  for (let i = 0; i < 4; i++) {
    ctx.beginPath();
    ctx.arc(player.x, player.y, progress * 200 + i * 30, 0, Math.PI * 2);
    ctx.strokeStyle = `rgba(99, 102, 241, ${(1 - progress) * 0.4})`;
    ctx.lineWidth = 2;
    ctx.stroke();
  }
}

// =====================================================================
//  UPDATE
// =====================================================================

function update() {
  // Warp transitions
  if (gameState === STATE.WARP_IN || gameState === STATE.WARP_OUT) {
    warpProgress += 0.035;
    if (warpProgress >= 1) {
      warpProgress = 0;
      if (gameState === STATE.WARP_IN) {
        gameState = STATE.ROOM;
        setupRoom();
      } else {
        // Return to hub
        gameState = STATE.HUB;
        hubEntryCooldownUntil = Date.now() + 1000;
        hubNodeBlocked = activeNode;
        player.x = savedPos.x;
        player.y = savedPos.y + 30;
        document.getElementById('room-ui').classList.add('hidden');
        document.getElementById('hub-ui').classList.remove('hidden');
        if (activeNode && activeNode.isChaos) {
          document.getElementById('terminal-content').innerHTML = '';
        }
        updateHubUI();
        activeNode = null;
      }
    }
    return;
  }

  // Movement (shared between hub & room)
  if (keys['w'] || keys['arrowup']) player.y -= player.speed;
  if (keys['s'] || keys['arrowdown']) player.y += player.speed;
  if (keys['a'] || keys['arrowleft']) player.x -= player.speed;
  if (keys['d'] || keys['arrowright']) player.x += player.speed;

  // === HUB MODE ===
  if (gameState === STATE.HUB) {
    const hs = player.size / 2;
    player.x = Math.max(hs, Math.min(cw - hs, player.x));
    player.y = Math.max(hs, Math.min(ch - hs, player.y));

    const lvl = levels[currentLevelIdx];
    const nodes = getLevelNodes();

    // Node collision → enter room
    nodes.forEach((node, idx) => {
      const dist = Math.hypot(player.x - node.x, player.y - node.y);
      if (Date.now() < hubEntryCooldownUntil) return;
      if (lvl.nodes[idx] === hubNodeBlocked) {
        if (dist < 22 + hs) return;
        hubNodeBlocked = null;
      }
      if (dist < 22 + hs) {
        spawnParticles(player.x, player.y, '#06b6d4', 8);
        enterRoom(lvl.nodes[idx]);
      }
    });

    // Door collision
    const d = lvl.door;
    if (d.open && player.x > d.x - 10 && player.x < d.x + d.width + 10 &&
        player.y > d.y - 10 && player.y < d.y + d.height + player.size) {
      if (currentLevelIdx < levels.length - 1) {
        currentLevelIdx++;
        player.x = cw / 2;
        player.y = ch - 120;
        updateHubUI();
      } else {
        // Win!
        activeNode = { title: '🏆 ¡Felicidades!', read: false, content: '<h3>Has completado la Guía Interactiva</h3><p>Ahora dominas los diferentes <strong>Modelos Arquitectónicos de Software</strong>.</p><p>Puedes volver a explorar cualquier nivel para repasar la información. ¡Bien hecho!</p>' };
        savedPos = { x: player.x, y: player.y };
        gameState = STATE.WARP_IN;
        warpProgress = 0;
        contentChunks = splitContent(activeNode.content);
        revealedChunks = 0;
      }
    }
  }

  // === ROOM MODE ===
  else if (gameState === STATE.ROOM) {
    const minX = cw * 0.46 + player.size / 2;
    const maxX = cw - player.size / 2;
    player.x = Math.max(minX, Math.min(maxX, player.x));
    player.y = Math.max(player.size / 2, Math.min(ch - player.size / 2, player.y));

    // Update fragment positions
    const nextFragment = roomFragments.findIndex(f => !f.collected);
    if (nextFragment !== -1) updateFragment(roomFragments[nextFragment], nextFragment);

    // Fragment collection
    roomFragments.forEach((f, i) => {
      if (f.collected || i !== nextFragment) return;
      if (f.behavior === BH.BLINK && !f.visible) return;
      const dist = Math.hypot(player.x - f.x, player.y - f.y);
      if (dist < 30 + player.size / 2) {
        collectFragment(i);
      }
    });

    // Portal collision
    const portalX = cw * 0.75, portalY = ch - 60;
    const allDone = isRoomExitUnlocked();
    if (allDone && Math.hypot(player.x - portalX, player.y - portalY) < 30 + player.size / 2) {
      if (activeNode && !activeNode.read) activeNode.read = true;
      gameState = STATE.WARP_OUT;
      warpProgress = 0;
      spawnParticles(player.x, player.y, '#10b981', 16);
    }
  }
}

// =====================================================================
//  GAME LOOP
// =====================================================================

function loop() {
  ctx.clearRect(0, 0, cw, ch);

  if (gameState === STATE.HUB) {
    drawGrid('rgba(99, 102, 241, 0.06)');
    drawDoor();
    drawHubNodes(getLevelNodes());
    drawPlayer();
  } else if (gameState === STATE.ROOM) {
    drawGrid('rgba(6, 182, 212, 0.06)');
    drawRoomFragments();
    drawRoomPortal();
    drawPlayer();
  }

  // Warp effect on top
  if (gameState === STATE.WARP_IN || gameState === STATE.WARP_OUT) {
    drawWarp();
  }

  drawParticles();
  update();
  requestAnimationFrame(loop);
}

// =====================================================================
//  INIT
// =====================================================================
updateHubUI();
loop();
