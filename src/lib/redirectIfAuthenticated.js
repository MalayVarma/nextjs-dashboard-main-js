/**
 * Use with `GetServerSideProps`
 * eg:
 * ```
 * export const getServerSideProps = redirectIfAuthenticated(async (context) => {
 *   ...
 * })
 * ```
 */
const redirectIfAuthenticated = (gssp) => async (context) => {
  const { auth: authSession } = context.req.cookies
  if (authSession) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }

  return gssp(context) // Continue on to call `getServerSideProps` logic
}

export default redirectIfAuthenticated
