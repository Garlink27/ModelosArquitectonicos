import { initChaos } from './chaos.js';

// ============================================
// MODELS DATA
// ============================================
const modelsData = {
  microservicios: {
    icon: '🔷',
    name: 'Arquitectura de Microservicios',
    subtitle: 'Microservices Architecture',
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
    icon: '📚',
    name: 'Arquitectura en Capas (Layered)',
    subtitle: 'Layered / N-Tier Architecture',
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
    icon: '⚡',
    name: 'Arquitectura Basada en Eventos (Event-Driven)',
    subtitle: 'Event-Driven Architecture (EDA)',
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
    icon: '🖥️',
    name: 'Arquitectura Cliente-Servidor',
    subtitle: 'Client-Server Architecture',
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
    icon: '⬡',
    name: 'Arquitectura Hexagonal (Ports & Adapters)',
    subtitle: 'Hexagonal / Ports & Adapters / Clean Architecture',
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

// ============================================
// CATEGORY MODAL DATA
// ============================================
const categoryData = {
  monolitica: {
    title: '🧱 Arquitectura Monolítica',
    content: `
      <p>Una <strong>aplicación monolítica</strong> contiene todos sus componentes (UI, negocio, datos) en una sola unidad.</p>
      <ul>
        <li><strong>Ventajas:</strong> Simple de desarrollar, testear y desplegar inicialmente.</li>
        <li><strong>Desventajas:</strong> Difícil de escalar y mantener.</li>
      </ul>
      <p><strong>Ejemplos Reales:</strong></p>
      <ul>
        <li>1. Shopify (Originalmente un gran monolito Ruby on Rails)</li>
        <li>2. Stack Overflow (Monolito .NET C#)</li>
        <li>3. Basecamp (Monolito Rails clásico)</li>
        <li>4. Etsy (Antes de su transición a microservicios)</li>
        <li>5. Moodle (LMS tradicional PHP)</li>
      </ul>
    `
  },
  cs: {
    title: '🖥️ Cliente-Servidor',
    content: `
      <p>El modelo <strong>Cliente-Servidor</strong> distribuye tareas entre proveedores de recursos (servidores) y demandantes (clientes).</p>
      <ul>
        <li><strong>Ventajas:</strong> Centralización del control y seguridad.</li>
        <li><strong>Desventajas:</strong> El servidor es un punto único de fallo (SPOF).</li>
      </ul>
      <p><strong>Ejemplos Reales:</strong></p>
      <ul>
        <li>1. Sistemas de Correo Electrónico (SMTP/IMAP)</li>
        <li>2. Navegación Web Tradicional (HTTP Requests a Servidor Apache)</li>
        <li>3. Juegos multijugador online centralizados (WoW Server)</li>
        <li>4. Aplicaciones FTP (FileZilla)</li>
        <li>5. Bases de Datos Remotas (MySQL Server conectado desde un cliente)</li>
      </ul>
    `
  },
  capas: {
    title: '📚 Arquitectura en Capas',
    content: `
      <p>Organización del sistema en <strong>capas horizontales</strong> (Presentación, Negocio, Datos).</p>
      <ul>
        <li><strong>Ventajas:</strong> Separación de responsabilidades clara.</li>
        <li><strong>Desventajas:</strong> Escalabilidad monolítica y acumulación de latencia.</li>
      </ul>
      <p><strong>Ejemplos Reales:</strong></p>
      <ul>
        <li>1. Aplicaciones empresariales Spring Boot (Controller-Service-Repository)</li>
        <li>2. Desarrollo tradicional ASP.NET MVC</li>
        <li>3. Sistemas legacy bancarios y ERPs</li>
        <li>4. Aplicaciones Django MTV (Model-Template-View)</li>
        <li>5. Arquitectura TCP/IP y Modelo OSI en redes</li>
      </ul>
    `
  },
  eventos: {
    title: '⚡ Basada en Eventos',
    content: `
      <p>Componentes que se comunican produciendo y consumiendo <strong>eventos asíncronos</strong> a través de un broker.</p>
      <ul>
        <li><strong>Ventajas:</strong> Desacoplamiento extremo y procesamiento reactivo.</li>
        <li><strong>Desventajas:</strong> Debugging complejo y consistencia eventual.</li>
      </ul>
      <p><strong>Ejemplos Reales:</strong></p>
      <ul>
        <li>1. Plataforma de viajes Uber (asignación de viajes)</li>
        <li>2. LinkedIn (Pipeline de datos y métricas con Apache Kafka)</li>
        <li>3. Sistemas de Trading en Bolsa de Valores de Nueva York</li>
        <li>4. Procesamiento de pagos de Stripe (Webhooks)</li>
        <li>5. IoT (Sensores de hogar inteligente enviando datos)</li>
      </ul>
    `
  },
  microservicios: {
    title: '🔷 Arquitectura de Microservicios',
    content: `
      <p>Conjunto de <strong>servicios pequeños y autónomos</strong> comunicándose por protocolos ligeros.</p>
      <ul>
        <li><strong>Ventajas:</strong> Despliegue independiente, aislamiento de fallos (Bulkhead).</li>
        <li><strong>Desventajas:</strong> Alta complejidad operativa y de infraestructura.</li>
      </ul>
      <p><strong>Ejemplos Reales:</strong></p>
      <ul>
        <li>1. Netflix (Pioneros, más de 1000 microservicios activos)</li>
        <li>2. Amazon (Migración histórica desde su monolito obelisco)</li>
        <li>3. Spotify (Servicios divididos por funcionalidades como playlists, artistas)</li>
        <li>4. Uber (Servicios de facturación, mapas, notificaciones separados)</li>
        <li>5. SoundCloud (Arquitectura BFF: Backend For Frontend)</li>
      </ul>
    `
  },
  hexagonal: {
    title: '💠 Arquitectura Hexagonal',
    content: `
      <p>Aísla el <strong>núcleo de dominio</strong> mediante Puertos y Adaptadores (Clean Architecture).</p>
      <ul>
        <li><strong>Ventajas:</strong> Alta testeabilidad, agnóstica de frameworks o bases de datos.</li>
        <li><strong>Desventajas:</strong> Curva de aprendizaje y verbosidad en el código.</li>
      </ul>
      <p><strong>Ejemplos Reales:</strong></p>
      <ul>
        <li>1. Sistemas financieros modernos de alta criticidad (Fintechs)</li>
        <li>2. Microservicios internos de Netflix (Domain-Driven Design)</li>
        <li>3. Software de facturación electrónica</li>
        <li>4. Motores de reglas de negocio complejos</li>
        <li>5. Sistemas de reservas aéreas (donde la lógica es inmutable, y los conectores web cambian)</li>
      </ul>
    `
  }
};

// ============================================
// SVG DIAGRAMS
// ============================================
function getDiagram(type) {
  const diagrams = {
    microservices: `
      <svg viewBox="0 0 600 320" fill="none" xmlns="http://www.w3.org/2000/svg">
        <!-- API Gateway -->
        <g class="svg-tooltip-trigger" data-tooltip="<strong>API Gateway</strong><br>Enruta las peticiones externas hacia el microservicio adecuado.">
          <rect x="220" y="10" width="160" height="40" rx="8" fill="rgba(99,102,241,0.15)" stroke="#6366f1" stroke-width="1.5"/>
          <text x="300" y="35" text-anchor="middle" fill="#a5b4fc" font-size="13" font-weight="600" font-family="Inter">API Gateway</text>
        </g>
        
        <!-- Services -->
        <g class="svg-tooltip-trigger" data-tooltip="<strong>User Service</strong><br>Microservicio independiente encargado de la autenticación.">
          <rect x="30" y="90" width="120" height="60" rx="8" fill="rgba(6,182,212,0.12)" stroke="#06b6d4" stroke-width="1.5"/>
          <text x="90" y="118" text-anchor="middle" fill="#67e8f9" font-size="11" font-weight="600" font-family="Inter">User Service</text>
          <text x="90" y="135" text-anchor="middle" fill="#64748b" font-size="9" font-family="Inter">Auth + Profiles</text>
        </g>
        
        <rect x="170" y="90" width="120" height="60" rx="8" fill="rgba(16,185,129,0.12)" stroke="#10b981" stroke-width="1.5"/>
        <text x="230" y="118" text-anchor="middle" fill="#6ee7b7" font-size="11" font-weight="600" font-family="Inter">Order Service</text>
        <text x="230" y="135" text-anchor="middle" fill="#64748b" font-size="9" font-family="Inter">CRUD + Logic</text>
        
        <rect x="310" y="90" width="120" height="60" rx="8" fill="rgba(245,158,11,0.12)" stroke="#f59e0b" stroke-width="1.5"/>
        <text x="370" y="118" text-anchor="middle" fill="#fcd34d" font-size="11" font-weight="600" font-family="Inter">Payment Svc</text>
        <text x="370" y="135" text-anchor="middle" fill="#64748b" font-size="9" font-family="Inter">Stripe + Billing</text>
        
        <rect x="450" y="90" width="120" height="60" rx="8" fill="rgba(244,63,94,0.12)" stroke="#f43f5e" stroke-width="1.5"/>
        <text x="510" y="118" text-anchor="middle" fill="#fda4af" font-size="11" font-weight="600" font-family="Inter">Notif. Service</text>
        <text x="510" y="135" text-anchor="middle" fill="#64748b" font-size="9" font-family="Inter">Email + Push</text>
        
        <!-- Connections from Gateway -->
        <line x1="260" y1="50" x2="90" y2="90" stroke="#6366f1" stroke-width="1" stroke-dasharray="4,4" class="animated-flow-line" opacity="0.6"/>
        <line x1="290" y1="50" x2="230" y2="90" stroke="#6366f1" stroke-width="1" stroke-dasharray="4,4" class="animated-flow-line" opacity="0.6"/>
        <line x1="320" y1="50" x2="370" y2="90" stroke="#6366f1" stroke-width="1" stroke-dasharray="4,4" class="animated-flow-line" opacity="0.6"/>
        <line x1="350" y1="50" x2="510" y2="90" stroke="#6366f1" stroke-width="1" stroke-dasharray="4,4" class="animated-flow-line" opacity="0.6"/>
        
        <!-- Message Broker -->
        <rect x="140" y="185" width="320" height="35" rx="8" fill="rgba(139,92,246,0.12)" stroke="#8b5cf6" stroke-width="1.5"/>
        <text x="300" y="207" text-anchor="middle" fill="#c4b5fd" font-size="12" font-weight="600" font-family="Inter">📨 Message Broker (Kafka / RabbitMQ)</text>
        
        <!-- Connections to broker -->
        <line x1="90" y1="150" x2="200" y2="185" stroke="#8b5cf6" stroke-width="1" stroke-dasharray="4,4" class="animated-flow-line" opacity="0.5"/>
        <line x1="230" y1="150" x2="260" y2="185" stroke="#8b5cf6" stroke-width="1" stroke-dasharray="4,4" class="animated-flow-line" opacity="0.5"/>
        <line x1="370" y1="150" x2="340" y2="185" stroke="#8b5cf6" stroke-width="1" stroke-dasharray="4,4" class="animated-flow-line" opacity="0.5"/>
        <line x1="510" y1="150" x2="400" y2="185" stroke="#8b5cf6" stroke-width="1" stroke-dasharray="4,4" class="animated-flow-line" opacity="0.5"/>
        
        <!-- Databases -->
        <ellipse cx="90" cy="270" rx="40" ry="16" fill="rgba(6,182,212,0.1)" stroke="#06b6d4" stroke-width="1"/>
        <text x="90" y="275" text-anchor="middle" fill="#64748b" font-size="9" font-family="Inter">Users DB</text>
        
        <ellipse cx="230" cy="270" rx="40" ry="16" fill="rgba(16,185,129,0.1)" stroke="#10b981" stroke-width="1"/>
        <text x="230" y="275" text-anchor="middle" fill="#64748b" font-size="9" font-family="Inter">Orders DB</text>
        
        <ellipse cx="370" cy="270" rx="40" ry="16" fill="rgba(245,158,11,0.1)" stroke="#f59e0b" stroke-width="1"/>
        <text x="370" y="275" text-anchor="middle" fill="#64748b" font-size="9" font-family="Inter">Payments DB</text>
        
        <ellipse cx="510" cy="270" rx="40" ry="16" fill="rgba(244,63,94,0.1)" stroke="#f43f5e" stroke-width="1"/>
        <text x="510" y="275" text-anchor="middle" fill="#64748b" font-size="9" font-family="Inter">Notif. DB</text>
        
        <!-- DB connections -->
        <line x1="90" y1="150" x2="90" y2="254" stroke="#06b6d4" stroke-width="1" opacity="0.3"/>
        <line x1="230" y1="150" x2="230" y2="254" stroke="#10b981" stroke-width="1" opacity="0.3"/>
        <line x1="370" y1="150" x2="370" y2="254" stroke="#f59e0b" stroke-width="1" opacity="0.3"/>
        <line x1="510" y1="150" x2="510" y2="254" stroke="#f43f5e" stroke-width="1" opacity="0.3"/>
        
        <!-- Label -->
        <text x="300" y="310" text-anchor="middle" fill="#64748b" font-size="10" font-family="Inter" font-style="italic">Cada servicio tiene su propia base de datos (Database per Service pattern)</text>
      </svg>
    `,
    layered: `
      <svg viewBox="0 0 500 340" fill="none" xmlns="http://www.w3.org/2000/svg">
        <!-- Presentation Layer -->
        <rect x="50" y="15" width="400" height="60" rx="10" fill="rgba(99,102,241,0.12)" stroke="#6366f1" stroke-width="1.5"/>
        <text x="250" y="42" text-anchor="middle" fill="#a5b4fc" font-size="14" font-weight="700" font-family="Inter">🖥️ Capa de Presentación</text>
        <text x="250" y="62" text-anchor="middle" fill="#64748b" font-size="10" font-family="Inter">UI Components · Views · Controllers · HTML/CSS/JS</text>
        
        <!-- Arrow -->
        <path d="M250 75 L250 95" stroke="#6366f1" stroke-width="1.5" stroke-dasharray="4,4" class="animated-flow-line" marker-end="url(#arrowPurple)"/>
        
        <!-- Business Layer -->
        <rect x="50" y="95" width="400" height="60" rx="10" fill="rgba(6,182,212,0.12)" stroke="#06b6d4" stroke-width="1.5"/>
        <text x="250" y="122" text-anchor="middle" fill="#67e8f9" font-size="14" font-weight="700" font-family="Inter">⚙️ Capa de Lógica de Negocio</text>
        <text x="250" y="142" text-anchor="middle" fill="#64748b" font-size="10" font-family="Inter">Services · Business Rules · Validations · Use Cases</text>
        
        <!-- Arrow -->
        <path d="M250 155 L250 175" stroke="#06b6d4" stroke-width="1.5" stroke-dasharray="4,4" class="animated-flow-line" marker-end="url(#arrowCyan)"/>
        
        <!-- Data Access Layer -->
        <rect x="50" y="175" width="400" height="60" rx="10" fill="rgba(16,185,129,0.12)" stroke="#10b981" stroke-width="1.5"/>
        <text x="250" y="202" text-anchor="middle" fill="#6ee7b7" font-size="14" font-weight="700" font-family="Inter">🔌 Capa de Acceso a Datos</text>
        <text x="250" y="222" text-anchor="middle" fill="#64748b" font-size="10" font-family="Inter">Repositories · DAOs · ORM (Hibernate, EF) · Queries</text>
        
        <!-- Arrow -->
        <path d="M250 235 L250 255" stroke="#10b981" stroke-width="1.5" stroke-dasharray="4,4" class="animated-flow-line" marker-end="url(#arrowGreen)"/>
        
        <!-- Database Layer -->
        <rect x="50" y="255" width="400" height="60" rx="10" fill="rgba(245,158,11,0.12)" stroke="#f59e0b" stroke-width="1.5"/>
        <text x="250" y="282" text-anchor="middle" fill="#fcd34d" font-size="14" font-weight="700" font-family="Inter">🗄️ Capa de Base de Datos</text>
        <text x="250" y="302" text-anchor="middle" fill="#64748b" font-size="10" font-family="Inter">PostgreSQL · MySQL · Oracle · MongoDB</text>
        
        <!-- Markers -->
        <defs>
          <marker id="arrowPurple" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto"><path d="M0 0 L8 3 L0 6z" fill="#6366f1"/></marker>
          <marker id="arrowCyan" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto"><path d="M0 0 L8 3 L0 6z" fill="#06b6d4"/></marker>
          <marker id="arrowGreen" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto"><path d="M0 0 L8 3 L0 6z" fill="#10b981"/></marker>
        </defs>
        
        <!-- Side Labels -->
        <text x="250" y="335" text-anchor="middle" fill="#64748b" font-size="10" font-family="Inter" font-style="italic">Dependencias unidireccionales: cada capa solo conoce a la capa inferior</text>
      </svg>
    `,
    'event-driven': `
      <svg viewBox="0 0 600 280" fill="none" xmlns="http://www.w3.org/2000/svg">
        <!-- Producers -->
        <text x="80" y="20" text-anchor="middle" fill="#a5b4fc" font-size="12" font-weight="700" font-family="Inter">PRODUCTORES</text>
        
        <rect x="20" y="35" width="120" height="45" rx="8" fill="rgba(99,102,241,0.12)" stroke="#6366f1" stroke-width="1.5"/>
        <text x="80" y="62" text-anchor="middle" fill="#a5b4fc" font-size="11" font-weight="600" font-family="Inter">🛒 Order Svc</text>
        
        <rect x="20" y="95" width="120" height="45" rx="8" fill="rgba(6,182,212,0.12)" stroke="#06b6d4" stroke-width="1.5"/>
        <text x="80" y="122" text-anchor="middle" fill="#67e8f9" font-size="11" font-weight="600" font-family="Inter">👤 User Svc</text>
        
        <rect x="20" y="155" width="120" height="45" rx="8" fill="rgba(16,185,129,0.12)" stroke="#10b981" stroke-width="1.5"/>
        <text x="80" y="182" text-anchor="middle" fill="#6ee7b7" font-size="11" font-weight="600" font-family="Inter">💰 Payment Svc</text>
        
        <!-- Event Broker -->
        <rect x="200" y="45" width="200" height="160" rx="12" fill="rgba(139,92,246,0.08)" stroke="#8b5cf6" stroke-width="2"/>
        <text x="300" y="75" text-anchor="middle" fill="#c4b5fd" font-size="13" font-weight="700" font-family="Inter">📨 Event Broker</text>
        <text x="300" y="95" text-anchor="middle" fill="#64748b" font-size="10" font-family="Inter">(Apache Kafka)</text>
        
        <!-- Topics -->
        <rect x="220" y="110" width="160" height="25" rx="4" fill="rgba(245,158,11,0.1)" stroke="#f59e0b" stroke-width="1"/>
        <text x="300" y="127" text-anchor="middle" fill="#fcd34d" font-size="9" font-weight="600" font-family="JetBrains Mono">order.created</text>
        
        <rect x="220" y="142" width="160" height="25" rx="4" fill="rgba(244,63,94,0.1)" stroke="#f43f5e" stroke-width="1"/>
        <text x="300" y="159" text-anchor="middle" fill="#fda4af" font-size="9" font-weight="600" font-family="JetBrains Mono">payment.processed</text>
        
        <rect x="220" y="174" width="160" height="25" rx="4" fill="rgba(59,130,246,0.1)" stroke="#3b82f6" stroke-width="1"/>
        <text x="300" y="191" text-anchor="middle" fill="#93c5fd" font-size="9" font-weight="600" font-family="JetBrains Mono">user.registered</text>
        
        <!-- Consumers -->
        <text x="520" y="20" text-anchor="middle" fill="#a5b4fc" font-size="12" font-weight="700" font-family="Inter">CONSUMIDORES</text>
        
        <rect x="460" y="35" width="120" height="45" rx="8" fill="rgba(245,158,11,0.12)" stroke="#f59e0b" stroke-width="1.5"/>
        <text x="520" y="62" text-anchor="middle" fill="#fcd34d" font-size="11" font-weight="600" font-family="Inter">📧 Email Svc</text>
        
        <rect x="460" y="95" width="120" height="45" rx="8" fill="rgba(244,63,94,0.12)" stroke="#f43f5e" stroke-width="1.5"/>
        <text x="520" y="122" text-anchor="middle" fill="#fda4af" font-size="11" font-weight="600" font-family="Inter">📊 Analytics</text>
        
        <rect x="460" y="155" width="120" height="45" rx="8" fill="rgba(59,130,246,0.12)" stroke="#3b82f6" stroke-width="1.5"/>
        <text x="520" y="182" text-anchor="middle" fill="#93c5fd" font-size="11" font-weight="600" font-family="Inter">📦 Inventory</text>
        
        <!-- Arrows: Producers → Broker -->
        <line x1="140" y1="57" x2="200" y2="125" stroke="#6366f1" stroke-width="1" stroke-dasharray="4,4" class="animated-flow-line" opacity="0.6"/>
        <line x1="140" y1="117" x2="200" y2="155" stroke="#06b6d4" stroke-width="1" stroke-dasharray="4,4" class="animated-flow-line" opacity="0.6"/>
        <line x1="140" y1="177" x2="200" y2="155" stroke="#10b981" stroke-width="1" stroke-dasharray="4,4" class="animated-flow-line" opacity="0.6"/>
        
        <!-- Arrows: Broker → Consumers -->
        <line x1="400" y1="125" x2="460" y2="57" stroke="#f59e0b" stroke-width="1" stroke-dasharray="4,4" class="animated-flow-line" opacity="0.6"/>
        <line x1="400" y1="155" x2="460" y2="117" stroke="#f43f5e" stroke-width="1" stroke-dasharray="4,4" class="animated-flow-line" opacity="0.6"/>
        <line x1="400" y1="185" x2="460" y2="177" stroke="#3b82f6" stroke-width="1" stroke-dasharray="4,4" class="animated-flow-line" opacity="0.6"/>
        
        <!-- Label -->
        <text x="300" y="245" text-anchor="middle" fill="#64748b" font-size="10" font-family="Inter" font-style="italic">Comunicación asíncrona: los productores publican eventos sin conocer a los consumidores</text>
        
        <!-- Async indicator -->
        <text x="170" y="240" text-anchor="middle" fill="#8b5cf6" font-size="9" font-weight="600" font-family="JetBrains Mono">→ publish()</text>
        <text x="430" y="240" text-anchor="middle" fill="#8b5cf6" font-size="9" font-weight="600" font-family="JetBrains Mono">→ subscribe()</text>
      </svg>
    `,
    'client-server': `
      <svg viewBox="0 0 600 260" fill="none" xmlns="http://www.w3.org/2000/svg">
        <!-- Clients -->
        <text x="100" y="20" text-anchor="middle" fill="#a5b4fc" font-size="12" font-weight="700" font-family="Inter">CLIENTES</text>
        
        <rect x="30" y="35" width="140" height="50" rx="8" fill="rgba(99,102,241,0.12)" stroke="#6366f1" stroke-width="1.5"/>
        <text x="100" y="58" text-anchor="middle" fill="#a5b4fc" font-size="11" font-weight="600" font-family="Inter">🌐 Web Browser</text>
        <text x="100" y="75" text-anchor="middle" fill="#64748b" font-size="9" font-family="Inter">React / Vue / Angular</text>
        
        <rect x="30" y="100" width="140" height="50" rx="8" fill="rgba(6,182,212,0.12)" stroke="#06b6d4" stroke-width="1.5"/>
        <text x="100" y="123" text-anchor="middle" fill="#67e8f9" font-size="11" font-weight="600" font-family="Inter">📱 Mobile App</text>
        <text x="100" y="140" text-anchor="middle" fill="#64748b" font-size="9" font-family="Inter">iOS / Android / Flutter</text>
        
        <rect x="30" y="165" width="140" height="50" rx="8" fill="rgba(16,185,129,0.12)" stroke="#10b981" stroke-width="1.5"/>
        <text x="100" y="188" text-anchor="middle" fill="#6ee7b7" font-size="11" font-weight="600" font-family="Inter">🤖 IoT Device</text>
        <text x="100" y="205" text-anchor="middle" fill="#64748b" font-size="9" font-family="Inter">Sensor / Gateway</text>
        
        <!-- Network -->
        <rect x="220" y="80" width="160" height="100" rx="12" fill="rgba(139,92,246,0.06)" stroke="#8b5cf6" stroke-width="1.5" stroke-dasharray="6,3"/>
        <text x="300" y="120" text-anchor="middle" fill="#c4b5fd" font-size="12" font-weight="600" font-family="Inter">🌍 Internet / Red</text>
        <text x="300" y="140" text-anchor="middle" fill="#64748b" font-size="10" font-family="JetBrains Mono">HTTP / HTTPS</text>
        <text x="300" y="158" text-anchor="middle" fill="#64748b" font-size="10" font-family="JetBrains Mono">REST / GraphQL</text>
        
        <!-- Arrows Request -->
        <line x1="170" y1="60" x2="220" y2="110" stroke="#6366f1" stroke-width="1.5" opacity="0.6"/>
        <line x1="170" y1="125" x2="220" y2="130" stroke="#06b6d4" stroke-width="1.5" opacity="0.6"/>
        <line x1="170" y1="190" x2="220" y2="150" stroke="#10b981" stroke-width="1.5" opacity="0.6"/>
        
        <!-- Server -->
        <rect x="430" y="50" width="150" height="160" rx="12" fill="rgba(245,158,11,0.08)" stroke="#f59e0b" stroke-width="1.5"/>
        <text x="505" y="80" text-anchor="middle" fill="#fcd34d" font-size="13" font-weight="700" font-family="Inter">🖥️ Servidor</text>
        
        <rect x="445" y="95" width="120" height="30" rx="6" fill="rgba(99,102,241,0.1)" stroke="#6366f1" stroke-width="1"/>
        <text x="505" y="115" text-anchor="middle" fill="#a5b4fc" font-size="9" font-weight="600" font-family="Inter">API Controller</text>
        
        <rect x="445" y="132" width="120" height="30" rx="6" fill="rgba(6,182,212,0.1)" stroke="#06b6d4" stroke-width="1"/>
        <text x="505" y="152" text-anchor="middle" fill="#67e8f9" font-size="9" font-weight="600" font-family="Inter">Business Logic</text>
        
        <rect x="445" y="169" width="120" height="30" rx="6" fill="rgba(16,185,129,0.1)" stroke="#10b981" stroke-width="1"/>
        <text x="505" y="189" text-anchor="middle" fill="#6ee7b7" font-size="9" font-weight="600" font-family="Inter">Database</text>
        
        <!-- Arrow Network → Server -->
        <line x1="380" y1="130" x2="430" y2="130" stroke="#f59e0b" stroke-width="1.5" marker-end="url(#arrowAmber)"/>
        
        <defs>
          <marker id="arrowAmber" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto"><path d="M0 0 L8 3 L0 6z" fill="#f59e0b"/></marker>
        </defs>
        
        <!-- Labels -->
        <text x="205" y="100" text-anchor="middle" fill="#6366f1" font-size="8" font-weight="600" font-family="JetBrains Mono" transform="rotate(-25, 195, 85)">Request →</text>
        <text x="300" y="245" text-anchor="middle" fill="#64748b" font-size="10" font-family="Inter" font-style="italic">Múltiples clientes se conectan a un servidor centralizado</text>
      </svg>
    `,
    hexagonal: `
      <svg viewBox="0 0 600 350" fill="none" xmlns="http://www.w3.org/2000/svg">
        <!-- Hexagon (Domain Core) -->
        <polygon points="300,60 400,110 400,210 300,260 200,210 200,110" fill="rgba(99,102,241,0.1)" stroke="#6366f1" stroke-width="2"/>
        <text x="300" y="140" text-anchor="middle" fill="#a5b4fc" font-size="14" font-weight="800" font-family="Inter">DOMINIO</text>
        <text x="300" y="160" text-anchor="middle" fill="#a5b4fc" font-size="10" font-family="Inter">(Lógica de Negocio Pura)</text>
        <text x="300" y="180" text-anchor="middle" fill="#64748b" font-size="9" font-family="Inter">Entities · Use Cases · Rules</text>
        <text x="300" y="195" text-anchor="middle" fill="#64748b" font-size="9" font-family="Inter">Validations · Domain Events</text>
        
        <!-- Ports (on hexagon edges) -->
        <!-- Left Ports (Driving / Input) -->
        <circle cx="200" cy="135" r="10" fill="rgba(6,182,212,0.3)" stroke="#06b6d4" stroke-width="1.5"/>
        <text x="200" y="139" text-anchor="middle" fill="#67e8f9" font-size="8" font-weight="700" font-family="Inter">P</text>
        
        <circle cx="200" cy="185" r="10" fill="rgba(6,182,212,0.3)" stroke="#06b6d4" stroke-width="1.5"/>
        <text x="200" y="189" text-anchor="middle" fill="#67e8f9" font-size="8" font-weight="700" font-family="Inter">P</text>
        
        <!-- Right Ports (Driven / Output) -->
        <circle cx="400" cy="135" r="10" fill="rgba(245,158,11,0.3)" stroke="#f59e0b" stroke-width="1.5"/>
        <text x="400" y="139" text-anchor="middle" fill="#fcd34d" font-size="8" font-weight="700" font-family="Inter">P</text>
        
        <circle cx="400" cy="185" r="10" fill="rgba(245,158,11,0.3)" stroke="#f59e0b" stroke-width="1.5"/>
        <text x="400" y="189" text-anchor="middle" fill="#fcd34d" font-size="8" font-weight="700" font-family="Inter">P</text>
        
        <!-- Driving Adapters (Left) -->
        <rect x="20" y="105" width="130" height="40" rx="8" fill="rgba(6,182,212,0.12)" stroke="#06b6d4" stroke-width="1.5"/>
        <text x="85" y="130" text-anchor="middle" fill="#67e8f9" font-size="10" font-weight="600" font-family="Inter">🌐 REST Controller</text>
        
        <rect x="20" y="160" width="130" height="40" rx="8" fill="rgba(16,185,129,0.12)" stroke="#10b981" stroke-width="1.5"/>
        <text x="85" y="185" text-anchor="middle" fill="#6ee7b7" font-size="10" font-weight="600" font-family="Inter">📱 CLI / GraphQL</text>
        
        <!-- Driven Adapters (Right) -->
        <rect x="450" y="105" width="130" height="40" rx="8" fill="rgba(245,158,11,0.12)" stroke="#f59e0b" stroke-width="1.5"/>
        <text x="515" y="130" text-anchor="middle" fill="#fcd34d" font-size="10" font-weight="600" font-family="Inter">🗄️ PostgreSQL</text>
        
        <rect x="450" y="160" width="130" height="40" rx="8" fill="rgba(244,63,94,0.12)" stroke="#f43f5e" stroke-width="1.5"/>
        <text x="515" y="185" text-anchor="middle" fill="#fda4af" font-size="10" font-weight="600" font-family="Inter">📧 Email / S3</text>
        
        <!-- Connections -->
        <line x1="150" y1="125" x2="190" y2="135" stroke="#06b6d4" stroke-width="1.5" opacity="0.6"/>
        <line x1="150" y1="180" x2="190" y2="185" stroke="#10b981" stroke-width="1.5" opacity="0.6"/>
        <line x1="410" y1="135" x2="450" y2="125" stroke="#f59e0b" stroke-width="1.5" opacity="0.6"/>
        <line x1="410" y1="185" x2="450" y2="180" stroke="#f43f5e" stroke-width="1.5" opacity="0.6"/>
        
        <!-- Labels -->
        <text x="85" y="85" text-anchor="middle" fill="#06b6d4" font-size="10" font-weight="700" font-family="Inter">DRIVING (Entrada)</text>
        <text x="85" y="97" text-anchor="middle" fill="#64748b" font-size="8" font-family="Inter">Adaptadores de Input</text>
        
        <text x="515" y="85" text-anchor="middle" fill="#f59e0b" font-size="10" font-weight="700" font-family="Inter">DRIVEN (Salida)</text>
        <text x="515" y="97" text-anchor="middle" fill="#64748b" font-size="8" font-family="Inter">Adaptadores de Output</text>
        
        <!-- Dependency Direction -->
        <text x="300" y="290" text-anchor="middle" fill="#8b5cf6" font-size="11" font-weight="600" font-family="Inter">→ Las dependencias siempre apuntan HACIA el dominio ←</text>
        <text x="300" y="310" text-anchor="middle" fill="#64748b" font-size="10" font-family="Inter" font-style="italic">Principio de Inversión de Dependencias (DIP)</text>
        
        <!-- Port label -->
        <text x="300" y="335" text-anchor="middle" fill="#64748b" font-size="9" font-family="JetBrains Mono">P = Puerto (Interface/Contract)</text>
      </svg>
    `
  };
  return diagrams[type] || '';
}

// ============================================
// RENDER MODEL CONTENT
// ============================================
function renderModelContent(modelKey) {
  const model = modelsData[modelKey];
  if (!model) return '';

  return `
    <div class="model-detail">
      <!-- Header -->
      <div class="model-header">
        <div class="model-header__top">
          <div class="model-header__icon">${model.icon}</div>
          <div class="model-header__info">
            <h3 class="model-header__name">${model.name}</h3>
            <span class="model-header__subtitle">${model.subtitle}</span>
          </div>
        </div>
        <p class="model-header__desc">${model.description}</p>
      </div>

      <!-- Sub-tabs -->
      <div class="model-subtabs" data-model="${modelKey}">
        <button class="model-subtab active" data-subtab="visualizar">👁️ Visualizar</button>
        <button class="model-subtab" data-subtab="planificar">📋 Planificar</button>
        <button class="model-subtab" data-subtab="comunicar">💬 Comunicar</button>
        <button class="model-subtab" data-subtab="proscons">⚖️ Pros & Contras</button>
        <button class="model-subtab model-subtab--special" data-subtab="caso">🎮 Caso Real y Simulación</button>
      </div>

      <!-- Visualizar Panel -->
      <div class="model-panel active" data-panel="visualizar">
        <h4 class="model-panel__title">
          <span class="model-panel__title-icon">👁️</span>
          Visualizar — Representación Gráfica
        </h4>
        <p class="model-panel__text">${model.visualizar.text}</p>
        ${model.visualizar.diagram ? `<div class="model-diagram">${getDiagram(model.visualizar.diagram)}</div>` : ''}
        <ul class="model-panel__list">
          ${model.visualizar.points.map(p => `<li>${p}</li>`).join('')}
        </ul>
      </div>

      <!-- Planificar Panel -->
      <div class="model-panel" data-panel="planificar">
        <h4 class="model-panel__title">
          <span class="model-panel__title-icon">📋</span>
          Planificar — Decisiones, Sprints y Riesgos
        </h4>
        <p class="model-panel__text">${model.planificar.text}</p>
        <ul class="model-panel__list">
          ${model.planificar.points.map(p => `<li>${p}</li>`).join('')}
        </ul>
      </div>

      <!-- Comunicar Panel -->
      <div class="model-panel" data-panel="comunicar">
        <h4 class="model-panel__title">
          <span class="model-panel__title-icon">💬</span>
          Comunicar — Lenguaje Común del Equipo
        </h4>
        <p class="model-panel__text">${model.comunicar.text}</p>
        <ul class="model-panel__list">
          ${model.comunicar.points.map(p => `<li>${p}</li>`).join('')}
        </ul>
      </div>

      <!-- Pros/Cons Panel -->
      <div class="model-panel" data-panel="proscons">
        <h4 class="model-panel__title">
          <span class="model-panel__title-icon">⚖️</span>
          Ventajas y Desventajas
        </h4>
        <div class="pros-cons">
          <div class="pros-cons__column pros-cons__column--pros">
            <h5 class="pros-cons__title">✅ Ventajas</h5>
            <ul class="pros-cons__list">
              ${model.pros.map(p => `<li>${p}</li>`).join('')}
            </ul>
          </div>
          <div class="pros-cons__column pros-cons__column--cons">
            <h5 class="pros-cons__title">❌ Desventajas</h5>
            <ul class="pros-cons__list">
              ${model.cons.map(p => `<li>${p}</li>`).join('')}
            </ul>
          </div>
        </div>
      </div>

      <!-- Case Study & Interactive Panel -->
      <div class="model-panel" data-panel="caso">
        <h4 class="model-panel__title">
          <span class="model-panel__title-icon">🏢</span>
          Caso de Uso Real
        </h4>
        <div class="case-study">
          <h5 class="case-study__title">📍 Caso Real en la Industria</h5>
          <p class="case-study__company">${model.caseStudy.company}</p>
          <p class="case-study__text">${model.caseStudy.description}</p>
        </div>

        <h4 class="model-panel__title" style="margin-top: 2rem;">
          <span class="model-panel__title-icon">🎮</span>
          Simulación Interactiva
        </h4>
        <div class="interactive-container" id="interactive-${modelKey}">
          ${getInteractiveHTML(modelKey)}
        </div>
      </div>
    </div>
  `;
}

// ============================================
// INTERACTIVE SIMULATIONS
// ============================================
function getInteractiveHTML(modelKey) {
  switch(modelKey) {
    case 'microservicios':
      return `
        <div class="sim-microservices">
          <p class="sim-desc">Simula tráfico. Observa cómo cada microservicio escala de forma independiente al llegar al 100% de carga.</p>
          <div class="sim-grid">
            <div class="sim-service" id="sim-svc-user">
              <h5>👤 User Svc</h5>
              <div class="sim-load"><div class="sim-load-bar" style="width: 0%"></div></div>
              <div class="sim-instances">Instancias: <span>1</span></div>
              <button class="btn btn--primary btn--sm" onclick="simulateTraffic('user')">Enviar Tráfico</button>
            </div>
            <div class="sim-service" id="sim-svc-order">
              <h5>🛒 Order Svc</h5>
              <div class="sim-load"><div class="sim-load-bar" style="width: 0%"></div></div>
              <div class="sim-instances">Instancias: <span>1</span></div>
              <button class="btn btn--primary btn--sm" onclick="simulateTraffic('order')">Enviar Tráfico</button>
            </div>
            <div class="sim-service" id="sim-svc-payment">
              <h5>💰 Payment Svc</h5>
              <div class="sim-load"><div class="sim-load-bar" style="width: 0%"></div></div>
              <div class="sim-instances">Instancias: <span>1</span></div>
              <button class="btn btn--primary btn--sm" onclick="simulateTraffic('payment')">Enviar Tráfico</button>
            </div>
          </div>
        </div>
      `;
    case 'capas':
      return `
        <div class="sim-layers">
          <p class="sim-desc">Envía una petición. Observa cómo atraviesa secuencialmente cada capa hacia abajo y hacia arriba.</p>
          <button class="btn btn--primary" id="sim-layer-btn" onclick="simulateLayerRequest()">Enviar Petición (Request)</button>
          <div class="sim-layer-stack">
            <div class="sim-layer" id="layer-ui">🖥️ Presentación</div>
            <div class="sim-layer-arrow" id="arrow-1">↓</div>
            <div class="sim-layer" id="layer-biz">⚙️ Negocio</div>
            <div class="sim-layer-arrow" id="arrow-2">↓</div>
            <div class="sim-layer" id="layer-data">🔌 Datos</div>
            <div class="sim-layer-arrow" id="arrow-3">↓</div>
            <div class="sim-layer" id="layer-db">🗄️ Base de Datos</div>
          </div>
        </div>
      `;
    case 'eventos':
      return `
        <div class="sim-events">
          <p class="sim-desc">Publica un evento. Observa cómo el Broker lo distribuye y los consumidores reaccionan asíncronamente.</p>
          <div class="sim-producer">
            <button class="btn btn--primary" onclick="simulateEvent()">📢 Publicar Evento "OrderCreated"</button>
          </div>
          <div class="sim-broker" id="sim-broker">
            Event Broker (Kafka)
            <div class="event-dot"></div>
          </div>
          <div class="sim-consumers">
            <div class="sim-consumer" id="sim-cons-email">📧 Email Svc <br><small>Esperando...</small></div>
            <div class="sim-consumer" id="sim-cons-analytics">📊 Analytics <br><small>Esperando...</small></div>
            <div class="sim-consumer" id="sim-cons-inventory">📦 Inventory <br><small>Esperando...</small></div>
          </div>
        </div>
      `;
    case 'cliente-servidor':
      return `
        <div class="sim-cs">
          <p class="sim-desc">Añade clientes y envía peticiones al servidor centralizado. ¡Cuidado con sobrecargarlo!</p>
          <div class="sim-cs-controls">
            <button class="btn btn--ghost btn--sm" onclick="addClient()">+ Añadir Cliente</button>
          </div>
          <div class="sim-cs-layout">
            <div class="sim-clients" id="sim-clients">
              <div class="sim-client"><button class="btn btn--primary btn--sm" onclick="sendCsRequest(this)">Petición</button></div>
            </div>
            <div class="sim-server" id="sim-server">
              <h4>🖥️ Servidor Central</h4>
              <div class="sim-load"><div class="sim-load-bar" id="sim-server-load" style="width: 0%"></div></div>
              <small>Carga actual</small>
            </div>
          </div>
        </div>
      `;
    case 'hexagonal':
      return `
        <div class="sim-hex">
          <p class="sim-desc">Cambia los adaptadores externos. Observa cómo el dominio central se mantiene intacto.</p>
          <div class="sim-hex-layout">
            <div class="sim-hex-col">
              <label>Driving Adapter</label>
              <select id="sim-hex-in" onchange="updateHex()">
                <option value="REST API">🌐 REST API</option>
                <option value="GraphQL">🔮 GraphQL</option>
                <option value="CLI Tool">💻 CLI Tool</option>
              </select>
              <div class="sim-hex-adapter" id="hex-adapter-in">REST API</div>
            </div>
            <div class="sim-hex-core" id="hex-core">
              <h4>⬡ Dominio</h4>
              <small>Lógica de negocio<br>100% Pura</small>
            </div>
            <div class="sim-hex-col">
              <label>Driven Adapter</label>
              <select id="sim-hex-out" onchange="updateHex()">
                <option value="PostgreSQL">🗄️ PostgreSQL</option>
                <option value="MongoDB">🍃 MongoDB</option>
                <option value="AWS S3">☁️ AWS S3</option>
              </select>
              <div class="sim-hex-adapter" id="hex-adapter-out">PostgreSQL</div>
            </div>
          </div>
        </div>
      `;
    default:
      return '';
  }
}

const simState = {
  microservices: { user: 0, order: 0, payment: 0 },
  csLoad: 0
};

window.simulateTraffic = function(svc) {
  const bar = document.querySelector(`#sim-svc-${svc} .sim-load-bar`);
  const inst = document.querySelector(`#sim-svc-${svc} .sim-instances span`);
  if(!bar || !inst) return;
  
  simState.microservices[svc] += 30;
  let load = simState.microservices[svc];
  
  if (load >= 100) {
    inst.textContent = parseInt(inst.textContent) + 1;
    inst.style.color = 'var(--accent-emerald)';
    setTimeout(() => inst.style.color = '', 500);
    simState.microservices[svc] = 0;
    load = 0;
    bar.style.backgroundColor = 'var(--accent-emerald)';
    setTimeout(() => { bar.style.backgroundColor = 'var(--accent-primary)'; }, 500);
  }
  
  bar.style.width = load + '%';
};

window.simulateLayerRequest = function() {
  const btn = document.getElementById('sim-layer-btn');
  if(btn.disabled) return;
  btn.disabled = true;
  
  const layers = ['layer-ui', 'layer-biz', 'layer-data', 'layer-db'];
  const arrows = ['arrow-1', 'arrow-2', 'arrow-3'];
  
  let delay = 0;
  // Downward
  layers.forEach((l, i) => {
    setTimeout(() => {
      document.getElementById(l).classList.add('active-layer');
      if(i > 0) document.getElementById(arrows[i-1]).classList.add('active-arrow', 'down');
    }, delay);
    delay += 300;
  });
  
  // Upward
  setTimeout(() => {
    let upDelay = 0;
    for(let i = layers.length - 1; i >= 0; i--) {
      setTimeout(() => {
        document.getElementById(layers[i]).classList.remove('active-layer');
        document.getElementById(layers[i]).classList.add('active-layer-up');
        setTimeout(() => document.getElementById(layers[i]).classList.remove('active-layer-up'), 300);
        
        if(i > 0) {
          document.getElementById(arrows[i-1]).classList.remove('active-arrow', 'down');
          document.getElementById(arrows[i-1]).classList.add('active-arrow', 'up');
          document.getElementById(arrows[i-1]).textContent = '↑';
          setTimeout(() => {
            document.getElementById(arrows[i-1]).classList.remove('active-arrow', 'up');
            document.getElementById(arrows[i-1]).textContent = '↓';
          }, 300);
        }
      }, upDelay);
      upDelay += 300;
    }
  }, delay + 200);
  
  setTimeout(() => { btn.disabled = false; }, delay + 200 + (layers.length*300));
};

window.simulateEvent = function() {
  const dot = document.querySelector('.event-dot');
  const consumers = ['sim-cons-email', 'sim-cons-analytics', 'sim-cons-inventory'];
  
  dot.classList.add('moving');
  
  setTimeout(() => {
    dot.classList.remove('moving');
    consumers.forEach((c, index) => {
      setTimeout(() => {
        const el = document.getElementById(c);
        el.classList.add('active-consumer');
        const small = el.querySelector('small');
        small.textContent = '¡Procesado!';
        small.style.color = 'var(--accent-emerald)';
        setTimeout(() => {
          el.classList.remove('active-consumer');
          small.textContent = 'Esperando...';
          small.style.color = '';
        }, 1500);
      }, index * 100);
    });
  }, 500);
};

window.addClient = function() {
  const container = document.getElementById('sim-clients');
  if (container.children.length >= 8) {
    alert("Límite de clientes alcanzado en simulación.");
    return;
  }
  const div = document.createElement('div');
  div.className = 'sim-client';
  div.innerHTML = `<button class="btn btn--primary btn--sm" onclick="sendCsRequest(this)">Petición</button>`;
  container.appendChild(div);
};

window.sendCsRequest = function(btn) {
  btn.classList.add('sending');
  setTimeout(() => btn.classList.remove('sending'), 200);
  
  simState.csLoad += 20;
  const bar = document.getElementById('sim-server-load');
  const server = document.getElementById('sim-server');
  
  if (simState.csLoad > 100) simState.csLoad = 100;
  bar.style.width = simState.csLoad + '%';
  
  if (simState.csLoad >= 80) {
    server.classList.add('server-overload');
    bar.style.backgroundColor = 'var(--accent-rose)';
  } else {
    server.classList.remove('server-overload');
    bar.style.backgroundColor = 'var(--accent-primary)';
  }
  
  setTimeout(() => {
    simState.csLoad -= 20;
    if (simState.csLoad < 0) simState.csLoad = 0;
    bar.style.width = simState.csLoad + '%';
    if (simState.csLoad < 80) {
      server.classList.remove('server-overload');
      bar.style.backgroundColor = 'var(--accent-primary)';
    }
  }, 1000);
};

window.updateHex = function() {
  const inVal = document.getElementById('sim-hex-in').value;
  const outVal = document.getElementById('sim-hex-out').value;
  
  const inAd = document.getElementById('hex-adapter-in');
  const outAd = document.getElementById('hex-adapter-out');
  const core = document.getElementById('hex-core');
  
  inAd.style.transform = 'scale(0.8)';
  outAd.style.transform = 'scale(0.8)';
  inAd.style.opacity = 0;
  outAd.style.opacity = 0;
  
  setTimeout(() => {
    inAd.textContent = inVal;
    outAd.textContent = outVal;
    inAd.style.transform = 'scale(1)';
    outAd.style.transform = 'scale(1)';
    inAd.style.opacity = 1;
    outAd.style.opacity = 1;
    
    core.classList.add('core-pulse');
    setTimeout(() => core.classList.remove('core-pulse'), 500);
  }, 300);
};

// ============================================
// HERO CANVAS - NETWORK ANIMATION
// ============================================
function initHeroCanvas() {
  const canvas = document.getElementById('hero-canvas');
  if (!canvas) return;
  
  const ctx = canvas.getContext('2d');
  let animationId;
  let particles = [];
  const PARTICLE_COUNT = 60;
  const CONNECTION_DISTANCE = 150;

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  function createParticles() {
    particles = [];
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        radius: Math.random() * 2 + 1,
        color: Math.random() > 0.5 ? 'rgba(99, 102, 241,' : 'rgba(6, 182, 212,'
      });
    }
  }

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particles.forEach((p, i) => {
      p.x += p.vx;
      p.y += p.vy;

      if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
      if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

      // Draw particle
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fillStyle = p.color + '0.6)';
      ctx.fill();

      // Draw connections
      for (let j = i + 1; j < particles.length; j++) {
        const dx = p.x - particles[j].x;
        const dy = p.y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < CONNECTION_DISTANCE) {
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = p.color + (0.15 * (1 - dist / CONNECTION_DISTANCE)) + ')';
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }
    });

    animationId = requestAnimationFrame(animate);
  }

  resize();
  createParticles();
  animate();

  window.addEventListener('resize', () => {
    resize();
    createParticles();
  });
}

