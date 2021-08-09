import { useState } from "react"
import Head from 'next/head'
import TextField from '../components/atoms/text-field'
import { TextFieldType } from '../data'

export default function Login(): JSX.Element {
  const [password, setPassword] = useState('password')

  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
        <meta httpEquiv="x-ua-compatible" content="ie=edge" />
        <meta name="referrer" content="always" />
      </Head>
      <div className="flex justify-center items-center h-screen bg-gray-200 px-6">
        <div className="p-6 max-w-sm w-full bg-white shadow-md rounded-md">
          <div className="flex justify-center items-center">
            <svg
              className="h-10 w-10"
              viewBox="0 0 512 512"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M364.61 390.213C304.625 450.196 207.37 450.196 147.386 390.213C117.394 360.22 102.398 320.911 102.398 281.6C102.398 242.291 117.394 202.981 147.386 172.989C147.386 230.4 153.6 281.6 230.4 307.2C230.4 256 256 102.4 294.4 76.7999C320 128 334.618 142.997 364.608 172.989C394.601 202.981 409.597 242.291 409.597 281.6C409.597 320.911 394.601 360.22 364.61 390.213Z"
                fill="#4C51BF"
                stroke="#4C51BF"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M201.694 387.105C231.686 417.098 280.312 417.098 310.305 387.105C325.301 372.109 332.8 352.456 332.8 332.8C332.8 313.144 325.301 293.491 310.305 278.495C295.309 263.498 288 256 275.2 230.4C256 243.2 243.201 320 243.201 345.6C201.694 345.6 179.2 332.8 179.2 332.8C179.2 352.456 186.698 372.109 201.694 387.105Z"
                fill="white"
              />
            </svg>
            <span className="text-gray-700 font-semibold text-2xl">
              Dashboard
            </span>
          </div>

          <form className="mt-4" action="/" method="GET">
            <label className="block">
              <span className="text-gray-700 text-sm">Email</span>
              <input
                type="email"
                className="mt-1 border-gray-300 block w-full rounded-md focus:border-indigo-600"
              />
            </label>

            <TextField
              classes={['mt-3']}
              label={'Password'}
              type={TextFieldType.Password}
              value={password}
              onChange={(e: any) => setPassword(e.target.value)}
            />
            {password}

            <div className="flex justify-between items-center mt-4">
              <div>
                <label className="inline-flex items-center">
                  <input
                    type="checkbox"
                    className="form-checkbox text-indigo-600"
                  />
                  <span className="mx-2 text-gray-600 text-sm">
                    Remember me
                  </span>
                </label>
              </div>

              <div>
                <a
                  className="block text-sm fontme text-indigo-700 hover:underline"
                  href="#"
                >
                  Forgot your password?
                </a>
              </div>
            </div>

            <div className="mt-6">
              <button className="py-2 px-4 text-center bg-indigo-600 rounded-md w-full text-white text-sm hover:bg-indigo-500">
                Sign in
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}
