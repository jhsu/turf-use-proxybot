import resolve from '@rollup/plugin-node-resolve'
import typescript from '@rollup/plugin-typescript'
import commonjs from '@rollup/plugin-commonjs'
import external from 'rollup-plugin-peer-deps-external'
import json from '@rollup/plugin-json'

// const packageJson = require('./package.json')
import packageJson from './package.json' assert { type: 'json' }
export default [
  {
    input: `./src/index.ts`,
    output: [
      { file: packageJson.main, format: 'cjs' },
      { file: packageJson.module, format: 'esm' },
    ],

    external: ['suspend-react', 'react', 'ethers'],
    plugins: [
      external({
        deps: true,
        peerDeps: true,
      }),
      resolve(),
      json(),
      commonjs(),
      typescript({ tsconfig: './tsconfig.json' }),
    ],
  },
]
