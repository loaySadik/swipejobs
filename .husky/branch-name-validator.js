#!/usr/bin/env node

/**
 * This script validates the Git branch naming convention to ensure consistent branching strategy.
 * Valid branch naming patterns:
 * - feature/ABC-123-some-feature
 * - bugfix/ABC-123-some-bugfix
 * - hotfix/ABC-123-some-hotfix
 * - release/v1.2.3
 * - chore/some-chore-description
 * - main, develop (protected branches)
 */

import { execSync } from 'child_process';

// Get the current branch name
const branchName = execSync('git rev-parse --abbrev-ref HEAD')
  .toString()
  .trim();

// Define valid branch prefixes
const VALID_PREFIXES = ['feature/', 'bugfix/', 'hotfix/', 'release/', 'chore/'];
const PROTECTED_BRANCHES = ['main', 'develop', 'master'];

// Branch name pattern validation
const featureBranchPattern = /^feature\/[A-Z]+-\d+-[\w-]+$/;
const bugfixBranchPattern = /^bugfix\/[A-Z]+-\d+-[\w-]+$/;
const hotfixBranchPattern = /^hotfix\/[A-Z]+-\d+-[\w-]+$/;
const releaseBranchPattern = /^release\/v\d+\.\d+\.\d+$/;
const choreBranchPattern = /^chore\/[\w-]+$/;

// Skip validation for protected branches
if (PROTECTED_BRANCHES.includes(branchName)) {
  console.log(`✅ "${branchName}" is a protected branch - validation passed`);
  process.exit(0);
}

// Validate branch name
let isValid = false;
const prefix = VALID_PREFIXES.find(prefix => branchName.startsWith(prefix));

if (!prefix) {
  isValid = false;
} else if (prefix === 'feature/') {
  isValid = featureBranchPattern.test(branchName);
} else if (prefix === 'bugfix/') {
  isValid = bugfixBranchPattern.test(branchName);
} else if (prefix === 'hotfix/') {
  isValid = hotfixBranchPattern.test(branchName);
} else if (prefix === 'release/') {
  isValid = releaseBranchPattern.test(branchName);
} else if (prefix === 'chore/') {
  isValid = choreBranchPattern.test(branchName);
}

if (!isValid) {
  console.error(`❌ Branch name "${branchName}" doesn't follow the naming convention.`);
  console.error('\nValid formats:');
  console.error('  • feature/ABC-123-some-feature');
  console.error('  • bugfix/ABC-123-some-bugfix');
  console.error('  • hotfix/ABC-123-some-hotfix');
  console.error('  • release/v1.2.3');
  console.error('  • chore/some-chore-description');
  console.error('  • main, develop (protected branches)');
  process.exit(1);
}

console.log(`✅ Branch name "${branchName}" is valid!`);
process.exit(0);