// ============================================
// COUNTER ANIMATION
// ============================================
function animateCounters() {
  const counters = document.querySelectorAll('[data-count]');
  counters.forEach(counter => {
    const target = parseInt(counter.getAttribute('data-count'));
    let current = 0;
    const duration = 2000;
    const step = target / (duration / 16);

    function updateCounter() {
      current += step;
      if (current >= target) {
        counter.textContent = target;
      } else {
        counter.textContent = Math.floor(current);
        requestAnimationFrame(updateCounter);
      }
    }

    const observer = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        updateCounter();
        observer.disconnect();
      }
    });

    observer.observe(counter);
  });
}

// ============================================
// SCROLL REVEAL
// ============================================
function initScrollReveal() {
  const reveals = document.querySelectorAll(
    '.pillar-card, .matrix__cell, .most-used__card, .decision-card, .comparison__table-wrapper'
  );

  reveals.forEach((el, i) => {
    el.classList.add('reveal');
    if (i % 3 === 1) el.classList.add('reveal-delay-1');
    if (i % 3 === 2) el.classList.add('reveal-delay-2');
  });

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
}

// ============================================
// NAVIGATION
// ============================================
function initNavigation() {
  const nav = document.getElementById('main-nav');
  const navToggle = document.getElementById('nav-toggle');
  const navLinks = document.querySelector('.nav__links');
  const links = document.querySelectorAll('.nav__link');

  // Scroll behavior
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      nav.classList.add('nav--scrolled');
    } else {
      nav.classList.remove('nav--scrolled');
    }
  });

  // Mobile toggle
  navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('open');
  });

  // Active link tracking
  const sections = document.querySelectorAll('section[id]');
  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
      const top = section.offsetTop - 100;
      if (window.scrollY >= top) {
        current = section.getAttribute('id');
      }
    });
    links.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('data-section') === current) {
        link.classList.add('active');
      }
    });
  });

  // Close mobile nav on link click
  links.forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
    });
  });
}

