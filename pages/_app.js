/*==MODULES===================================================================*/
/*==COMPONENTS================================================================*/
import Head from 'next/head'
import Layout from '../components/layout'

/*==STYLES====================================================================*/
import '../styles/globals.css'
import 'bootstrap/dist/css/bootstrap.min.css'

/*============================================================================*/

function duoFix({ Component, pageProps }) {
  return (
    <Layout>
      <Head>
        <title>Duofix</title>
        <meta name="Duofix" content="We fix it right!" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Component {...pageProps} />
    </Layout>
  )
}

export default duoFix
