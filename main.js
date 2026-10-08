import { initChaos } from './chaos.js';

// ---- GAME DATA (Text from original page) ----
const modelsData = {
  microservicios: {
    icon: '🔷', name: 'Arquitectura de Microservicios', subtitle: 'Microservices Architecture',
    description: 'Patrón arquitectónico que estructura una aplicación como un conjunto de servicios pequeños, autónomos y desplegables de forma independiente. Cada servicio se ejecuta en su propio proceso, se comunica mediante protocolos ligeros (HTTP/REST, gRPC, mensajería) y está organizado en torno a una capacidad de negocio específica.',
    visualizar: {
      text: 'Los microservicios permiten diagramar el sistema como una constelación de servicios interconectados, donde cada nodo representa un servicio independiente con su propia base de datos y API.',
      points: [
        'Diagramas de topología de servicios que muestran cada microservicio como un nodo independiente',
        'Mapas de comunicación inter-servicio (síncrona vía REST/gRPC y asíncrona vía eventos)',
        'Vistas de despliegue mostrando contenedores Docker, pods de Kubernetes y balanceadores de carga',
        'Diagramas C4 (Contexto, Contenedores, Componentes, Código) para zoom progresivo en la arquitectura',
        'Flujos de datos entre servicios con indicación de protocolos y formatos (JSON, Protobuf, Avro)'
      ],
      diagram: 'microservices'
    },
    planificar: {
      text: 'Facilita la planificación al permitir que equipos independientes trabajen en paralelo sobre servicios distintos, con sprints desacoplados y estimaciones más precisas por bounded context.',
      points: [
        'Cada equipo (squad) puede planificar sprints independientes para su servicio',
        'Estimación granular: cada microservicio es un artefacto de complejidad acotada',
        'Mitigación de riesgos: fallos en un servicio no afectan al sistema completo (bulkhead pattern)',
        'Escalabilidad selectiva: escalar solo los servicios que reciben más tráfico',
        'Estrategias de deploy independientes: canary releases, blue-green, feature flags por servicio',
        'Decisiones tecnológicas por servicio: cada equipo elige su stack según el problema'
      ]
    },
    comunicar: {
      text: 'Actúa como lenguaje universal donde cada servicio se traduce en un contrato (API contract), permitiendo que desarrolladores, PMs y stakeholders hablen sobre "el servicio de pagos" o "el servicio de usuarios" como entidades claras.',
      points: [
        'Contratos API (OpenAPI/Swagger) como documentación viva entre equipos',
        'Bounded contexts del DDD como vocabulario compartido (lenguaje ubicuo)',
        'Service catalog (ej. Backstage) donde todos pueden descubrir y entender cada servicio',
        'ADRs (Architecture Decision Records) por servicio para rastrear decisiones',
        'Dashboards de observabilidad (Grafana, Datadog) como "radiadores de información"'
      ]
    },
    pros: [
      'Despliegue independiente — cada servicio se versiona y despliega por separado',
      'Escalabilidad granular — escalar solo lo que necesita más recursos',
      'Resiliencia — aislamiento de fallos mediante circuit breakers y bulkheads',
      'Flexibilidad tecnológica — cada servicio puede usar el stack más adecuado',
      'Equipos autónomos — ownership claro y reducción de dependencias organizacionales',
      'Facilita CI/CD — pipelines más rápidos y enfocados por servicio'
    ],
    cons: [
      'Complejidad operacional alta — requiere orquestación, monitoreo distribuido y service mesh',
      'Latencia de red — llamadas inter-servicio añaden latencia vs. llamadas en proceso',
      'Consistencia eventual — transacciones distribuidas son inherentemente más complejas (Saga pattern)',
      'Overhead de infraestructura — cada servicio necesita su pipeline, monitoreo y logging',
      'Testing de integración complejo — requiere contract testing y entornos de staging',
      'Curva de aprendizaje empinada — el equipo debe dominar DevOps, containers y orquestación'
    ],
    caseStudy: {
      company: 'Netflix',
      description: 'Netflix migró de una arquitectura monolítica a microservicios entre 2008-2012 para soportar su crecimiento explosivo. Hoy opera más de 1,000 microservicios que manejan 250+ millones de suscriptores, procesando miles de millones de requests diarias. Cada servicio se despliega cientos de veces por día. Su plataforma de streaming separa servicios como recomendaciones (ML), catálogo, codificación de video, autenticación y billing en microservicios independientes, usando herramientas propias como Zuul (API Gateway), Eureka (service discovery) y Hystrix (circuit breaker).'
    }
  },
  capas: {
    icon: '📚', name: 'Arquitectura en Capas (Layered)', subtitle: 'Layered / N-Tier Architecture',
    description: 'Modelo que organiza el sistema en capas horizontales de responsabilidad, donde cada capa proporciona servicios a la capa superior y consume servicios de la capa inferior. Típicamente incluye: Presentación, Lógica de Negocio, Acceso a Datos y Base de Datos. Es el patrón más tradicional y ampliamente enseñado en la ingeniería de software.',
    visualizar: {
      text: 'Se representa como una pila vertical (stack) donde cada capa descansa sobre la anterior, con flechas unidireccionales de arriba hacia abajo indicando la dirección de dependencia.',
      points: [
        'Diagrama de pila vertical con 3-4 capas claramente separadas por líneas horizontales',
        'Flechas de dependencia unidireccionales: Presentación → Negocio → Datos → BD',
        'Cada capa como una "caja" con sus responsabilidades listadas internamente',
        'Colores diferenciados por capa para identificación visual rápida',
        'Interfaces entre capas claramente definidas (contratos de servicio)'
      ],
      diagram: 'layered'
    },
    planificar: {
      text: 'Facilita la planificación al dividir el trabajo en capas especializadas, permitiendo que equipos front-end, back-end y de base de datos trabajen con interfaces claras entre sí.',
      points: [
        'División natural del trabajo: un equipo por capa (UI, lógica, datos)',
        'Estimaciones predecibles basadas en cambios por capa afectada',
        'Riesgos acotados: cambios en una capa tienen impacto limitado en las demás',
        'Reutilización de la capa de negocio para múltiples interfaces (web, mobile, API)',
        'Testing por capas: unit tests en negocio, integration en datos, E2E en presentación',
        'Escalabilidad limitada pero predecible (scale-up del tier de aplicación)'
      ]
    },
    comunicar: {
      text: 'Es el modelo más intuitivo para comunicar la estructura de un sistema a audiencias no técnicas, ya que la metáfora de "capas" es universalmente comprendida.',
      points: [
        'Metáfora visual universal: todos entienden el concepto de "capas apiladas"',
        'Ideal para onboarding de developers junior — el primer patrón que se aprende',
        'Facilita la discusión de cambios: "este feature afecta la capa de presentación y negocio"',
        'Documentación clara de responsabilidades por capa',
        'Alineación natural con roles del equipo (frontend dev, backend dev, DBA)'
      ]
    },
    pros: [
      'Simplicidad conceptual — fácil de entender, implementar y mantener',
      'Separación de concerns — cada capa tiene responsabilidades bien definidas',
      'Facilidad de testing — cada capa puede probarse de forma aislada',
      'Amplio soporte en frameworks — Spring MVC, ASP.NET MVC, Django siguen este patrón',
      'Ideal para MVPs y proyectos medianos con equipos pequeños',
      'Curva de aprendizaje suave — patrón más enseñado y documentado'
    ],
    cons: [
      'Escalabilidad limitada — se escala toda la aplicación, no componentes individuales',
      'Monolito disfrazado — puede derivar en acoplamiento fuerte entre capas',
      'Performance — cada request atraviesa todas las capas (incluso si no todas son necesarias)',
      'Rigidez ante cambios transversales (cross-cutting concerns)',
      'Despliegue monolítico — un cambio en cualquier capa requiere redespliegue completo',
      'Tendencia al "sinkhole anti-pattern" (capas que solo pasan datos sin agregar valor)'
    ],
    caseStudy: {
      company: 'Sistemas Bancarios Tradicionales (ej. BBVA, Wells Fargo)',
      description: 'La mayoría de los core banking systems utilizan arquitectura en capas: una capa de presentación (banca online/mobile), una capa de servicios de negocio (motor de reglas financieras, cálculo de intereses, compliance/KYC), una capa de acceso a datos (ORM/stored procedures) y la base de datos relacional (Oracle, DB2). Estos sistemas priorizan la consistencia transaccional (ACID) sobre la escalabilidad horizontal, procesando millones de transacciones diarias con integridad garantizada. Aunque muchos bancos están migrando gradualmente a microservicios, sus core systems siguen siendo layered por confiabilidad.'
    }
  },
  eventos: {
    icon: '⚡', name: 'Arquitectura Basada en Eventos (Event-Driven)', subtitle: 'Event-Driven Architecture (EDA)',
    description: 'Modelo en el que los componentes del sistema se comunican produciendo y consumiendo eventos de forma asincrónica. Los eventos representan cambios de estado significativos ("OrderCreated", "PaymentProcessed") y fluyen a través de un broker de mensajes (Kafka, RabbitMQ, SNS/SQS). Los componentes están desacoplados: los productores no conocen a los consumidores.',
    visualizar: {
      text: 'Se diagrama como un flujo de eventos entre productores y consumidores, con un message broker central actuando como canal de distribución.',
      points: [
        'Diagrama de flujo de eventos con productores (publishers) a la izquierda y consumidores (subscribers) a la derecha',
        'Event broker central (Kafka, RabbitMQ) como hub de distribución de eventos',
        'Líneas de flujo asíncronas (punteadas) para diferenciar de llamadas síncronas',
        'Event storming boards para modelar el dominio (técnica colaborativa visual)',
        'Topologías: Broker topology vs. Mediator topology claramente diferenciadas',
        'Líneas de tiempo (timelines) que muestran la secuencia de eventos en un flujo de negocio'
      ],
      diagram: 'event-driven'
    },
    planificar: {
      text: 'Permite planificar sistemas altamente reactivos y tolerantes a fallos, donde los equipos definen sus eventos como contratos y pueden evolucionar sus consumidores sin afectar a los productores.',
      points: [
        'Desacoplamiento temporal: productores y consumidores no necesitan estar activos simultáneamente',
        'Planificación por dominio de eventos: cada equipo es dueño de sus eventos publicados',
        'Escalabilidad natural: agregar consumidores no requiere modificar productores',
        'Resiliencia incorporada: las colas persisten eventos si un consumidor cae',
        'Event versioning para evolución controlada de contratos entre equipos',
        'Idempotencia como principio de diseño para manejar reintentos'
      ]
    },
    comunicar: {
      text: 'Los eventos actúan como un "diario de sucesos" del sistema que todos los stakeholders pueden entender: "cuando un pedido se crea, se dispara el cobro, se notifica al almacén y se envía confirmación".',
      points: [
        'Event Storming como técnica de workshop colaborativa entre técnicos y negocio',
        'Los nombres de eventos son auto-descriptivos (OrderPlaced, PaymentConfirmed)',
        'Event catalog como documentación viva de todos los eventos del sistema',
        'Flujos de negocio expresados como cadenas de eventos comprensibles',
        'Trazabilidad completa: cada evento deja un registro auditable del comportamiento del sistema'
      ]
    },
    pros: [
      'Desacoplamiento extremo — productores y consumidores no se conocen entre sí',
      'Escalabilidad horizontal — agregar consumidores sin modificar el sistema existente',
      'Procesamiento en tiempo real — reacción inmediata a cambios de estado',
      'Resiliencia natural — colas persisten eventos ante fallos de consumidores',
      'Auditoría completa — event sourcing permite reconstruir el estado desde los eventos',
      'Ideal para CQRS (Command Query Responsibility Segregation)'
    ],
    cons: [
      'Complejidad de debugging — rastrear un flujo a través de múltiples eventos es difícil',
      'Consistencia eventual — no hay garantía de orden estricto en todos los casos',
      'Error handling complejo — dead letter queues, retries y compensaciones',
      'Infraestructura adicional — requiere brokers (Kafka/RabbitMQ), monitoreo de colas',
      'Testabilidad desafiante — simular flujos de eventos completos es laborioso',
      'Riesgo de "event soup" — proliferación descontrolada de tipos de eventos'
    ],
    caseStudy: {
      company: 'Uber',
      description: 'Uber utiliza arquitectura basada en eventos masivamente para su sistema de pricing dinámico (surge pricing). Cuando la demanda de viajes aumenta en una zona, sensores de eventos detectan el incremento, disparan un cálculo de precio dinámico, notifican a conductores cercanos, actualizan la UI del rider y registran métricas — todo a través de Apache Kafka procesando trillones de mensajes diarios. Su plataforma de eventos maneja 1+ PB de datos por día. Los eventos permiten que decenas de servicios downstream reaccionen a un solo hecho (ej. "RideRequested") sin acoplamiento directo.'
    }
  },
  'cliente-servidor': {
    icon: '🖥️', name: 'Arquitectura Cliente-Servidor', subtitle: 'Client-Server Architecture',
    description: 'Modelo fundamental donde la aplicación se divide en dos roles: el cliente (que solicita recursos o servicios) y el servidor (que los provee). El cliente presenta la interfaz al usuario y envía peticiones; el servidor procesa la lógica, accede a datos y devuelve respuestas. Es la base de la web moderna (HTTP request-response), APIs REST, y aplicaciones de base de datos.',
    visualizar: {
      text: 'Se representa con dos bloques principales conectados por una línea de comunicación (red), con el protocolo de comunicación claramente indicado entre ambos.',
      points: [
        'Diagrama simple de dos bloques: Cliente (browser/app) y Servidor (backend/API)',
        'Flechas bidireccionales indicando request → y ← response',
        'Protocolos de comunicación etiquetados (HTTP/HTTPS, WebSocket, gRPC)',
        'Variante multi-tier: cliente → servidor de aplicación → servidor de base de datos',
        'Diagrama de secuencia para flujos request-response detallados',
        'Topología de clientes múltiples conectados a un servidor centralizado'
      ],
      diagram: 'client-server'
    },
    planificar: {
      text: 'Facilita la planificación al separar claramente las responsabilidades del equipo frontend (cliente) y backend (servidor), con la API como contrato entre ambos.',
      points: [
        'División clara de equipos: frontend team y backend team con responsabilidades definidas',
        'API contract como punto de integración — se puede definir antes de implementar',
        'Sprints paralelos: frontend y backend pueden trabajar simultáneamente con mocks',
        'Estimación separada para lógica de presentación vs. lógica de negocio',
        'Escalabilidad del servidor mediante load balancing y réplicas',
        'Testing: frontend (E2E, component tests) y backend (unit, integration) por separado'
      ]
    },
    comunicar: {
      text: 'Es el modelo más intuitivo para cualquier persona que haya usado un navegador web. La metáfora "yo pido, el servidor me responde" es universalmente comprendida.',
      points: [
        'Metáfora natural: "el navegador pide una página y el servidor la entrega"',
        'Documentación de API (Swagger/OpenAPI) como contrato legible por todos',
        'Ideal para explicar flujos web a stakeholders no técnicos',
        'Separación de UX (diseñadores trabajan en el cliente) y lógica (devs en el servidor)',
        'Postman collections como demos interactivas de la API para QA y PMs'
      ]
    },
    pros: [
      'Simplicidad conceptual — modelo más intuitivo y ampliamente comprendido',
      'Separación clara — frontend y backend son proyectos independientes',
      'Centralización de datos — el servidor es la fuente de verdad (single source of truth)',
      'Seguridad — la lógica sensible vive en el servidor, fuera del alcance del cliente',
      'Reutilización — un mismo servidor sirve múltiples clientes (web, mobile, IoT)',
      'Ecosistema maduro — HTTP, REST, GraphQL, WebSocket son estándares probados'
    ],
    cons: [
      'Punto único de fallo — si el servidor cae, todos los clientes se afectan',
      'Cuello de botella — todo el tráfico converge en el servidor centralizado',
      'Latencia de red — cada operación requiere un round-trip al servidor',
      'Escalabilidad limitada — escalar el servidor requiere load balancers y réplicas',
      'Dependencia de conexión — el cliente generalmente no funciona offline',
      'Sobrecarga del servidor — en escenarios de alto tráfico requiere optimización agresiva'
    ],
    caseStudy: {
      company: 'Aplicaciones Web Clásicas (ej. WordPress, Shopify storefronts)',
      description: 'El modelo cliente-servidor es la base de toda la World Wide Web. Cuando un usuario accede a una tienda Shopify, su navegador (cliente) envía un HTTP request al servidor de Shopify, que procesa la petición, consulta la base de datos de productos, renderiza el HTML y devuelve la respuesta. Millones de sitios WordPress operan bajo este mismo principio: el browser solicita, Apache/Nginx + PHP procesan, MySQL almacena. APIs REST como la de Twitter/X, GitHub o Stripe son implementaciones puras de cliente-servidor donde apps móviles o frontends JS actúan como clientes consumiendo endpoints del servidor.'
    }
  },
  hexagonal: {
    icon: '⬡', name: 'Arquitectura Hexagonal (Ports & Adapters)', subtitle: 'Hexagonal / Ports & Adapters / Clean Architecture',
    description: 'Modelo propuesto por Alistair Cockburn que separa la lógica de negocio (dominio) de los detalles técnicos (frameworks, bases de datos, APIs externas) mediante "puertos" (interfaces) y "adaptadores" (implementaciones). El dominio está en el centro y es completamente agnóstico a la infraestructura. Es la base conceptual de Clean Architecture (Robert C. Martin) y Onion Architecture.',
    visualizar: {
      text: 'Se representa como un hexágono con el dominio en el centro, puertos en los bordes y adaptadores en el exterior, diferenciando entre "driving" (entrada) y "driven" (salida).',
      points: [
        'Hexágono central representando el dominio/lógica de negocio pura',
        'Puertos (interfaces) en los bordes del hexágono — contratos que el dominio expone o requiere',
        'Adaptadores externos divididos en: Driving (entrada: REST controller, CLI, UI) y Driven (salida: BD, API externa, email)',
        'Flechas de dependencia siempre apuntando hacia el centro (Dependency Inversion)',
        'Anillos concéntricos para Clean Architecture (Entities → Use Cases → Adapters → Frameworks)',
        'Colores diferenciados: dominio (centro, color intenso), puertos (borde), adaptadores (exterior, color suave)'
      ],
      diagram: 'hexagonal'
    },
    planificar: {
      text: 'Permite planificar el desarrollo empezando por la lógica de negocio (inside-out), posponiendo decisiones de infraestructura y reduciendo riesgos técnicos tempranos.',
      points: [
        'Desarrollo inside-out: primero la lógica de negocio, luego la infraestructura',
        'Decisiones de framework/BD pospuestas — se pueden cambiar sin afectar el dominio',
        'Testing del dominio sin dependencias externas (100% unit testable con mocks)',
        'Múltiples adaptadores de entrada permiten soportar nuevos canales sin reescribir lógica',
        'Riesgos de vendor lock-in mitigados: cambiar de PostgreSQL a MongoDB solo requiere nuevo adaptador',
        'Estimación más precisa: la complejidad del dominio es independiente de la infraestructura'
      ]
    },
    comunicar: {
      text: 'Comunica de forma visual y clara la separación entre "lo que el sistema HACE" (dominio) y "CÓMO lo hace" (infraestructura), facilitando conversaciones sobre reglas de negocio sin ruido técnico.',
      points: [
        'Vocabulario claro: "puerto", "adaptador", "dominio" son conceptos comprensibles',
        'Alineación natural con DDD (Domain-Driven Design): bounded contexts y aggregates',
        'Facilita la discusión de reglas de negocio aisladas de detalles técnicos',
        'ADRs claros: "cambiamos el adaptador de PostgreSQL a MongoDB, el dominio no se toca"',
        'Onboarding enfocado: nuevos devs pueden aprender el dominio sin conocer la infraestructura'
      ]
    },
    pros: [
      'Independencia del framework — el dominio no depende de ninguna tecnología específica',
      'Testabilidad excepcional — el dominio se testea al 100% sin BD, API ni framework',
      'Flexibilidad — cambiar base de datos, framework web o servicio externo es plug-and-play',
      'Lógica de negocio protegida — las reglas del dominio no se contaminan con detalles técnicos',
      'Ideal para Domain-Driven Design (DDD) — alinea arquitectura con el modelo de dominio',
      'Múltiples puntos de entrada — soporta REST, GraphQL, CLI, eventos sin duplicar lógica'
    ],
    cons: [
      'Complejidad estructural — más capas, interfaces y clases que una arquitectura simple',
      'Over-engineering para proyectos pequeños — demasiada ceremonia para CRUDs simples',
      'Curva de aprendizaje — requiere dominar inversión de dependencias y patrones DDD',
      'Más código boilerplate — interfaces, DTOs, mappers entre capas',
      'Disciplina constante — sin governance, los equipos tienden a "romper" las reglas de dependencia',
      'Dificultad para definir los límites del dominio en sistemas ambiguos'
    ],
    caseStudy: {
      company: 'Sistemas Fintech (ej. Nubank, Stripe)',
      description: 'Nubank, el banco digital más grande de Latinoamérica (+80M clientes), utiliza arquitectura hexagonal con Clojure como lenguaje principal. Su dominio financiero (cálculos de crédito, antifraude, compliance) está completamente aislado de la infraestructura. Esto les permite ejecutar miles de tests del dominio en segundos sin levantar bases de datos ni servicios externos. Pueden cambiar proveedores de pago, sistemas de scoring crediticio o bases de datos sin modificar una sola línea de lógica de negocio. Stripe también emplea principios similares: su motor de procesamiento de pagos es agnóstico al protocolo de entrada (API REST, SDKs, Webhooks).'
    }
  }
};

