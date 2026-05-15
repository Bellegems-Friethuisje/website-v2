import 'virtual:@brillout/vite-plugin-server-entry:serverEntry'
import vike, { toFetchHandler } from '@vikejs/express'
import express from 'express'
import type { Server } from 'vike/types'

const port = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000

let _handler: ReturnType<typeof toFetchHandler> | null = null

function getHandler() {
  if (!_handler) {
    const app = express()
    vike(app)
    _handler = toFetchHandler(app)
  }
  return _handler
}

export default {
  fetch: (req: Request) => getHandler()(req),
  prod: { port },
} as Server
