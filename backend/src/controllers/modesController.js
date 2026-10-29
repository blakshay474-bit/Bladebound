const modes = [
  {
    id: 'last-warrior',
    name: 'LAST WARRIOR (SOLO)',
    type: '50 PLAYERS • SOLO',
    badgeType: 'SOLO SURVIVAL',
    queueTime: '~12s',
    activePlayers: 1842,
    maxPlayers: 50,
    desc: 'Drop into the expanding Ashen Eclipse fog. Scavenge ancient weapons and survive until only one warrior remains breathing.'
  },
  {
    id: 'honor-duel',
    name: 'HONOR DUEL (1v1)',
    type: 'RANKED ELO',
    badgeType: 'RANKED COMPETITIVE',
    queueTime: '~5s',
    activePlayers: 630,
    maxPlayers: 2,
    desc: 'Pure competitive swordsmanship in an enclosed sand ring. Best of 5 rounds. No potions, no escape.'
  },
  {
    id: 'castle-siege',
    name: 'CASTLE SIEGE (16v16)',
    type: '16v16 OBJECTIVE',
    badgeType: 'MASSIVE OBJECTIVE',
    queueTime: '~28s',
    activePlayers: 944,
    maxPlayers: 32,
    desc: 'Battering rams, burning oil cauldrons, and throne room breaches. Defend or topple the keep.'
  }
];

const activeTickets = new Map();

export const getModes = (req, res) => {
  res.json({
    success: true,
    count: modes.length,
    data: modes
  });
};

export const joinMatchQueue = (req, res) => {
  const { modeId } = req.body;
  const targetMode = modes.find(m => m.id === modeId || m.name.toLowerCase().includes((modeId || '').toLowerCase())) || modes[0];
  
  const ticketId = `BB-TICKET-${Math.floor(100000 + Math.random() * 900000)}`;
  const waitSeconds = Math.floor(Math.random() * 5) + 3;

  const ticketData = {
    ticketId,
    mode: targetMode,
    status: 'MATCHING',
    region: 'EU-CENTRAL (Frankfurt)',
    ping: '24ms',
    estimatedWaitSeconds: waitSeconds,
    createdAt: new Date().toISOString()
  };

  activeTickets.set(ticketId, ticketData);

  res.json({
    success: true,
    message: `Matchmaking ticket dispatched for ${targetMode.name}`,
    ...ticketData
  });
};

export const getQueueStatus = (req, res) => {
  const { ticketId } = req.params;
  const ticket = activeTickets.get(ticketId);

  if (!ticket) {
    return res.status(404).json({
      success: false,
      message: `Matchmaking ticket '${ticketId}' not found or expired.`
    });
  }

  // Calculate elapsed time
  const elapsedSeconds = (Date.now() - new Date(ticket.createdAt).getTime()) / 1000;
  if (elapsedSeconds > ticket.estimatedWaitSeconds) {
    ticket.status = 'MATCH_FOUND';
    ticket.lobbyId = `LOBBY-VALGOTH-${Math.floor(1000 + Math.random() * 9000)}`;
  }

  res.json({
    success: true,
    data: ticket
  });
};