const categoryData = {
  monolitica: { title: '🧱 Arquitectura Monolítica', content: `<p>Una <strong>aplicación monolítica</strong> contiene todos sus componentes (UI, negocio, datos) en una sola unidad.</p><ul><li><strong>Ventajas:</strong> Simple de desarrollar, testear y desplegar inicialmente.</li><li><strong>Desventajas:</strong> Difícil de escalar y mantener.</li></ul><p><strong>Ejemplos Reales:</strong></p><ul><li>1. Shopify (Originalmente un gran monolito Ruby on Rails)</li><li>2. Stack Overflow (Monolito .NET C#)</li><li>3. Basecamp (Monolito Rails clásico)</li><li>4. Etsy (Antes de su transición a microservicios)</li><li>5. Moodle (LMS tradicional PHP)</li></ul>` },
  cs: { title: '🖥️ Cliente-Servidor', content: `<p>El modelo <strong>Cliente-Servidor</strong> distribuye tareas entre proveedores de recursos (servidores) y demandantes (clientes).</p><ul><li><strong>Ventajas:</strong> Centralización del control y seguridad.</li><li><strong>Desventajas:</strong> El servidor es un punto único de fallo (SPOF).</li></ul><p><strong>Ejemplos Reales:</strong></p><ul><li>1. Sistemas de Correo Electrónico (SMTP/IMAP)</li><li>2. Navegación Web Tradicional (HTTP Requests a Servidor Apache)</li><li>3. Juegos multijugador online centralizados (WoW Server)</li><li>4. Aplicaciones FTP (FileZilla)</li><li>5. Bases de Datos Remotas (MySQL Server conectado desde un cliente)</li></ul>` },
  capas: { title: '📚 Arquitectura en Capas', content: `<p>Organización del sistema en <strong>capas horizontales</strong> (Presentación, Negocio, Datos).</p><ul><li><strong>Ventajas:</strong> Separación de responsabilidades clara.</li><li><strong>Desventajas:</strong> Escalabilidad monolítica y acumulación de latencia.</li></ul><p><strong>Ejemplos Reales:</strong></p><ul><li>1. Aplicaciones empresariales Spring Boot (Controller-Service-Repository)</li><li>2. Desarrollo tradicional ASP.NET MVC</li><li>3. Sistemas legacy bancarios y ERPs</li><li>4. Aplicaciones Django MTV (Model-Template-View)</li><li>5. Arquitectura TCP/IP y Modelo OSI en redes</li></ul>` },
  eventos: { title: '⚡ Basada en Eventos', content: `<p>Componentes que se comunican produciendo y consumiendo <strong>eventos asíncronos</strong> a través de un broker.</p><ul><li><strong>Ventajas:</strong> Desacoplamiento extremo y procesamiento reactivo.</li><li><strong>Desventajas:</strong> Debugging complejo y consistencia eventual.</li></ul><p><strong>Ejemplos Reales:</strong></p><ul><li>1. Plataforma de viajes Uber (asignación de viajes)</li><li>2. LinkedIn (Pipeline de datos y métricas con Apache Kafka)</li><li>3. Sistemas de Trading en Bolsa de Valores de Nueva York</li><li>4. Procesamiento de pagos de Stripe (Webhooks)</li><li>5. IoT (Sensores de hogar inteligente enviando datos)</li></ul>` },
  microservicios: { title: '🔷 Arquitectura de Microservicios', content: `<p>Conjunto de <strong>servicios pequeños y autónomos</strong> comunicándose por protocolos ligeros.</p><ul><li><strong>Ventajas:</strong> Despliegue independiente, aislamiento de fallos (Bulkhead).</li><li><strong>Desventajas:</strong> Alta complejidad operativa y de infraestructura.</li></ul><p><strong>Ejemplos Reales:</strong></p><ul><li>1. Netflix (Pioneros, más de 1000 microservicios activos)</li><li>2. Amazon (Migración histórica desde su monolito obelisco)</li><li>3. Spotify (Servicios divididos por funcionalidades como playlists, artistas)</li><li>4. Uber (Servicios de facturación, mapas, notificaciones separados)</li><li>5. SoundCloud (Arquitectura BFF: Backend For Frontend)</li></ul>` },
  hexagonal: { title: '💠 Arquitectura Hexagonal', content: `<p>Aísla el <strong>núcleo de dominio</strong> mediante Puertos y Adaptadores (Clean Architecture).</p><ul><li><strong>Ventajas:</strong> Alta testeabilidad, agnóstica de frameworks o bases de datos.</li><li><strong>Desventajas:</strong> Curva de aprendizaje y verbosidad en el código.</li></ul><p><strong>Ejemplos Reales:</strong></p><ul><li>1. Sistemas financieros modernos de alta criticidad (Fintechs)</li><li>2. Microservicios internos de Netflix (Domain-Driven Design)</li><li>3. Software de facturación electrónica</li><li>4. Motores de reglas de negocio complejos</li><li>5. Sistemas de reservas aéreas (donde la lógica es inmutable, y los conectores web cambian)</li></ul>` }
};

