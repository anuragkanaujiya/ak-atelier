#!/usr/bin/env node
/**
 * Design Token, Gradient & Animation Audit
 * Delegated to .agents/scripts/design-token-guardian.mjs
 */
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const targetScript = path.resolve(__dirname, '../.agents/scripts/design-token-guardian.mjs');

import(targetScript);
