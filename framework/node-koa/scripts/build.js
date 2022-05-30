const esbuild = require('esbuild')
const fs = require('fs-extra')

const targetDir = 'dist'
const isDev = process.env.NODE_ENV === 'development'
;(async function () {
  // empty dir
  await fs.emptyDir(targetDir)
  // esbuild
  const res = await esbuild.build({
    entryPoints: ['src/main.ts'],
    outdir: 'dist',
    bundle: true,
    platform: 'node',
    target: 'node12',
    outdir: targetDir,
    format: 'cjs',
    minify: !isDev,
    sourcemap: isDev,
  })
  if (res.errors.length) {
    return
  }
  if (isDev) return
  // copy file
  await fs.copyFile('config.js', `${targetDir}/config.js`)
})()
