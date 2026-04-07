import fs from 'fs';

export function readCSVRaw(filePath: string): string {
  return fs.readFileSync(filePath, 'utf-8');
}