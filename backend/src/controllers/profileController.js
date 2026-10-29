import { loadJson } from '../utils/dataLoader.js';

let profileData = loadJson('profile.json');

export const getProfile = (req, res) => {
  res.json({
    success: true,
    data: profileData
  });
};

export const updateLoadout = (req, res) => {
  const { loadout } = req.body;
  if (!loadout) {
    return res.status(400).json({
      success: false,
      message: 'Loadout string is required in request body'
    });
  }
  profileData.loadout = loadout;
  res.json({
    success: true,
    message: `Favored loadout equipped: ${loadout}`,
    data: profileData
  });
};

export const updateProfile = (req, res) => {
  const { name, avatar, rankTitle } = req.body;
  if (name) profileData.name = name;
  if (avatar) profileData.avatar = avatar;
  if (rankTitle) profileData.rankTitle = rankTitle;

  res.json({
    success: true,
    message: 'Profile records updated',
    data: profileData
  });
};

export const addTrophy = (req, res) => {
  const { title, subtitle, icon, iconColor } = req.body;
  if (!title) {
    return res.status(400).json({
      success: false,
      message: 'Trophy title is required'
    });
  }

  const newTrophy = {
    id: title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
    title: title.toUpperCase(),
    subtitle: subtitle || 'Battlefield Feat',
    icon: icon || 'military_tech',
    iconColor: iconColor || 'text-secondary'
  };

  profileData.trophies.push(newTrophy);

  res.status(201).json({
    success: true,
    message: `Feat '${newTrophy.title}' unlocked!`,
    trophy: newTrophy,
    data: profileData
  });
};
