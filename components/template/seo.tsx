import Head from 'next/head'

export const siteName = 'Sample'

export const Seo = ({ title }: { title: string }): JSX.Element => {
  const description = 'Create a Next.js sample app powered by Vercel.'
  const url = 'https://next-typescript-sample-mu.vercel.app/'
  const imageUrl = 'https://avatars.githubusercontent.com/u/14899056?v=4'

  return (
    <Head>
      <title>
        {siteName} - {title}
      </title>
      <link rel="icon" href="/favicon.ico" />
      <meta
        name="viewport"
        content="minimum-scale=1, initial-scale=1, width=device-width"
      />
      <meta name="description" content={description} />
      <meta property="og:image" content={imageUrl} />
      <meta name="og:title" content={`${siteName} - ${title}`} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta property="og:site_name" content={siteName} />
      <meta property="og:title" content={`${siteName} - ${title}`} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content="website" />
      <meta property="og:locale" content="ja_JP" />
    </Head>
  )
}

export default Seo
