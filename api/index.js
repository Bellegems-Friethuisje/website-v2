import '../dist/server/entry.mjs'
import { renderPage } from 'vike/server'

export default async function handler(req, res) {
  const pageContext = await renderPage({ urlOriginal: req.url || '/' })
  const { httpResponse } = pageContext
  if (!httpResponse) {
    res.statusCode = 200
    res.end()
    return
  }
  const { statusCode, headers, body } = httpResponse
  for (const [name, value] of headers) res.setHeader(name, value)
  res.statusCode = statusCode
  res.end(body)
}