function modelToHtml(model) {
  let html = `<h3>${model.icon} ${model.name}</h3><p><em>${model.subtitle}</em></p><p>${model.description}</p>`;
  html += `<h4>Visualizar</h4><p>${model.visualizar.text}</p><ul>${model.visualizar.points.map(p => `<li>${p}</li>`).join('')}</ul>`;
  html += `<h4>Planificar</h4><p>${model.planificar.text}</p><ul>${model.planificar.points.map(p => `<li>${p}</li>`).join('')}</ul>`;
  html += `<h4>Comunicar</h4><p>${model.comunicar.text}</p><ul>${model.comunicar.points.map(p => `<li>${p}</li>`).join('')}</ul>`;
  html += `<h4>Pros</h4><ul>${model.pros.map(p => `<li>${p}</li>`).join('')}</ul>`;
  html += `<h4>Contras</h4><ul>${model.cons.map(p => `<li>${p}</li>`).join('')}</ul>`;
  html += `<h4>Caso de Estudio: ${model.caseStudy.company}</h4><p>${model.caseStudy.description}</p>`;
  return html;
}

// ---- GAME LOGIC ----
const STATE_HUB = 0;
const STATE_TRANSITION_IN = 1;
const STATE_ROOM = 2;
const STATE_TRANSITION_OUT = 3;

