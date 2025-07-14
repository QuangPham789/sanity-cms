import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'

export default defineConfig({
  basePath: '/studio',
  name: 'default',
  title: 'ecommerce',

  projectId: 'q3bwz1g1',
  dataset: 'product',

  plugins: [structureTool(), visionTool()],

  schema: {
    types: schemaTypes,
  },
})
