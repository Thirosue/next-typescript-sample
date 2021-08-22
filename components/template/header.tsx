import { useContext } from 'react'
import { toast } from 'react-toastify'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/router'
import { destroyCookie } from 'nookies'
import { AxiosPromise } from 'axios'
import { useMutation } from 'react-query'
import GlobalContext from '../../context/global-context'
import { BaseResponse, AuthRepository } from '../../repository/auth-repository'

type FormValues = {
  keyword: string
}

export const Header = ({ toggle }: { toggle: () => void }): JSX.Element => {
  const router = useRouter()
  const context = useContext(GlobalContext)

  const mutation = useMutation(
    (): AxiosPromise<BaseResponse> => AuthRepository.signOut()
  )

  const { register, handleSubmit } = useForm<FormValues>({
    defaultValues: {
      keyword: router.query.keyword as string,
    },
  })

  const doSubmit = async (data: FormValues): Promise<void> => {
    await router.push({
      query: { keyword: data.keyword },
    })
  }

  const signOut = (): void => {
    mutation.mutate(null, {
      onSuccess: async () => {
        context.clearState()
        await router.push('/login')
        destroyCookie(null, 'state')
        setTimeout(() => toast.dark('ログアウトしました'), 100) // display toast after screen transition
      },
    })
  }

  return (
    <header className="flex justify-between items-center py-4 px-6 bg-white border-b-4 border-indigo-600">
      <div className="flex items-center">
        <button
          onClick={toggle}
          className="text-gray-500 focus:outline-none lg:hidden"
        >
          <svg
            className="h-6 w-6"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M4 6H20M4 12H20M4 18H11"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
        <div className="relative mx-4 lg:mx-0">
          <form onSubmit={handleSubmit(doSubmit)}>
            <button
              onClick={handleSubmit(doSubmit)}
              className="absolute inset-y-0 left-0 pl-3 flex items-center"
            >
              <svg
                className="h-5 w-5 text-gray-500"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
            <input
              className="form-input w-32 sm:w-64 rounded-md pl-10 pr-4 focus:border-indigo-600"
              type="text"
              placeholder="Search"
              {...register('keyword')}
            />
          </form>
        </div>
      </div>
      <div className="flex items-center">
        <div className="relative">
          <button
            onClick={signOut}
            className=" block h-8 w-8 rounded-full overflow-hidden shadow focus:outline-none"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="ml-1 h-7 w-7"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
              />
            </svg>
          </button>
        </div>
      </div>
    </header>
  )
}

export default Header
