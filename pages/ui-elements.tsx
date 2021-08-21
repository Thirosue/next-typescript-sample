import { ReactElement } from 'react'
import { toast } from 'react-toastify'
import useConfirm from '../hooks/useConfirm'
import { Typography, Link } from '../components/atoms'
import { DashboardLayout } from '../components/template'

const captains = console

export const InfoDilalog: React.FC = () => {
  const confirm = useConfirm()

  const handleClick = (_: any): void => {
    confirm({
      title: 'Info Dialog Demo',
      alert: true,
      icon: 'info',
      description:
        'Are you sure you want to deactivate your account? All of your data will be permanently removed. This action cannot be undone.',
    })
      .then(() => {
        captains.log('then')
      })
      .catch(() => {
        captains.log('error')
      })
  }

  return (
    <div className="mt-2">
      <Link onClick={handleClick}>open info dialog?</Link>
    </div>
  )
}

export const AlertDilalog: React.FC = () => {
  const confirm = useConfirm()

  const handleClick = (_: any): void => {
    confirm({
      title: 'Alert Dialog Demo',
      alert: true,
      icon: 'alert',
      description:
        'Are you sure you want to deactivate your account? All of your data will be permanently removed. This action cannot be undone.',
    })
      .then(() => {
        captains.log('then')
      })
      .catch(() => {
        captains.log('error')
      })
  }

  return (
    <div className="mt-2">
      <Link onClick={handleClick}>open alert dialog?</Link>
    </div>
  )
}

export const HtlmDilalog: React.FC = () => {
  const confirm = useConfirm()

  const handleClick = (_: any): void => {
    confirm({
      title: 'Html Dialog Demo',
      html: true,
      icon: 'warn',
      description: <div className="text-2xl">hoge?</div>,
    })
      .then(() => {
        captains.log('then')
      })
      .catch(() => {
        captains.log('error')
      })
  }

  return (
    <div className="mt-2">
      <Link onClick={handleClick}>open inline html dialog?</Link>
    </div>
  )
}

export const DilalogWithNoAlert: React.FC = () => {
  const confirm = useConfirm()

  const handleClick = (_: any): void => {
    confirm({
      title: 'No Icon Dialog Demo',
      alert: true,
      description:
        'Are you sure you want to deactivate your account? All of your data will be permanently removed. This action cannot be undone.',
    })
      .then(() => {
        captains.log('then')
      })
      .catch(() => {
        captains.log('error')
      })
  }

  return (
    <div className="mt-2">
      <Link onClick={handleClick}>open dialog with no icon?</Link>
    </div>
  )
}

export const Toast: React.FC = () => {
  const notify = () => toast.success('Wow so easy!')

  return (
    <div className="mt-2">
      <Link onClick={notify}>Success!</Link>
    </div>
  )
}

export const ErrorToast: React.FC = () => {
  const notify = () => toast.error('Wow so easy!')

  return (
    <div className="mt-2">
      <Link onClick={notify}>Error!</Link>
    </div>
  )
}

export default function Demo(): JSX.Element {
  return (
    <div className="container mx-auto px-6 py-8">
      <div className="mb-12 prose lg:prose">
        <h1>@tailwindcss/form demo</h1>
      </div>
      <form className="mt-4" action="/" method="GET">
        <label className="block">
          <span className="text-gray-700 text-sm">Email</span>
          <input
            type="email"
            className="mt-1 border-gray-300 block w-full rounded-md focus:border-indigo-600"
          />
        </label>

        <label className="block mt-3">
          <span className="text-gray-700 text-sm">Password</span>
          <input
            type="password"
            className="mt-1 border-gray-300 block w-full rounded-md focus:border-indigo-600"
          />
        </label>

        <div className="flex justify-between items-center mt-4">
          <div>
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                className="form-checkbox text-indigo-600"
              />
              <span className="mx-2 text-gray-600 text-sm">Remember me</span>
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
      <div className="mt-12 mb-12 prose lg:prose">
        <h1>Typography demo</h1>
      </div>
      <div>
        <Typography variant={'h2'}>h2. Heading</Typography>
        <Typography variant={'h3'}>h3. Heading</Typography>
        <Typography variant={'h4'}>h4. Heading</Typography>
        <Typography variant={'h5'}>h5. Heading</Typography>
        <Typography variant={'h6'}>h6. Heading</Typography>
        <Typography variant={'subtitle1'}>
          subtitle1. Lorem ipsum dolor sit amet, consectetur adipisicing elit.
          Quos blanditiis tenetur
        </Typography>
        <Typography variant={'subtitle2'}>
          subtitle2. Lorem ipsum dolor sit amet, consectetur adipisicing elit.
          Quos blanditiis tenetur
        </Typography>
        <Typography>
          For years parents have espoused the health benefits of eating garlic
          bread with cheese to their children, with the food earning such an
          iconic status in our culture that kids will often dress up as warm,
          cheesy loaf for Halloween.
        </Typography>
        <Typography variant={'body2'}>
          But a recent study shows that the celebrated appetizer may be linked
          to a series of rabies cases springing up around the country.
        </Typography>
      </div>
      <div className="mt-12 mb-12 prose lg:prose">
        <h1>@tailwindcss/line-clamp Plugin demo</h1>
      </div>
      <div style={{ width: '400px' }}>
        <p className="line-clamp-3">
          Et molestiae hic earum repellat aliquid est doloribus delectus. Enim
          illum odio porro ut omnis dolor debitis natus. Voluptas possimus
          deserunt sit delectus est saepe nihil. Qui voluptate possimus et quia.
          Eligendi voluptas voluptas dolor cum. Rerum est quos quos id ut
          molestiae fugit.
        </p>
      </div>
      <div className="mt-12 mb-12 prose lg:prose">
        <h1>Dialog demo</h1>
      </div>
      <div className="ml-4 mb-4">
        <InfoDilalog />
      </div>
      <div className="ml-4 mb-4">
        <AlertDilalog />
      </div>
      <div className="ml-4 mb-4">
        <HtlmDilalog />
      </div>
      <div className="ml-4 mb-4">
        <DilalogWithNoAlert />
      </div>
      <div className="mt-12 mb-12 prose lg:prose">
        <h1>Toast demo</h1>
      </div>
      <div className="ml-4 mb-4">
        <Toast />
      </div>
      <div className="ml-4 mb-4">
        <ErrorToast />
      </div>
    </div>
  )
}

Demo.getLayout = function getLayout(page: ReactElement) {
  return <DashboardLayout title={'デモ'}>{page}</DashboardLayout>
}
