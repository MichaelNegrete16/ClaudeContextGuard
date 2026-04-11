'use strict';

const monitor = require('./monitor');
const hooks = require('./hooks');
const config = require('./config');

/**
 * Analyse the most recent Claude Code session for the given directory.
 *
 * @param {string} [cwd=process.cwd()] - Absolute path to the project directory.
 * @returns {{ reads: number, edits: number, totalToolCalls: number, ratio: number|null, filePath: string }|null}
 */
function analyse(cwd) {
  return monitor.analyseLatestSession(cwd || process.cwd());
}

/**
 * Install the PostToolUse hook in ~/.claude/settings.json.
 * @returns {{ alreadyInstalled: boolean, settingsPath: string }}
 */
function installHook() {
  return hooks.install();
}

/**
 * Remove the PostToolUse hook from ~/.claude/settings.json.
 * @returns {{ wasInstalled: boolean, settingsPath: string }}
 */
function uninstallHook() {
  return hooks.uninstall();
}

/**
 * Load the current configuration.
 * @returns {{ minReadToEditRatio: number, alertAfterEdits: number, silent: boolean }}
 */
function getConfig() {
  return config.load();
}

module.exports = { analyse, installHook, uninstallHook, getConfig };