// ============================================
// MODEL TABS
// ============================================
function initModelTabs() {
  const tabsContainer = document.getElementById('model-tabs');
  const contentContainer = document.getElementById('model-content');

  if (!tabsContainer || !contentContainer) return;

  // Render initial model
  contentContainer.innerHTML = renderModelContent('microservicios');
  initSubTabs();

  // Tab click handler
  tabsContainer.addEventListener('click', (e) => {
    const tab = e.target.closest('.model-tab');
    if (!tab) return;

    // Update active tab
    tabsContainer.querySelectorAll('.model-tab').forEach(t => t.classList.remove('active'));
    tab.classList.add('active');

    // Render content with animation
    const modelKey = tab.getAttribute('data-model');
    contentContainer.style.opacity = '0';
    contentContainer.style.transform = 'translateY(10px)';

    setTimeout(() => {
      contentContainer.innerHTML = renderModelContent(modelKey);
      initSubTabs();
      contentContainer.style.opacity = '1';
      contentContainer.style.transform = 'translateY(0)';
    }, 200);
  });
}

// ============================================
// MODEL SUB-TABS
// ============================================
function initSubTabs() {
  const subtabContainers = document.querySelectorAll('.model-subtabs');
  
  subtabContainers.forEach(container => {
    container.addEventListener('click', (e) => {
      const subtab = e.target.closest('.model-subtab');
      if (!subtab) return;

      const panelId = subtab.getAttribute('data-subtab');
      const parent = container.closest('.model-detail');

      // Update active subtab
      container.querySelectorAll('.model-subtab').forEach(t => t.classList.remove('active'));
      subtab.classList.add('active');

      // Update active panel
      parent.querySelectorAll('.model-panel').forEach(p => p.classList.remove('active'));
      const targetPanel = parent.querySelector(`[data-panel="${panelId}"]`);
      if (targetPanel) {
        targetPanel.classList.add('active');
      }
    });
  });
}

