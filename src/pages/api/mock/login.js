import { serializeCookie } from '../../../lib'

export default function handler(req, res) {
  const cookie = serializeCookie('auth', { user: 'Andy' }, { path: '/' })
  res.status(200)
    .setHeader('Set-Cookie', cookie)
    .json({ login: true })
}
