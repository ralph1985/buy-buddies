(function enforceNodeVersion() {
  const requiredMajor = 22;
  const current = process.versions.node; // e.g., "22.4.1"
  const major = Number((current.split('.')[0] || '0').replace(/\D/g, ''));

  if (Number.isNaN(major) || major < requiredMajor) {
    console.error(
      `\n❌ Node ${requiredMajor}.0.0 or higher is required for this project.\n` +
        `   Detected version: ${current}\n` +
        `   Suggestion: use nvm/volta and switch with "nvm use 22" or install Node 22.\n`,
    );
    process.exit(1);
  }
})();
