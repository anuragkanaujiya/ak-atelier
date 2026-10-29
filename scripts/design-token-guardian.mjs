#!/usr/bin/env node
/**
 * Forwarding script for Design Token Guardian
 */
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const targetScript = path.resolve(__dirname, '../.agents/scripts/design-token-guardian.mjs');

import(targetScript);
