module.exports = {
  apps: [
    {
      script: 'index.mjs',
      watch: true,
      ignore_watch: ['node_modules', 'manifest.json', 'README.md'],
      autorestart: true,
    },
  ],
}