// ============================================
// MODAL
// ============================================
function initModal() {
  const overlay = document.getElementById('modal-overlay');
  const modalContent = document.getElementById('modal-content');
  const closeBtn = document.getElementById('modal-close');

  function openModal(content) {
    modalContent.innerHTML = content;
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    if (!document.startViewTransition || !document.getElementById('modal').style.viewTransitionName) {
      overlay.classList.remove('active');
      document.body.style.overflow = '';
      return;
    }
    
    document.startViewTransition(() => {
      overlay.classList.remove('active');
      document.body.style.overflow = '';
      document.getElementById('modal').style.viewTransitionName = '';
    });
  }

  // Category cells trigger modal with View Transitions
  document.querySelectorAll('.matrix__cell').forEach(cell => {
    cell.addEventListener('click', (e) => {
      const category = cell.getAttribute('data-category');
      const data = categoryData[category];
      if (data) {
        if (!document.startViewTransition) {
          openModal(`<h3>${data.title}</h3>${data.content}`);
          return;
        }
        
        // Remove from all first
        document.querySelectorAll('.matrix__cell').forEach(c => c.style.viewTransitionName = '');
        // Apply to clicked cell
        cell.style.viewTransitionName = 'active-category-modal';
        
        const transition = document.startViewTransition(() => {
          openModal(`<h3>${data.title}</h3>${data.content}`);
          document.getElementById('modal').style.viewTransitionName = 'active-category-modal';
        });
      }
    });
  });

  closeBtn.addEventListener('click', closeModal);
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) closeModal();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
  });
}

