import fs from 'node:fs';
import Papa from 'papaparse';

export type CustomerData = {
  'Customer ID': string;
  Gender: string;
  Occupation: string;
  City: string;
  Age: number;
  Revenue: number;
};

export function parseFile(filename: string) {
  const file = fs.readFileSync(filename, 'utf8');

  const parsed = Papa.parse<CustomerData>(file, {
    delimiter: ',',
    dynamicTyping: true,
    header: true,
    skipEmptyLines: true,
  });

  return parsed.data;
}
