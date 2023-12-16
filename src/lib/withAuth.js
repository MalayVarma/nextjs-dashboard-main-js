import { serializeCookie } from '../lib/cookie'


/**
 * Use with `GetServerSideProps`
 * eg:
 * ```
 * export const getServerSideProps = withAuth(async (context) => {
 *   ...
 * })
 * ```
 */
const withAuth = (gssp) => async (context) => {
  const { auth: authSession } = context.req.cookies

  if (!authSession) {
    context.res.setHeader('Set-Cookie', serializeCookie('redirect', context.resolvedUrl, { path: '/' }))
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    }
  }

  return gssp(context) // Continue on to call `getServerSideProps` logic
}

export default withAuth