// ============================================
// SMOOTH SCROLL
// ============================================
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
}

// ============================================
// INIT
// ============================================
document.addEventListener('DOMContentLoaded', () => {
  initHeroCanvas();
  animateCounters();
  initNavigation();
  initModelTabs();
  initModal();
  initSmoothScroll();
  initScrollReveal();
  initChaos();
  
  // Game-like interactions
  initCustomCursor();
  initClickSparks();
  init3DTilt();
  initHeroParallax();
  initSVGTooltips();
});

// ============================================
// GAME-LIKE INTERACTIONS
// ============================================

// 1. Custom Cursor
function initCustomCursor() {
  const cursor = document.getElementById('custom-cursor');
  const follower = document.getElementById('cursor-follower');
  if (!cursor || !follower) return;

  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;
  let followerX = mouseX;
  let followerY = mouseY;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursor.style.left = mouseX + 'px';
    cursor.style.top = mouseY + 'px';
  });

  function renderFollower() {
    followerX += (mouseX - followerX) * 0.15;
    followerY += (mouseY - followerY) * 0.15;
    follower.style.left = followerX + 'px';
    follower.style.top = followerY + 'px';
    requestAnimationFrame(renderFollower);
  }
  renderFollower();

  const interactives = document.querySelectorAll('a, button, select, .matrix__cell, .pillar-card, .decision-card');
  interactives.forEach(el => {
    el.addEventListener('mouseenter', () => {
      cursor.classList.add('hovering');
      follower.classList.add('hovering');
      playHoverSound();
    });
    el.addEventListener('mouseleave', () => {
      cursor.classList.remove('hovering');
      follower.classList.remove('hovering');
    });
  });
}

