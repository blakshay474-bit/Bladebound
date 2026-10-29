import { loadJson } from '../utils/dataLoader.js';

const warriorsData = loadJson('warriors.json');
let selectedWarriorId = 'knight';

// Map by ID for quick lookup
const warriorsById = warriorsData.reduce((acc, warrior) => {
  acc[warrior.id] = warrior;
  return acc;
}, {});

export const getWarriors = (req, res) => {
  const { archetype, difficulty } = req.query;
  let filtered = [...warriorsData];

  if (archetype) {
    filtered = filtered.filter(w => 
      w.archetype.toLowerCase().includes(archetype.toLowerCase())
    );
  }

  if (difficulty) {
    filtered = filtered.filter(w => 
      w.diff.toLowerCase().includes(difficulty.toLowerCase())
    );
  }

  res.json({
    success: true,
    count: filtered.length,
    selectedWarriorId,
    activeWarrior: warriorsById[selectedWarriorId] || warriorsData[0],
    data: filtered,
    byId: warriorsById
  });
};

export const getWarriorById = (req, res) => {
  const { id } = req.params;
  const warrior = warriorsById[id.toLowerCase()];
  if (!warrior) {
    return res.status(404).json({
      success: false,
      message: `Warrior champion with ID '${id}' not found in the Valgoth archives.`
    });
  }
  res.json({
    success: true,
    data: warrior,
    isSelected: warrior.id === selectedWarriorId
  });
};

export const selectWarrior = (req, res) => {
  const { id } = req.body;
  if (!id) {
    return res.status(400).json({
      success: false,
      message: 'Champion ID is required in request body'
    });
  }

  const warrior = warriorsById[id.toLowerCase()];
  if (!warrior) {
    return res.status(404).json({
      success: false,
      message: `Invalid warrior ID '${id}'. Champion does not exist.`
    });
  }

  selectedWarriorId = warrior.id;
  res.json({
    success: true,
    message: `Champion ${warrior.title} locked and deployed to frontline!`,
    selectedWarriorId,
    data: warrior
  });
};

export const compareWarriors = (req, res) => {
  const { id1, id2 } = req.query;
  if (!id1 || !id2) {
    return res.status(400).json({
      success: false,
      message: 'Query parameters id1 and id2 are required for comparison'
    });
  }

  const warrior1 = warriorsById[id1.toLowerCase()];
  const warrior2 = warriorsById[id2.toLowerCase()];

  if (!warrior1 || !warrior2) {
    return res.status(404).json({
      success: false,
      message: 'One or both warriors specified could not be found'
    });
  }

  res.json({
    success: true,
    comparison: {
      warrior1,
      warrior2,
      delta: {
        atk: warrior1.atk - warrior2.atk,
        def: warrior1.def - warrior2.def,
        spd: warrior1.spd - warrior2.spd
      }
    }
  });
};
