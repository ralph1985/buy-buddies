// Falla la instalación si Node es menor a 22.x, con mensaje claro.
// No requiere dependencias externas (sin semver).
(function enforceNodeVersion() {
  const requiredMajor = 22;
  const current = process.versions.node; // e.g., "22.4.1"
  const major = Number((current.split('.')[0] || '0').replace(/\D/g, ''));

  if (Number.isNaN(major) || major < requiredMajor) {
    console.error(
      `\n❌ Node ${requiredMajor}.0.0 o superior es requerido para este proyecto.\n` +
      `   Versión detectada: ${current}\n` +
      `   Sugerencia: usa nvm/volta y cambia con "nvm use 22" o instala Node 22.\n`
    );
    process.exit(1);
  }
})();
