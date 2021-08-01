import Head from 'next/head'
import Layout, { siteTitle } from '../components/layout'
import utilStyles from '../styles/utils.module.css'
import { getSortedPostsData } from '../lib/posts'
import Link from 'next/link'
import Date from '../components/date'
import { GetStaticProps } from 'next'

export default function Login({ }) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
        <meta http-equiv="x-ua-compatible" content="ie=edge" />
        <meta name="referrer" content="always" />
      </Head>
      <div className="mb-12 prose lg:prose">
        <h1>@tailwindcss/form demo</h1>
      </div>
      <form className="mt-4" action="/" method="GET">
        <label className="block">
          <span className="text-gray-700 text-sm">Email</span>
          <input type="email" className="mt-1 border-gray-300 block w-full rounded-md focus:border-indigo-600" />
        </label>

        <label className="block mt-3">
          <span className="text-gray-700 text-sm">Password</span>
          <input type="password" className="mt-1 border-gray-300 block w-full rounded-md focus:border-indigo-600" />
        </label>

        <div className="flex justify-between items-center mt-4">
          <div>
            <label className="inline-flex items-center">
              <input type="checkbox" className="form-checkbox text-indigo-600" />
              <span className="mx-2 text-gray-600 text-sm">Remember me</span>
            </label>
          </div>

          <div>
            <a className="block text-sm fontme text-indigo-700 hover:underline" href="#">Forgot your password?</a>
          </div>
        </div>

        <div className="mt-6">
          <button className="py-2 px-4 text-center bg-indigo-600 rounded-md w-full text-white text-sm hover:bg-indigo-500">
            Sign in
          </button>
        </div>
      </form>
      <div className="mt-12 mb-12 prose lg:prose">
        <h1>@tailwindcss/typography demo</h1>
      </div>
      <div className="prose lg:prose-xl">
        <h1>Garlic bread with cheese: What the science tells us</h1>
        <p>
          For years parents have espoused the health benefits of eating garlic bread with cheese to their
          children, with the food earning such an iconic status in our culture that kids will often dress
          up as warm, cheesy loaf for Halloween.
        </p>
        <p>
          But a recent study shows that the celebrated appetizer may be linked to a series of rabies cases
          springing up around the country.
        </p>
      </div>
      <div className="mt-12 mb-12 prose lg:prose">
        <h1>@tailwindcss/line-clamp Plugin demo</h1>
      </div>
      <div style={{ width: '400px' }}>
        <p className="line-clamp-3">
          Et molestiae hic earum repellat aliquid est doloribus delectus. Enim illum odio porro ut omnis dolor debitis natus. Voluptas possimus deserunt sit delectus est saepe nihil. Qui voluptate possimus et quia. Eligendi voluptas voluptas dolor cum. Rerum est quos quos id ut molestiae fugit.
        </p>
      </div>
    </>
  )
}
