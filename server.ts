import vike, { toFetchHandler } from '@vikejs/express'
import express from 'express'
import type { Server } from 'vike/types'
import adminAuth from './api/admin-auth.js'
import menuPrices from './api/menu-prices.js'
import uploadImage from './api/upload-image.js'

const app = express()
app.use(express.json({ limit: '10mb' }))

app.all('/api/admin-auth', adminAuth as any)
app.all('/api/menu-prices', menuPrices as any)
app.post('/api/upload-image', uploadImage as any)

vike(app)

export default {
  fetch: toFetchHandler(app),
  prod: { port: Number(process.env.PORT) || 3000 },
} satisfies Server
