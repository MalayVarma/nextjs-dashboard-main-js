import { serializeCookie } from '@lib'

export default function handler(req, res) {
  res.status(200)
    .setHeader('Set-Cookie', serializeCookie('auth', {}, { path: '/', expires: new Date(Date.now()) }))
    .json({ logout: true })
}
