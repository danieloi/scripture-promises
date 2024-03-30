import 'raf/polyfill'
import 'setimmediate'
import '../global.css'

import { Provider } from 'app/provider'
import Head from 'next/head'
import React from 'react'
import type { SolitoAppProps } from 'solito'

function MyApp({ Component, pageProps }: SolitoAppProps) {
  return (
    <>
      <Head>
        <title>Precious Bible Promises</title>
        <meta name="description" content="Compiled by Samuel Clarke" />
        <link rel="icon" href="/favicon.ico" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
        />
      </Head>
      <Provider>
        <Component {...pageProps} />
      </Provider>
    </>
  )
}

export default MyApp
