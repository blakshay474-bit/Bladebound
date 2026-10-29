import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DATA_DIR = path.join(__dirname, '..', 'data');

/**
 * Universally loads a JSON file from the data directory.
 * Works seamlessly across all Node.js versions (v18, v20, v22, v25+).
 */
export function loadJson(filename) {
  const filePath = path.join(DATA_DIR, filename);
  try {
    const rawData = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(rawData);
  } catch (err) {
    console.error(`Failed to load JSON file: ${filePath}`, err);
    throw err;
  }
}

/**
 * Saves JSON data to the data directory.
 */
export function saveJson(filename, data) {
  const filePath = path.join(DATA_DIR, filename);
  try {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
    return true;
  } catch (err) {
    console.error(`Failed to save JSON file: ${filePath}`, err);
    return false;
  }
}