const canvas = document.getElementById('game-canvas');
const ctx = canvas.getContext('2d');

let cw, ch;
let gameState = STATE_HUB;
let activeNode = null;
let transitionProgress = 0;
let savedPlayerPos = { x: 0, y: 0 };
let roomFragments = [];

function resize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  cw = canvas.width;
  ch = canvas.height;
  
  levels.forEach(lvl => {
    lvl.door = { x: cw / 2 - 60, y: 30, width: 120, height: 30, open: false };
  });
}

let currentLevelIdx = 0;
let keys = {};

const player = {
  size: 30,
  speed: 7,
  color: '#06b6d4',
  glow: '#67e8f9',
  x: 0,
  y: 0
};

window.addEventListener('keydown', e => { keys[e.key.toLowerCase()] = true; });
window.addEventListener('keyup', e => { keys[e.key.toLowerCase()] = false; });

const levels = [
  {
    name: "Fundamentos",
    door: { x: cw / 2 - 60, y: 30, width: 120, height: 30, open: false },
    nodes: [
      { id: 'intro', px: 0.3, py: 0.3, read: false, title: '¿Qué son los Modelos Arquitectónicos?', content: '<p>Un modelo arquitectónico es un <strong>blueprint estructural</strong> que define cómo se organizan, conectan y comunican los componentes de un sistema de software. Establece las reglas fundamentales de diseño que guían la construcción, el despliegue y la evolución de aplicaciones a escala.</p>' },
      { id: 'vis', px: 0.7, py: 0.3, read: false, title: 'Pilar 1: Visualizar', content: '<p>Diagramar y representar gráficamente el sistema. Permite a los equipos <strong>ver la arquitectura</strong> antes de construirla, usando diagramas UML, C4, o flujos de datos.</p><ul><li>Diagramas de componentes y despliegue</li><li>Mapas de dependencias entre servicios</li><li>Flujos de datos y secuencias de comunicación</li><li>Vistas lógicas, físicas y de proceso</li></ul>' },
      { id: 'plan', px: 0.3, py: 0.7, read: false, title: 'Pilar 2: Planificar', content: '<p>Facilitar la toma de decisiones técnicas, la estimación de recursos y sprints, y la <strong>mitigación de riesgos</strong> desde las fases tempranas del proyecto.</p><ul><li>Estimación de esfuerzo y complejidad por módulo</li><li>Identificación de cuellos de botella y riesgos</li><li>Definición de contratos entre equipos</li><li>Estrategia de escalabilidad y despliegue</li></ul>' },
      { id: 'com', px: 0.7, py: 0.7, read: false, title: 'Pilar 3: Comunicar', content: '<p>Servir como <strong>lenguaje común</strong> entre desarrolladores, arquitectos, diseñadores UX/UI, PMs y stakeholders para alinear expectativas y decisiones.</p><ul><li>Documentación viva y comprensible</li><li>Onboarding acelerado de nuevos miembros</li><li>Alineación entre equipos técnicos y negocio</li><li>ADRs (Architecture Decision Records)</li></ul>' },
      { id: 'most', px: 0.5, py: 0.5, read: false, title: 'Modelo Más Usado', content: '<p>Según encuestas de <strong>O\'Reilly (2024)</strong>, <strong>InfoQ</strong> y reportes de <strong>Gartner</strong>, la arquitectura de microservicios es el modelo dominante en empresas tecnológicas y en transformación digital.</p><p><strong>Razones:</strong></p><ul><li>Containerización (Docker + Kubernetes)</li><li>Cloud Computing (AWS, Azure, GCP)</li><li>DevOps y CI/CD</li><li>Escalabilidad selectiva</li></ul>' }
    ]
  },
  {
    name: "Categorías",
    door: { x: cw / 2 - 60, y: 30, width: 120, height: 30, open: false },
    nodes: Object.entries(categoryData).map(([key, data], i) => ({
      id: key,
      px: 0.2 + (i % 3) * 0.3,
      py: 0.3 + Math.floor(i / 3) * 0.4,
      read: false,
      title: data.title,
      content: data.content
    }))
  },
  {
    name: "Modelos en Detalle",
    door: { x: cw / 2 - 60, y: 30, width: 120, height: 30, open: false },
    nodes: Object.entries(modelsData).map(([key, data], i) => ({
      id: key,
      px: 0.15 + (i % 3) * 0.35,
      py: 0.3 + Math.floor(i / 3) * 0.4,
      read: false,
      title: `${data.icon} ${data.name}`,
      content: modelToHtml(data)
    }))
  },
  {
    name: "Comparativa & Caos",
    door: { x: cw / 2 - 60, y: 30, width: 120, height: 30, open: false },
    nodes: [
      {
        id: 'comp', px: 0.3, py: 0.5, read: false, title: 'Matriz de Decisión', content: `
        <table class="comparison__table" id="comparison-table">
          <thead>
            <tr><th>Dimensión</th><th>Microservicios</th><th>En Capas</th><th>Event-Driven</th><th>Cliente-Servidor</th><th>Hexagonal</th></tr>
          </thead>
          <tbody>
            <tr><td class="comparison__label">Complejidad Inicial</td><td><span class="badge badge--high">Alta</span></td><td><span class="badge badge--low">Baja</span></td><td><span class="badge badge--high">Alta</span></td><td><span class="badge badge--low">Baja</span></td><td><span class="badge badge--mid">Media</span></td></tr>
            <tr><td class="comparison__label">Escalabilidad</td><td><span class="badge badge--excellent">Excelente</span></td><td><span class="badge badge--limited">Limitada</span></td><td><span class="badge badge--excellent">Excelente</span></td><td><span class="badge badge--mid">Media</span></td><td><span class="badge badge--mid">Media</span></td></tr>
            <tr><td class="comparison__label">Mantenibilidad</td><td><span class="badge badge--excellent">Excelente</span></td><td><span class="badge badge--mid">Media</span></td><td><span class="badge badge--mid">Media</span></td><td><span class="badge badge--mid">Media</span></td><td><span class="badge badge--excellent">Excelente</span></td></tr>
            <tr><td class="comparison__label">Rendimiento</td><td><span class="badge badge--mid">Variable</span></td><td><span class="badge badge--mid">Bueno</span></td><td><span class="badge badge--excellent">Excelente</span></td><td><span class="badge badge--mid">Bueno</span></td><td><span class="badge badge--mid">Bueno</span></td></tr>
            <tr><td class="comparison__label">Testabilidad</td><td><span class="badge badge--excellent">Excelente</span></td><td><span class="badge badge--mid">Media</span></td><td><span class="badge badge--mid">Media</span></td><td><span class="badge badge--mid">Media</span></td><td><span class="badge badge--excellent">Excelente</span></td></tr>
            <tr><td class="comparison__label">Curva Aprendizaje</td><td><span class="badge badge--high">Empinada</span></td><td><span class="badge badge--low">Suave</span></td><td><span class="badge badge--high">Empinada</span></td><td><span class="badge badge--low">Suave</span></td><td><span class="badge badge--mid">Moderada</span></td></tr>
            <tr><td class="comparison__label">Despliegue Indep.</td><td><span class="badge badge--excellent">Sí</span></td><td><span class="badge badge--limited">No</span></td><td><span class="badge badge--excellent">Sí</span></td><td><span class="badge badge--limited">No</span></td><td><span class="badge badge--limited">No</span></td></tr>
          </tbody>
        </table>
        <h3 class="decision-helper__title" style="margin-top:2rem">🎯 ¿Cuándo elegir cada modelo?</h3>
        <ul>
          <li><strong>Microservicios:</strong> Equipos grandes (+20 devs), alta escala, despliegues frecuentes, tolerancia a complejidad operacional.</li>
          <li><strong>En Capas:</strong> MVPs, aplicaciones empresariales clásicas, equipos pequeños, prioridad en simplicidad.</li>
          <li><strong>Event-Driven:</strong> Sistemas en tiempo real, IoT, procesamiento de streams, alta concurrencia asincrónica.</li>
          <li><strong>Cliente-Servidor:</strong> Aplicaciones web/móvil clásicas, APIs REST, separación clara frontend/backend.</li>
          <li><strong>Hexagonal:</strong> Dominios complejos (DDD), múltiples integraciones, alta testabilidad requerida, fintech.</li>
        </ul>
      `},
      {
        id: 'chaos', px: 0.7, py: 0.5, read: false, title: 'Ingeniería del Caos', isChaos: true, content: `
        <div class="chaos-dashboard">
          <div class="chaos-controls">
            <h3 class="chaos-controls__title">Herramientas de Ataque 🐒</h3>
            <div class="chaos-btn-group">
              <button class="btn btn--danger chaos-btn" data-attack="kill-db">🔥 Fallo BD</button>
              <button class="btn btn--warning chaos-btn" data-attack="kill-node">⚡ Caída Componente</button>
              <button class="btn btn--primary chaos-btn" data-attack="ddos">🌊 Pico Tráfico</button>
              <button class="btn btn--secondary chaos-btn" data-attack="latency">🐌 Alta Latencia</button>
              <button class="btn btn--ghost chaos-btn" data-attack="reset">🔄 Restaurar</button>
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
        </div>
      ` }
    ]
  }
];