// 2. Click Sparks
function initClickSparks() {
  document.addEventListener('click', (e) => {
    playClickSound();
    for (let i = 0; i < 6; i++) {
      const spark = document.createElement('div');
      spark.classList.add('click-spark');
      spark.style.left = e.clientX + 'px';
      spark.style.top = e.clientY + 'px';
      
      const angle = (Math.PI * 2 / 6) * i + Math.random() * 0.5;
      const velocity = 20 + Math.random() * 30;
      const tx = Math.cos(angle) * velocity;
      const ty = Math.sin(angle) * velocity;
      
      spark.style.setProperty('--tx', tx + 'px');
      spark.style.setProperty('--ty', ty + 'px');
      
      document.body.appendChild(spark);
      setTimeout(() => spark.remove(), 600);
    }
  });
}

// 3. 3D Tilt Effect
function init3DTilt() {
  const tiltElements = document.querySelectorAll('.pillar-card, .matrix__cell, .decision-card');
  tiltElements.forEach(el => {
    el.classList.add('tilt-element');
    
    // Add glare element dynamically
    const glare = document.createElement('div');
    glare.className = 'tilt-glare';
    el.appendChild(glare);

    el.addEventListener('mousemove', (e) => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const rotateX = ((y - centerY) / centerY) * -10; // Max 10 deg
      const rotateY = ((x - centerX) / centerX) * 10;
      
      el.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
      
      // Move glare
      glare.style.transform = `translate(${x - rect.width}px, ${y - rect.height}px)`;
      glare.style.opacity = '1';
    });
    
    el.addEventListener('mouseleave', () => {
      el.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
      glare.style.opacity = '0';
    });
  });
}

