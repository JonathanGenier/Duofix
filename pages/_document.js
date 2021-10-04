/*==MODULES===================================================================*/
import Document, { Html, Head, Main, NextScript } from 'next/document'

/*==COMPONENTS================================================================*/
/*==STYLES====================================================================*/
/*============================================================================*/

class MyDocument extends Document {

  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps }
  }

  render() {
    let PLACES_AUTOCOMPLETE_API_KEY = process.env.PLACES_AUTOCOMPLETE_API_KEY
    let placesUrl = "https://maps.googleapis.com/maps/api/js?key=" + PLACES_AUTOCOMPLETE_API_KEY + "&libraries=places"

    return (
      <Html>
        <Head/>
        <body>
          <Main />
          <NextScript />

          <script src={placesUrl}></script>
          <script src='https://code.jquery.com/jquery-3.4.1.min.js' />
        </body>
      </Html>
    )
  }
}

export default MyDocument
