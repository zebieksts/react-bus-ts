import typescript from 'rollup-plugin-typescript2'

const meta = require('./package.json')

export default {
  input: './index.tsx',
  output: [
    { format: 'cjs', file: meta.main, exports: 'named', interop: false },
    { format: 'es', file: meta.module },
  ],

  external: Object.keys(meta.dependencies)
    .concat(Object.keys(meta.peerDependencies)),

  plugins: [
    typescript({
      tsconfigOverride: {
        compilerOptions: {
          allowSyntheticDefaultImports: true,
          jsx: 'react',
          declaration: true,          
        }
      }
    }),
  ]
}
