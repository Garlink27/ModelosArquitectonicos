export function initChaos() {
  const canvasMono = document.getElementById('canvas-mono');
  const canvasCs = document.getElementById('canvas-cs');
  const canvasLayered = document.getElementById('canvas-layered');
  const canvasEvents = document.getElementById('canvas-events');
  const canvasMicro = document.getElementById('canvas-micro');
  const canvasHex = document.getElementById('canvas-hex');

  if (!canvasCs || !canvasLayered || !canvasEvents || !canvasMicro || !canvasMono || !canvasHex) return;

  const ctxMono = canvasMono.getContext('2d');
  const ctxCs = canvasCs.getContext('2d');
  const ctxLayered = canvasLayered.getContext('2d');
  const ctxEvents = canvasEvents.getContext('2d');
  const ctxMicro = canvasMicro.getContext('2d');
  const ctxHex = canvasHex.getContext('2d');
  
  let animationId;
  let isDdos = false;
  let latencyMultiplier = 1.0;
  
  const ctxMap = {
    mono: ctxMono,
    cs: ctxCs,
    layered: ctxLayered,
    events: ctxEvents,
    micro: ctxMicro,
    hex: ctxHex
  };

  let packets = {
    mono: [],
    cs: [],
    layered: [],
    events: [],
    micro: [],
    hex: []
  };

  const colors = {
    nodeOk: 'rgba(16, 185, 129, 0.2)',
    nodeOkBorder: '#10b981',
    nodeDead: 'rgba(239, 68, 68, 0.4)',
    nodeDeadBorder: '#ef4444',
    nodeOverload: 'rgba(245, 158, 11, 0.4)',
    nodeOverloadBorder: '#f59e0b',
    packet: '#6366f1',
    packetFail: '#ef4444',
    packetSlow: '#8b5cf6'
  };

  // Node structures
  const archs = {
    mono: {
      nodes: {
        client: { x: 120, y: 15, w: 60, h: 30, state: 'ok', name: 'Clientes' },
        app: { x: 70, y: 90, w: 160, h: 120, state: 'ok', name: 'Monolito (App + DB)' }
      },
      flows: [['client', 'app']]
    },
    cs: {
      nodes: {
        client: { x: 120, y: 15, w: 60, h: 30, state: 'ok', name: 'Clientes' },
        app: { x: 100, y: 90, w: 100, h: 50, state: 'ok', name: 'Servidor' },
        db: { x: 110, y: 180, w: 80, h: 40, state: 'ok', name: 'Base de Datos' }
      },
      flows: [['client', 'app', 'db']]
    },
    layered: {
      nodes: {
        client: { x: 120, y: 10, w: 60, h: 25, state: 'ok', name: 'Clientes' },
        pres: { x: 90, y: 60, w: 120, h: 30, state: 'ok', name: 'Presentación' },
        bus: { x: 90, y: 120, w: 120, h: 30, state: 'ok', name: 'Negocio' },
        data: { x: 90, y: 180, w: 120, h: 30, state: 'ok', name: 'Datos' },
        db: { x: 110, y: 230, w: 80, h: 20, state: 'ok', name: 'BD' }
      },
      flows: [['client', 'pres', 'bus', 'data', 'db']]
    },
    events: {
      nodes: {
        pub: { x: 120, y: 15, w: 60, h: 30, state: 'ok', name: 'Producer' },
        broker: { x: 80, y: 90, w: 140, h: 40, state: 'ok', name: 'Event Bus' },
        consA: { x: 15, y: 180, w: 65, h: 40, state: 'ok', name: 'Cons. A' },
        consB: { x: 115, y: 180, w: 70, h: 40, state: 'ok', name: 'Cons. B' },
        consC: { x: 220, y: 180, w: 65, h: 40, state: 'ok', name: 'Cons. C' }
      },
      flows: [
        ['pub', 'broker', 'consA'],
        ['pub', 'broker', 'consB'],
        ['pub', 'broker', 'consC']
      ]
    },
    micro: {
      nodes: {
        client: { x: 120, y: 10, w: 60, h: 25, state: 'ok', name: 'Clientes' },
        gateway: { x: 90, y: 60, w: 120, h: 30, state: 'ok', name: 'API Gateway' },
        auth: { x: 10, y: 120, w: 75, h: 40, state: 'ok', name: 'Auth Svc' },
        inv: { x: 110, y: 120, w: 80, h: 40, state: 'ok', name: 'Inventario' },
        pay: { x: 215, y: 120, w: 75, h: 40, state: 'ok', name: 'Pagos' },
        authDb: { x: 10, y: 190, w: 75, h: 35, state: 'ok', name: 'Auth DB' },
        invDb: { x: 110, y: 190, w: 80, h: 35, state: 'ok', name: 'Inv DB' },
        payDb: { x: 215, y: 190, w: 75, h: 35, state: 'ok', name: 'Pay DB' }
      },
      flows: [
        ['client', 'gateway', 'auth', 'authDb'],
        ['client', 'gateway', 'inv', 'invDb'],
        ['client', 'gateway', 'pay', 'payDb']
      ]
    },
    hex: {
      nodes: {
        client: { x: 120, y: 10, w: 60, h: 25, state: 'ok', name: 'Clientes' },
        adapterIn: { x: 90, y: 70, w: 120, h: 30, state: 'ok', name: 'HTTP Adapter' },
        core: { x: 90, y: 120, w: 120, h: 40, state: 'ok', name: 'Dominio (Core)' },
        adapterOut: { x: 90, y: 180, w: 120, h: 30, state: 'ok', name: 'DB Adapter' },
        db: { x: 110, y: 230, w: 80, h: 20, state: 'ok', name: 'BD' }
      },
      flows: [['client', 'adapterIn', 'core', 'adapterOut', 'db']]
    }
  };

  function drawNode(ctx, node) {
    ctx.beginPath();
    ctx.rect(node.x, node.y, node.w, node.h);
    if (node.state === 'dead') {
      ctx.fillStyle = colors.nodeDead;
      ctx.strokeStyle = colors.nodeDeadBorder;
    } else if (node.state === 'overload') {
      ctx.fillStyle = colors.nodeOverload;
      ctx.strokeStyle = colors.nodeOverloadBorder;
    } else {
      ctx.fillStyle = colors.nodeOk;
      ctx.strokeStyle = colors.nodeOkBorder;
    }
    ctx.fill();
    ctx.lineWidth = 2;
    ctx.stroke();

    ctx.fillStyle = '#fff';
    ctx.font = '10px Inter';
    ctx.textAlign = 'center';
    ctx.fillText(node.name, node.x + node.w / 2, node.y + node.h / 2 + 3);
    
    if (node.state === 'dead') {
      ctx.beginPath();
      ctx.moveTo(node.x + 5, node.y + 5);
      ctx.lineTo(node.x + node.w - 5, node.y + node.h - 5);
      ctx.moveTo(node.x + node.w - 5, node.y + 5);
      ctx.lineTo(node.x + 5, node.y + node.h - 5);
      ctx.strokeStyle = '#ef4444';
      ctx.lineWidth = 3;
      ctx.stroke();
    }
  }

  function spawnPacket(archType) {
    const arch = archs[archType];
    const flow = arch.flows[Math.floor(Math.random() * arch.flows.length)];
    
    const packet = {
      flow,
      step: 0,
      x: arch.nodes[flow[0]].x + arch.nodes[flow[0]].w / 2,
      y: arch.nodes[flow[0]].y + arch.nodes[flow[0]].h,
      progress: 0,
      status: 'ok'
    };
    packets[archType].push(packet);
  }

  function updateAndDrawPackets(ctx, pArray, nodes, archType) {
    for (let i = pArray.length - 1; i >= 0; i--) {
      const p = pArray[i];
      const currentNodeId = p.flow[p.step];
      const nextNodeId = p.flow[p.step + 1];
      
      if (!nextNodeId) {
        pArray.splice(i, 1);
        continue;
      }
      
      const currentNode = nodes[currentNodeId];
      const nextNode = nodes[nextNodeId];
      
      // Checking failures
      if (nextNode.state === 'dead' || currentNode.state === 'dead') {
        p.status = 'fail';
      }
      
      // Move speed
      let speed = 0.02 * latencyMultiplier;
      if (isDdos) speed *= 2;
      
      // Exception: Events decouple producer from consumer.
      if (archType === 'events' && p.status === 'fail' && nextNode.state === 'dead' && currentNodeId === 'broker') {
         // Fails between broker and consumer
      } else if (archType === 'events' && p.status === 'fail' && currentNodeId === 'pub' && nodes.broker.state !== 'dead') {
         // actually ok
         p.status = 'ok';
      }

      p.progress += speed;
      
      if (p.progress >= 1) {
        p.step++;
        p.progress = 0;
        if (p.status === 'fail') {
          pArray.splice(i, 1);
          continue;
        }
      } else {
        let startX = currentNode.x + currentNode.w / 2;
        let startY = currentNode.y + currentNode.h;
        let endX = nextNode.x + nextNode.w / 2;
        let endY = nextNode.y;
        
        p.x = startX + (endX - startX) * p.progress;
        p.y = startY + (endY - startY) * p.progress;
        
        // Draw
        ctx.beginPath();
        ctx.arc(p.x, p.y, 3, 0, Math.PI * 2);
        if (p.status === 'fail') ctx.fillStyle = colors.packetFail;
        else if (latencyMultiplier < 1) ctx.fillStyle = colors.packetSlow;
        else ctx.fillStyle = colors.packet;
        ctx.fill();

        if(p.status === 'fail') {
          ctx.strokeStyle = '#ef4444';
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(p.x - 3, p.y - 3); ctx.lineTo(p.x + 3, p.y + 3);
          ctx.moveTo(p.x + 3, p.y - 3); ctx.lineTo(p.x - 3, p.y + 3);
          ctx.stroke();
        }
      }
    }
  }

  function loop() {
    ['mono', 'cs', 'layered', 'events', 'micro', 'hex'].forEach(arch => {
      ctxMap[arch].clearRect(0, 0, 300, 250);
      if (Math.random() < (isDdos ? 0.4 : 0.04)) spawnPacket(arch);
      
      // En hex, draw the hexagon behind the core
      if (arch === 'hex') {
        const c = archs.hex.nodes.core;
        ctxMap.hex.beginPath();
        ctxMap.hex.moveTo(c.x - 20, c.y + c.h/2);
        ctxMap.hex.lineTo(c.x + 10, c.y - 15);
        ctxMap.hex.lineTo(c.x + c.w - 10, c.y - 15);
        ctxMap.hex.lineTo(c.x + c.w + 20, c.y + c.h/2);
        ctxMap.hex.lineTo(c.x + c.w - 10, c.y + c.h + 15);
        ctxMap.hex.lineTo(c.x + 10, c.y + c.h + 15);
        ctxMap.hex.closePath();
        ctxMap.hex.strokeStyle = 'rgba(99, 102, 241, 0.3)';
        ctxMap.hex.lineWidth = 2;
        ctxMap.hex.setLineDash([5, 5]);
        ctxMap.hex.stroke();
        ctxMap.hex.setLineDash([]);
      }

      Object.values(archs[arch].nodes).forEach(n => drawNode(ctxMap[arch], n));
      updateAndDrawPackets(ctxMap[arch], packets[arch], archs[arch].nodes, arch);
    });
    animationId = requestAnimationFrame(loop);
  }

  loop();

  const logBox = document.getElementById('chaos-log');
  function logMsg(msg, type = 'danger') {
    const div = document.createElement('div');
    div.className = `log-entry ${type}`;
    div.innerText = `> ${msg}`;
    logBox.prepend(div);
  }

  function setStatus(arch, status) {
    const el = document.getElementById(`status-${arch}`);
    if(!el) return;
    if (status === 'offline') {
      el.className = 'chaos-status badge badge--high blink';
      el.innerText = 'OFFLINE';
    } else if (status === 'degraded') {
      el.className = 'chaos-status badge badge--mid';
      el.innerText = 'DEGRADED';
    } else {
      el.className = 'chaos-status badge badge--excellent';
      el.innerText = 'ONLINE';
    }
  }

  document.querySelectorAll('.chaos-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const attack = e.target.getAttribute('data-attack');
      
      if (attack === 'reset') {
        Object.values(archs).forEach(a => Object.values(a.nodes).forEach(n => n.state = 'ok'));
        isDdos = false;
        latencyMultiplier = 1.0;
        ['mono', 'cs', 'layered', 'events', 'micro', 'hex'].forEach(a => {
          packets[a] = [];
          setStatus(a, 'online');
        });
        logMsg('Sistemas restaurados.', 'success');
      } 
      else if (attack === 'kill-db') {
        archs.mono.nodes.app.state = 'dead';
        archs.cs.nodes.db.state = 'dead';
        archs.layered.nodes.db.state = 'dead';
        archs.events.nodes.broker.state = 'dead'; 
        archs.micro.nodes.payDb.state = 'dead'; // only 1 micro DB dies
        archs.hex.nodes.db.state = 'dead'; // adapter will fail to connect
        
        logMsg('Ataque: Base de Datos Principal destruida.');
        setStatus('mono', 'offline');
        setStatus('cs', 'offline');
        setStatus('layered', 'offline');
        setStatus('events', 'offline');
        setStatus('micro', 'degraded');
        setStatus('hex', 'degraded'); // the core is still fine, just DB fails
      }
      else if (attack === 'kill-node') {
        archs.mono.nodes.app.state = 'dead';
        archs.cs.nodes.app.state = 'dead';
        archs.layered.nodes.bus.state = 'dead';
        archs.events.nodes.consC.state = 'dead';
        archs.micro.nodes.inv.state = 'dead';
        archs.hex.nodes.adapterIn.state = 'dead'; // HTTP interface goes down
        
        logMsg('Ataque: Componente secundario derribado.');
        setStatus('mono', 'offline');
        setStatus('cs', 'offline');
        setStatus('layered', 'offline');
        setStatus('events', 'degraded');
        setStatus('micro', 'degraded');
        setStatus('hex', 'offline');
      }
      else if (attack === 'ddos') {
        isDdos = true;
        logMsg('Ataque DDoS: Tráfico masivo entrante.', 'warning');
        
        archs.mono.nodes.app.state = 'overload';
        archs.cs.nodes.app.state = 'overload';
        archs.layered.nodes.pres.state = 'overload';
        archs.events.nodes.broker.state = 'overload';
        archs.micro.nodes.gateway.state = 'overload';
        archs.hex.nodes.adapterIn.state = 'overload';
        
        setTimeout(() => {
          if(isDdos) {
             archs.mono.nodes.app.state = 'dead';
             archs.cs.nodes.app.state = 'dead';
             archs.layered.nodes.pres.state = 'dead';
             setStatus('mono', 'offline');
             setStatus('cs', 'offline');
             setStatus('layered', 'offline');
             logMsg('Monolíticos y Capas colapsaron.');
          }
        }, 3000);
      }
      else if (attack === 'latency') {
        latencyMultiplier = 0.2;
        logMsg('Ataque de Red: Latencia inyectada (x5 más lento).', 'warning');
        setStatus('mono', 'degraded');
        setStatus('cs', 'degraded');
        setStatus('layered', 'degraded');
        setStatus('micro', 'degraded');
        setStatus('hex', 'degraded');
        setStatus('events', 'online'); 
      }
    });
  });
}