window.addEventListener('resize', resize);
resize();

player.x = cw / 2;
player.y = ch - 100;

function getLevelNodes() {
  const lvl = levels[currentLevelIdx];
  return lvl.nodes.map(n => ({
    ...n,
    x: n.px * cw,
    y: n.py * ch
  }));
}

function updateUI() {
  const lvl = levels[currentLevelIdx];
  document.getElementById('level-indicator').innerText = `Nivel ${currentLevelIdx + 1}: ${lvl.name}`;
  const readCount = lvl.nodes.filter(n => n.read).length;
  const total = lvl.nodes.length;
  document.getElementById('progress-text').innerText = `Nodos leídos: ${readCount} / ${total}`;
  document.getElementById('progress-fill').style.width = `${(readCount / total) * 100}%`;

  if (readCount === total && !lvl.door.open) {
    lvl.door.open = true;
  }
}

function drawPlayer() {
  ctx.shadowBlur = 20;
  ctx.shadowColor = player.glow;
  ctx.fillStyle = player.color;
  ctx.fillRect(player.x - player.size / 2, player.y - player.size / 2, player.size, player.size);

  ctx.fillStyle = '#fff';
  ctx.fillRect(player.x - 8, player.y - 5, 4, 4);
  ctx.fillRect(player.x + 4, player.y - 5, 4, 4);

  ctx.shadowBlur = 0;
}

