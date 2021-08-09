const path = require('path');

const PROJECT_ROOT = path.resolve(__dirname, '..');
const DIST_PATH = path.resolve(PROJECT_ROOT, 'dist');
const SRC_PATH = path.resolve(PROJECT_ROOT, 'src');
const PUBLIC_PATH = path.resolve(PROJECT_ROOT, 'public');

const settings = {
  entry: path.resolve(SRC_PATH, 'index.tsx'),
  htmlPath: path.resolve(PUBLIC_PATH, 'index.html'),
  outputPath: path.resolve(DIST_PATH, 'assets'),
  clientEntryPath: path.resolve(SRC_PATH, 'index.tsx'),
  distPath: DIST_PATH,
  srcPath: SRC_PATH,
  root: PROJECT_ROOT,
  publicPath: '/',
  assetsPath: 'assets',
  port: 5000,
  host: '0.0.0.0'
}

module.exports = settings;
