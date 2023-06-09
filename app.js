import process from 'node:process';
import { ChildProcess } from 'node:child_process';
import {spawn, exec} from 'child_process';
import csv from 'csv-parser';
import path from 'path';
import fs from 'fs';

async function main() {

  const filePath = process.argv[2];

  const results = [];

  const source = spawn('cat', [filePath], {stdio: ['ignore', 'pipe', process.stderr]});
  const sink = spawn('cat', [], {stdio: ['pipe', process.stdout, process.stderr]});

  //source.pipe(csv()).on('data', (data) => results.push(data));

  const fileName = filePath.substring(0, filePath.length - 4);
  const jsonFile = fileName + '.json';

  source
  .pipe(csv())
  .on("data", (data) => {
    fs.open(jsonFile)
  })
  .pipe(sink)
}
main();



