// vitest.config.integration.ts

import { resolve } from 'path'
import { defineConfig } from 'vitest/config'


export default defineConfig({

    test: {
        include: ['src/tests/**/*.test.ts'],
        setupFiles: ['src/tests/helpers/setup.ts']
    },

    resolve: {

        alias: [{ find: "@", replacement: resolve(__dirname, "./src") }]


    }

})