// 6. SVG Tooltips Global Logic
function initSVGTooltips() {
  const tooltip = document.createElement('div');
  tooltip.className = 'global-tooltip';
  document.body.appendChild(tooltip);

  document.addEventListener('mouseover', (e) => {
    const trigger = e.target.closest('.svg-tooltip-trigger');
    if (trigger) {
      const text = trigger.getAttribute('data-tooltip');
      if(text) {
        tooltip.innerHTML = text;
        tooltip.classList.add('show');
      }
    }
  });

  document.addEventListener('mousemove', (e) => {
    if (tooltip.classList.contains('show')) {
      tooltip.style.left = (e.clientX + 15) + 'px';
      tooltip.style.top = (e.clientY + 15) + 'px';
    }
  });

  document.addEventListener('mouseout', (e) => {
    const trigger = e.target.closest('.svg-tooltip-trigger');
    if (trigger) {
      tooltip.classList.remove('show');
    }
  });
}

// 4. Hero Mouse Parallax
function initHeroParallax() {
  const heroContent = document.querySelector('.hero__content');
  if (!heroContent) return;
  
  document.addEventListener('mousemove', (e) => {
    const x = (e.clientX / window.innerWidth - 0.5) * 20;
    const y = (e.clientY / window.innerHeight - 0.5) * 20;
    heroContent.style.transform = `translate(${x}px, ${y}px)`;
  });
}

// 5. Synthesized Sounds
const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
function playSound(freq, type, duration, vol) {
  if(audioCtx.state === 'suspended') return; // Audio context must be resumed by user interaction
  try {
    const oscillator = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();
    
    oscillator.type = type;
    oscillator.frequency.setValueAtTime(freq, audioCtx.currentTime);
    
    gainNode.gain.setValueAtTime(vol, audioCtx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + duration);
    
    oscillator.connect(gainNode);
    gainNode.connect(audioCtx.destination);
    
    oscillator.start();
    oscillator.stop(audioCtx.currentTime + duration);
  } catch(e) {
    // Ignore audio errors
  }
}

function playHoverSound() {
  playSound(800, 'sine', 0.1, 0.02);
}

function playClickSound() {
  playSound(400, 'triangle', 0.15, 0.05);
  setTimeout(() => playSound(600, 'sine', 0.2, 0.03), 50);
}

// Initialize Audio Context on first interaction
document.body.addEventListener('click', () => {
  if (audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
}, { once: true });

