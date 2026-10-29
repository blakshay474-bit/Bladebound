/**
 * Automated Test Suite for Bladebound Arena Backend API
 */

const BASE_URL = 'http://localhost:5000/api';

async function runTests() {
  console.log('⚔️  STARTING BLADEBOUND API VERIFICATION SUITE\n');
  let passed = 0;
  let failed = 0;

  async function test(name, fn) {
    try {
      await fn();
      console.log(`  ✅ PASS: ${name}`);
      passed++;
    } catch (err) {
      console.error(`  ❌ FAIL: ${name} ->`, err.message);
      failed++;
    }
  }

  // 1. Health & Discovery
  await test('GET /health returns 200 ONLINE', async () => {
    const res = await fetch(`${BASE_URL}/health`);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    if (data.status !== 'ONLINE') throw new Error(`Unexpected status: ${data.status}`);
  });

  await test('GET / returns API catalog', async () => {
    const res = await fetch(`${BASE_URL}`);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    if (!data.endpoints) throw new Error('Missing endpoints catalog');
  });

  // 2. Warriors
  await test('GET /warriors returns champion roster', async () => {
    const res = await fetch(`${BASE_URL}/warriors`);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    if (!Array.isArray(data.data) || data.data.length < 5) throw new Error('Invalid warriors array');
    if (!data.byId['knight']) throw new Error('Missing byId map');
  });

  await test('GET /warriors/:id returns specific warrior', async () => {
    const res = await fetch(`${BASE_URL}/warriors/berserker`);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    if (data.data.id !== 'berserker') throw new Error('Wrong warrior returned');
  });

  await test('GET /warriors/compare compares stats', async () => {
    const res = await fetch(`${BASE_URL}/warriors/compare?id1=knight&id2=berserker`);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    if (!data.comparison.delta) throw new Error('Missing comparison delta');
  });

  await test('POST /warriors/select locks champion', async () => {
    const res = await fetch(`${BASE_URL}/warriors/select`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: 'duelist' })
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    if (data.selectedWarriorId !== 'duelist') throw new Error('Failed to lock champion');
  });

  // 3. Zones
  await test('GET /zones returns battlefield sectors', async () => {
    const res = await fetch(`${BASE_URL}/zones`);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    if (data.count < 5) throw new Error('Expected at least 5 zones');
  });

  await test('GET /zones/telemetry returns dynamic live match data', async () => {
    const res = await fetch(`${BASE_URL}/zones/telemetry`);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    if (!data.data.warriorsAlive) throw new Error('Missing telemetry data');
  });

  // 4. Armoury
  await test('GET /armoury returns arsenal items', async () => {
    const res = await fetch(`${BASE_URL}/armoury`);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    if (data.count === 0) throw new Error('No armoury items found');
  });

  await test('GET /armoury?category=LONG%20SWORDS filters correctly', async () => {
    const res = await fetch(`${BASE_URL}/armoury?category=${encodeURIComponent('LONG SWORDS')}`);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    if (!data.data.every(i => i.category === 'LONG SWORDS')) throw new Error('Category filter failed');
  });

  await test('POST /armoury/forge crafts custom weapon', async () => {
    const res = await fetch(`${BASE_URL}/armoury/forge`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'Thunder Glaive',
        category: 'POLEARMS',
        statLabel: 'PWR 99',
        tier: 'TIER V'
      })
    });
    if (res.status !== 201) throw new Error(`Expected 201, got ${res.status}`);
  });

  // 5. Modes & Matchmaking
  await test('GET /modes returns warfare game modes', async () => {
    const res = await fetch(`${BASE_URL}/modes`);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    if (data.data.length < 3) throw new Error('Missing game modes');
  });

  let testTicketId = '';
  await test('POST /modes/join issues matchmaking ticket', async () => {
    const res = await fetch(`${BASE_URL}/modes/join`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ modeId: 'honor-duel' })
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    if (!data.ticketId) throw new Error('Missing ticketId');
    testTicketId = data.ticketId;
  });

  await test('GET /modes/queue/:ticketId checks ticket status', async () => {
    const res = await fetch(`${BASE_URL}/modes/queue/${testTicketId}`);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    if (!data.data.status) throw new Error('Missing ticket status');
  });

  // 6. Leaderboards
  await test('GET /leaderboards returns Hall of Champions', async () => {
    const res = await fetch(`${BASE_URL}/leaderboards`);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    if (data.count === 0) throw new Error('No leaderboard records found');
  });

  await test('GET /leaderboards?search=NIGHT filters warriors', async () => {
    const res = await fetch(`${BASE_URL}/leaderboards?search=NIGHT`);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    if (!data.data.some(w => w.name.includes('NIGHT'))) throw new Error('Search failed');
  });

  // 7. Profile
  await test('GET /profile returns warrior records', async () => {
    const res = await fetch(`${BASE_URL}/profile`);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    if (!data.data.stats || !data.data.loadout) throw new Error('Incomplete profile data');
  });

  await test('PUT /profile/loadout updates equipped gear', async () => {
    const res = await fetch(`${BASE_URL}/profile/loadout`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ loadout: 'Kingslayer Greatsword + Bastion Wall' })
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    if (!data.data.loadout.includes('Kingslayer')) throw new Error('Loadout update failed');
  });

  // 8. Combat HUD Engine
  await test('POST /combat/action executes frame-perfect parry', async () => {
    const res = await fetch(`${BASE_URL}/combat/action`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        action: 'PARRY',
        currentHp: 800,
        currentStamina: 60,
        currentKills: 7
      })
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    if (!data.telemetry.isCrit) throw new Error('Parry should yield critical strike');
  });

  await test('POST /combat/action executes guard-break heavy strike', async () => {
    const res = await fetch(`${BASE_URL}/combat/action`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        action: 'HEAVY',
        currentHp: 800,
        currentStamina: 60,
        currentKills: 7
      })
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    if (data.telemetry.damageDealt !== 320) throw new Error('Damage calculation mismatch');
  });

  console.log('\n=======================================');
  console.log(`TOTAL TESTS: ${passed + failed}`);
  console.log(`PASSED: ${passed}`);
  console.log(`FAILED: ${failed}`);
  console.log('=======================================');

  if (failed > 0) process.exit(1);
}

runTests();
