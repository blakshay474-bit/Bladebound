const API_BASE_URL = 'http://localhost:5000/api';

/**
 * Health check endpoint
 */
export async function fetchHealth() {
  try {
    const res = await fetch(`${API_BASE_URL}/health`);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return await res.json();
  } catch (err) {
    return { status: 'OFFLINE', error: err.message };
  }
}

/**
 * Fetch champions roster
 */
export async function fetchWarriors(filters = {}) {
  try {
    const query = new URLSearchParams(filters).toString();
    const url = query ? `${API_BASE_URL}/warriors?${query}` : `${API_BASE_URL}/warriors`;
    const res = await fetch(url);
    if (!res.ok) throw new Error('API request failed');
    const json = await res.json();
    return json;
  } catch (err) {
    console.warn('Backend API offline, using fallback', err.message);
    return null;
  }
}

/**
 * Select active champion
 */
export async function postSelectWarrior(id) {
  try {
    const res = await fetch(`${API_BASE_URL}/warriors/select`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id })
    });
    return await res.json();
  } catch (err) {
    return { success: false, error: err.message };
  }
}

/**
 * Compare two champions
 */
export async function fetchWarriorComparison(id1, id2) {
  try {
    const res = await fetch(`${API_BASE_URL}/warriors/compare?id1=${id1}&id2=${id2}`);
    if (!res.ok) throw new Error('API comparison request failed');
    return await res.json();
  } catch (err) {
    return null;
  }
}

/**
 * Fetch battlefield combat zones
 */
export async function fetchZones() {
  try {
    const res = await fetch(`${API_BASE_URL}/zones`);
    if (!res.ok) throw new Error('API request failed');
    const json = await res.json();
    return json;
  } catch (err) {
    return null;
  }
}

/**
 * Fetch live arena match telemetry
 */
export async function fetchArenaTelemetry() {
  try {
    const res = await fetch(`${API_BASE_URL}/zones/telemetry`);
    if (!res.ok) throw new Error('API request failed');
    const json = await res.json();
    return json.data;
  } catch (err) {
    return null;
  }
}

/**
 * Fetch armoury arsenal
 */
export async function fetchArmoury(category, search = '') {
  try {
    const params = new URLSearchParams();
    if (category && category !== 'ALL BLADES') params.set('category', category);
    if (search) params.set('search', search);

    const qs = params.toString();
    const url = qs ? `${API_BASE_URL}/armoury?${qs}` : `${API_BASE_URL}/armoury`;
    const res = await fetch(url);
    if (!res.ok) throw new Error('API request failed');
    const json = await res.json();
    return json.data;
  } catch (err) {
    return null;
  }
}

/**
 * Forge custom weapon
 */
export async function postForgeArtifact(artifactData) {
  try {
    const res = await fetch(`${API_BASE_URL}/armoury/forge`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(artifactData)
    });
    return await res.json();
  } catch (err) {
    return { success: false, error: err.message };
  }
}

/**
 * Fetch warfare game modes
 */
export async function fetchModes() {
  try {
    const res = await fetch(`${API_BASE_URL}/modes`);
    if (!res.ok) throw new Error('API request failed');
    const json = await res.json();
    return json.data;
  } catch (err) {
    return null;
  }
}

/**
 * Join matchmaking queue
 */
export async function postJoinQueue(modeId) {
  try {
    const res = await fetch(`${API_BASE_URL}/modes/join`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ modeId })
    });
    return await res.json();
  } catch (err) {
    return { success: false, error: err.message };
  }
}

/**
 * Poll matchmaking queue status
 */
export async function fetchQueueStatus(ticketId) {
  try {
    const res = await fetch(`${API_BASE_URL}/modes/queue/${ticketId}`);
    if (!res.ok) throw new Error('API request failed');
    const json = await res.json();
    return json.data;
  } catch (err) {
    return null;
  }
}

/**
 * Fetch Hall of Champions leaderboards
 */
export async function fetchLeaderboards(search = '', sortBy = 'elo') {
  try {
    const params = new URLSearchParams();
    if (search) params.set('search', search);
    if (sortBy) params.set('sortBy', sortBy);

    const qs = params.toString();
    const url = qs ? `${API_BASE_URL}/leaderboards?${qs}` : `${API_BASE_URL}/leaderboards`;
    const res = await fetch(url);
    if (!res.ok) throw new Error('API request failed');
    const json = await res.json();
    return json.data;
  } catch (err) {
    return null;
  }
}

/**
 * Fetch warrior profile
 */
export async function fetchProfile() {
  try {
    const res = await fetch(`${API_BASE_URL}/profile`);
    if (!res.ok) throw new Error('API request failed');
    const json = await res.json();
    return json.data;
  } catch (err) {
    return null;
  }
}

/**
 * Update favored equipment loadout
 */
export async function putUpdateLoadout(loadout) {
  try {
    const res = await fetch(`${API_BASE_URL}/profile/loadout`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ loadout })
    });
    return await res.json();
  } catch (err) {
    return { success: false, error: err.message };
  }
}

/**
 * Execute combat action on the server
 */
export async function postCombatAction(action, currentHp, currentStamina, currentKills, currentArmour) {
  try {
    const res = await fetch(`${API_BASE_URL}/combat/action`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action, currentHp, currentStamina, currentKills, currentArmour })
    });
    return await res.json();
  } catch (err) {
    return null;
  }
}

/**
 * Reset combat session
 */
export async function postResetCombat() {
  try {
    const res = await fetch(`${API_BASE_URL}/combat/reset`, {
      method: 'POST'
    });
    return await res.json();
  } catch (err) {
    return null;
  }
}
