import { terser } from 'rollup-plugin-terser'
import pkg from './package.json'

export default {
  input: 'src/index.js',
  output: { file: pkg.main, format: 'es', sourcemap: true },
  plugins: [terser()],
  external: ['react'],
}
