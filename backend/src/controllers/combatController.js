// In-memory combat session state
let combatSession = {
  hp: 820,
  maxHp: 1000,
  armour: 94,
  stamina: 65,
  maxStamina: 100,
  kills: 7,
  comboCount: 0,
  enemyHp: 650,
  maxEnemyHp: 1000,
  activeBuff: null,
  history: []
};

export const getCombatState = (req, res) => {
  res.json({
    success: true,
    data: combatSession
  });
};

export const resetCombatSession = (req, res) => {
  combatSession = {
    hp: 820,
    maxHp: 1000,
    armour: 94,
    stamina: 65,
    maxStamina: 100,
    kills: 7,
    comboCount: 0,
    enemyHp: 650,
    maxEnemyHp: 1000,
    activeBuff: null,
    history: []
  };

  res.json({
    success: true,
    message: 'Combat simulator session reset to default parameters',
    data: combatSession
  });
};

export const processCombatAction = (req, res) => {
  const { 
    action, 
    currentHp = combatSession.hp, 
    currentStamina = combatSession.stamina, 
    currentKills = combatSession.kills,
    currentArmour = combatSession.armour
  } = req.body;

  let staminaCost = 10;
  let resultMsg = 'ACTION EXECUTED';
  let killsDelta = 0;
  let isCrit = false;
  let damageDealt = 0;
  let hpRestored = 0;

  switch (action) {
    case 'PARRY':
      staminaCost = 10;
      resultMsg = 'FRAME-PERFECT PARRY! Attacker staggered!';
      isCrit = true;
      damageDealt = 180;
      combatSession.comboCount += 1;
      break;

    case 'DODGE':
      staminaCost = 15;
      resultMsg = 'EVASIVE ROLL EXECUTED! 120ms I-Frames active.';
      damageDealt = 0;
      break;

    case 'HEAVY':
      staminaCost = 25;
      resultMsg = 'HEAVY GUARD-BREAK CRUSH! Poise bar shattered!';
      killsDelta = 1;
      isCrit = true;
      damageDealt = 320;
      combatSession.comboCount += 2;
      break;

    case 'SLASH':
      staminaCost = 12;
      resultMsg = 'PRIMARY RUNIC SLASH HIT! Clean edge penetration.';
      killsDelta = 1;
      damageDealt = 145;
      combatSession.comboCount += 1;
      break;

    case 'EXECUTION':
      staminaCost = 35;
      resultMsg = 'RUNIC BLOODSTONE EXECUTION! Lethal finisher!';
      killsDelta = 2;
      isCrit = true;
      damageDealt = 999;
      combatSession.comboCount += 3;
      break;

    case 'POTION':
      staminaCost = 5;
      hpRestored = 180;
      resultMsg = 'CRIMSON VIAL CONSUMED! +180 HP restored.';
      damageDealt = 0;
      break;

    default:
      staminaCost = 8;
      resultMsg = `${action} PERFORMED`;
      damageDealt = 50;
  }

  // Calculate new telemetry
  const newStamina = Math.max(10, currentStamina - staminaCost);
  const newHp = Math.min(combatSession.maxHp, currentHp + hpRestored);
  const newKills = currentKills + killsDelta;
  const newEnemyHp = Math.max(0, combatSession.enemyHp - damageDealt);

  // Update session state
  combatSession.hp = newHp;
  combatSession.stamina = newStamina;
  combatSession.kills = newKills;
  combatSession.armour = currentArmour;
  combatSession.enemyHp = newEnemyHp <= 0 ? 650 : newEnemyHp; // Respawn next opponent if downed

  const logEntry = {
    timestamp: new Date().toLocaleTimeString(),
    action,
    message: resultMsg,
    damageDealt,
    isCrit
  };

  combatSession.history.unshift(logEntry);
  if (combatSession.history.length > 20) combatSession.history.pop();

  res.json({
    success: true,
    action,
    message: resultMsg,
    telemetry: {
      hp: newHp,
      maxHp: combatSession.maxHp,
      stamina: newStamina,
      maxStamina: combatSession.maxStamina,
      staminaCost,
      armour: combatSession.armour,
      kills: newKills,
      killsDelta,
      isCrit,
      damageDealt,
      comboCount: combatSession.comboCount,
      enemyHp: combatSession.enemyHp
    },
    latestLog: logEntry
  });
};
