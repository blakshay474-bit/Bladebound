import { loadJson } from '../utils/dataLoader.js';

let armouryData = loadJson('armoury.json');

export const getArmoury = (req, res) => {
  const { category, search, rarity } = req.query;
  let items = [...armouryData];

  if (category && category !== 'ALL BLADES') {
    items = items.filter(item => 
      item.category.toLowerCase() === category.toLowerCase()
    );
  }

  if (search) {
    items = items.filter(item => 
      item.name.toLowerCase().includes(search.toLowerCase()) ||
      item.desc.toLowerCase().includes(search.toLowerCase())
    );
  }

  if (rarity) {
    items = items.filter(item => 
      item.rarity.toLowerCase() === rarity.toLowerCase()
    );
  }

  const categories = ['ALL BLADES', 'LONG SWORDS', 'GREAT SWORDS', 'DUAL WEAPONS', 'SHIELDS'];

  res.json({
    success: true,
    count: items.length,
    categories,
    data: items
  });
};

export const getArtifactById = (req, res) => {
  const { id } = req.params;
  const item = armouryData.find(i => i.id === id);
  if (!item) {
    return res.status(404).json({
      success: false,
      message: `Artifact '${id}' not found in the Blacksmith Vault.`
    });
  }
  res.json({
    success: true,
    data: item
  });
};

export const forgeArtifact = (req, res) => {
  const { name, category, rarity, statLabel, tier, special, desc, img } = req.body;

  if (!name || !category) {
    return res.status(400).json({
      success: false,
      message: 'Name and category are required to forge an artifact'
    });
  }

  const newId = name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
  const forgedItem = {
    id: newId,
    name: name.toUpperCase(),
    category: category.toUpperCase(),
    rarity: rarity || 'EPIC',
    rarityBg: 'bg-primary-container text-on-primary-container',
    statLabel: statLabel || 'PWR 85',
    tier: tier || 'TIER IV',
    special: special || 'Special: Dragon Tempering',
    specialColor: 'text-primary',
    desc: desc || 'Forged in kiln dragon fire by arena blacksmiths.',
    img: img || 'https://lh3.googleusercontent.com/aida-public/AB6AXuAm9MalMzo5h7jD-Daesv0UyHQ4sB9gYlFfhbSYvx5aW1-wyFY0I_y0g0DLdRrIKwrp5ieqch74QFuFVdTEp0bVjrcImUPrnJ2jgdhHgc098mu1rhKrD_9j7F5-NZoM7FYNdNagEu9lokUIIkfqACj0wyc1jxuMcFHsS73RvFxBlDumLYqYy5c4yUzarppZqof_Sj2KZD--EdmtYYXXq7u86hmvEuMpT2wDWnkHHv4hQngdsjRR6NBn'
  };

  armouryData.push(forgedItem);

  res.status(201).json({
    success: true,
    message: `Artifact '${forgedItem.name}' successfully forged!`,
    data: forgedItem
  });
};
