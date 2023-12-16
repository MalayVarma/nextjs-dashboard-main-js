import { CookieSerializeOptions, serialize } from 'cookie'

// eslint-disable-next-line import/prefer-default-export
export function serializeCookie(
  name,
  value,
  options,
) {
  const stringValue = typeof value === 'object' ? `j:${JSON.stringify(value)}` : String(value)

  const cookieOptions = { ...options }

  if (cookieOptions.maxAge) {
    cookieOptions.expires = new Date(Date.now() + cookieOptions.maxAge)
    cookieOptions.maxAge /= 1000
  }

  return serialize(name, String(stringValue), cookieOptions)
}