function drawNodes(currentNodes) {
  currentNodes.forEach(node => {
    ctx.beginPath();
    ctx.arc(node.x, node.y, 20, 0, Math.PI * 2);
    ctx.fillStyle = node.read ? '#10b981' : '#f59e0b';
    ctx.shadowBlur = 15;
    ctx.shadowColor = ctx.fillStyle;
    ctx.fill();
    ctx.closePath();
    ctx.shadowBlur = 0;

    if (!node.read) {
      ctx.beginPath();
      ctx.arc(node.x, node.y, 20 + Math.sin(Date.now() / 150) * 5, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(245, 158, 11, 0.5)';
      ctx.lineWidth = 2;
      ctx.stroke();
    }

    ctx.fillStyle = '#fff';
    ctx.font = '14px Inter';
    ctx.textAlign = 'center';
    let cleanTitle = node.title.replace(/<[^>]*>?/gm, '');
    if (cleanTitle.length > 20) cleanTitle = cleanTitle.substring(0, 20) + '...';
    ctx.fillText(cleanTitle, node.x, node.y + 45);
  });
}

function drawDoor() {
  const d = levels[currentLevelIdx].door;
  ctx.fillStyle = d.open ? '#10b981' : '#f43f5e';
  ctx.shadowBlur = 20;
  ctx.shadowColor = ctx.fillStyle;
  ctx.fillRect(d.x, d.y, d.width, d.height);
  ctx.shadowBlur = 0;

  ctx.fillStyle = '#fff';
  ctx.font = 'bold 12px Inter';
  ctx.textAlign = 'center';
  ctx.fillText(d.open ? "PUERTA ABIERTA" : "PUERTA BLOQUEADA", d.x + d.width / 2, d.y + d.height + 20);
}

function drawRoom() {
  // Draw fragments
  roomFragments.forEach(f => {
    if (!f.collected) {
      ctx.beginPath();
      ctx.arc(f.x, f.y, 8, 0, Math.PI * 2);
      ctx.fillStyle = '#f59e0b';
      ctx.shadowBlur = 15;
      ctx.shadowColor = '#f59e0b';
      ctx.fill();
      ctx.closePath();
      
      // Pulse ring around fragment
      ctx.beginPath();
      ctx.arc(f.x, f.y, 12 + Math.sin(Date.now()/100)*3, 0, Math.PI*2);
      ctx.strokeStyle = 'rgba(245, 158, 11, 0.5)';
      ctx.lineWidth = 1.5;
      ctx.stroke();
    }
  });

  // Draw exit portal
  const allCollected = roomFragments.length > 0 && roomFragments.every(f => f.collected);
  const portalX = cw * 0.75;
  const portalY = ch - 80;

  ctx.beginPath();
  ctx.arc(portalX, portalY, 35, 0, Math.PI * 2);
  ctx.fillStyle = allCollected ? '#10b981' : 'rgba(244, 63, 94, 0.3)';
  ctx.shadowBlur = allCollected ? 30 : 0;
  ctx.shadowColor = ctx.fillStyle;
  ctx.fill();
  ctx.closePath();
  ctx.shadowBlur = 0;

  // Portal label
  ctx.fillStyle = '#fff';
  ctx.font = 'bold 12px Inter';
  ctx.textAlign = 'center';
  ctx.fillText(allCollected ? 'PISAR PARA VOLVER' : 'BLOQUEADO', portalX, portalY - 50);
}

function update() {
  if (gameState === STATE_TRANSITION_IN || gameState === STATE_TRANSITION_OUT) {
    transitionProgress += 0.04;
    if (transitionProgress >= 1) {
      transitionProgress = 0;
      if (gameState === STATE_TRANSITION_IN) {
        gameState = STATE_ROOM;
        // Teleport to room
        player.x = cw * 0.75;
        player.y = ch / 2;
        
        // Spawn 3 fragments in the right half of the screen
        roomFragments = [
          { x: cw * 0.6 + Math.random() * (cw * 0.3), y: ch * 0.2 + Math.random() * (ch * 0.5), collected: false },
          { x: cw * 0.6 + Math.random() * (cw * 0.3), y: ch * 0.2 + Math.random() * (ch * 0.5), collected: false },
          { x: cw * 0.6 + Math.random() * (cw * 0.3), y: ch * 0.2 + Math.random() * (ch * 0.5), collected: false }
        ];

        document.getElementById('game-ui').classList.add('hidden');
        document.querySelector('.instructions').classList.add('hidden');
        document.getElementById('terminal-title').innerHTML = activeNode.title;
        document.getElementById('terminal-content').innerHTML = activeNode.content;
        document.getElementById('info-room-ui').classList.remove('hidden');

        // Optional instruction toggling
        if (activeNode.isChaos) {
          document.getElementById('room-instructions').style.display = 'none'; // No fragments needed
          roomFragments = []; // Instantly open exit
          setTimeout(() => initChaos(), 100);
        } else {
          document.getElementById('room-instructions').style.display = 'block';
        }
      } else {
        // Return to Hub
        gameState = STATE_HUB;
        player.x = savedPlayerPos.x;
        player.y = savedPlayerPos.y + 25; // slightly offset to not re-trigger
        
        document.getElementById('info-room-ui').classList.add('hidden');
        document.getElementById('game-ui').classList.remove('hidden');
        document.querySelector('.instructions').classList.remove('hidden');
        if (activeNode.isChaos) {
          document.getElementById('terminal-content').innerHTML = '';
        }
        updateUI();
      }
    }
    return;
  }

  // Common movement
  if (keys['w'] || keys['arrowup']) player.y -= player.speed;
  if (keys['s'] || keys['arrowdown']) player.y += player.speed;
  if (keys['a'] || keys['arrowleft']) player.x -= player.speed;
  if (keys['d'] || keys['arrowright']) player.x += player.speed;

  if (gameState === STATE_HUB) {
    player.x = Math.max(player.size / 2, Math.min(cw - player.size / 2, player.x));
    player.y = Math.max(player.size / 2, Math.min(ch - player.size / 2, player.y));

    const lvl = levels[currentLevelIdx];
    const currentNodes = getLevelNodes();

    currentNodes.forEach((node, idx) => {
      const dist = Math.hypot(player.x - node.x, player.y - node.y);
      if (dist < 20 + player.size / 2) {
        if (!lvl.nodes[idx].read) {
          activeNode = lvl.nodes[idx];
          savedPlayerPos = { x: player.x, y: player.y };
          gameState = STATE_TRANSITION_IN;
        } else {
          // Bounce effect slightly if re-entering
          const angle = Math.atan2(player.y - node.y, player.x - node.x);
          player.x += Math.cos(angle) * 10;
          player.y += Math.sin(angle) * 10;
          
          activeNode = lvl.nodes[idx];
          savedPlayerPos = { x: player.x, y: player.y };
          gameState = STATE_TRANSITION_IN;
        }
      }
    });

    const d = lvl.door;
    if (d.open && player.x > d.x && player.x < d.x + d.width && player.y > d.y && player.y < d.y + d.height + player.size) {
      if (currentLevelIdx < levels.length - 1) {
        currentLevelIdx++;
        player.x = cw / 2;
        player.y = ch - 100;
        updateUI();
      } else {
        // Win
        activeNode = { title: "¡Felicidades!", content: "<div style='text-align:center'><h3>Has completado la Guía Interactiva</h3><p>Ahora dominas los diferentes Modelos Arquitectónicos de Software.</p></div>", isChaos: false };
        savedPlayerPos = { x: player.x, y: player.y };
        gameState = STATE_TRANSITION_IN;
        roomFragments = [];
      }
    }
  } else if (gameState === STATE_ROOM) {
    // Only let player move on right side if terminal takes left side
    player.x = Math.max(cw * 0.45 + player.size / 2, Math.min(cw - player.size / 2, player.x));
    player.y = Math.max(player.size / 2, Math.min(ch - player.size / 2, player.y));

    // Fragment collection logic
    let allCollected = true;
    roomFragments.forEach(f => {
      if (!f.collected) {
        if (Math.hypot(player.x - f.x, player.y - f.y) < 15 + player.size / 2) {
          f.collected = true;
        } else {
          allCollected = false;
        }
      }
    });

    // Exit portal collision
    const portalX = cw * 0.75;
    const portalY = ch - 80;
    if ((allCollected || roomFragments.length === 0) && Math.hypot(player.x - portalX, player.y - portalY) < 35 + player.size / 2) {
      if (activeNode && !activeNode.read) {
        activeNode.read = true;
      }
      gameState = STATE_TRANSITION_OUT;
    }
  }
}

function loop() {
  ctx.clearRect(0, 0, cw, ch);

  if (gameState === STATE_HUB) {
    // Grid HUB
    ctx.strokeStyle = 'rgba(99, 102, 241, 0.08)';
    ctx.lineWidth = 1;
    for (let i = 0; i < cw; i += 50) { ctx.beginPath(); ctx.moveTo(i, 0); ctx.lineTo(i, ch); ctx.stroke(); }
    for (let i = 0; i < ch; i += 50) { ctx.beginPath(); ctx.moveTo(0, i); ctx.lineTo(cw, i); ctx.stroke(); }

    drawDoor();
    drawNodes(getLevelNodes());
    drawPlayer();

  } else if (gameState === STATE_ROOM) {
    // Grid ROOM
    ctx.strokeStyle = 'rgba(6, 182, 212, 0.08)';
    ctx.lineWidth = 1;
    for (let i = 0; i < cw; i += 40) { ctx.beginPath(); ctx.moveTo(i, 0); ctx.lineTo(i, ch); ctx.stroke(); }
    for (let i = 0; i < ch; i += 40) { ctx.beginPath(); ctx.moveTo(0, i); ctx.lineTo(cw, i); ctx.stroke(); }

    drawRoom();
    drawPlayer();
  }

  // Draw transition
  if (gameState === STATE_TRANSITION_IN || gameState === STATE_TRANSITION_OUT) {
    const isOut = gameState === STATE_TRANSITION_OUT;
    const progress = isOut ? 1 - transitionProgress : transitionProgress;

    ctx.fillStyle = `rgba(255, 255, 255, ${Math.sin(transitionProgress * Math.PI)})`;
    ctx.fillRect(0, 0, cw, ch);

    ctx.save();
    ctx.translate(player.x, player.y);
    ctx.rotate(progress * Math.PI * 10);
    ctx.scale(1 - progress, 1 - progress);
    ctx.fillStyle = player.color;
    ctx.fillRect(-player.size / 2, -player.size / 2, player.size, player.size);
    ctx.restore();
  }

  update();
  requestAnimationFrame(loop);
}

// Init
updateUI();
loop();
