import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faExclamation,
  faExclamationTriangle,
} from '@fortawesome/free-solid-svg-icons'
import _, { Many } from 'lodash'
import Typography from '../atoms/typography'
import Button from '../atoms/button'
import Link from '../atoms/link'

interface Map {
  key: string
  element: React.ReactNode
}

const IconMapping: Map[] = [
  {
    key: 'info',
    element: (
      <>
        <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-600 sm:mx-0 sm:h-10 sm:w-10">
          <FontAwesomeIcon color={'white'} icon={faExclamation} />
        </div>
      </>
    ),
  },
  {
    key: 'warn',
    element: (
      <>
        <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-yellow-200 sm:mx-0 sm:h-10 sm:w-10">
          <FontAwesomeIcon icon={faExclamation} />
        </div>
      </>
    ),
  },
  {
    key: 'alert',
    element: (
      <>
        <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
          <FontAwesomeIcon color={'red'} icon={faExclamationTriangle} />
        </div>
      </>
    ),
  },
]

export const Layout = ({
  title,
  children,
  onSubmit,
  confirmationText = 'OK',
  onClose,
  cancellationText = 'Cancel',
  onCancel,
  icon,
  alert = false,
}: {
  title: string
  children: React.ReactNode
  onSubmit: (event: any) => void
  confirmationText?: string
  onClose: (event: any) => void
  cancellationText?: string
  onCancel: (event: any) => void
  icon?: Many<'info' | 'warn' | 'alert'>
  alert?: boolean
}): JSX.Element => {
  const DialogIcon = () =>
    _.head(
      IconMapping.filter((map: Map) => map.key === icon).map(
        (map: Map) => map.element
      )
    )

  return (
    <div
      className="fixed z-10 inset-0 overflow-y-auto"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div
          onClick={onClose}
          className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
          aria-hidden="true"
        ></div>
        <span
          className="hidden sm:inline-block sm:align-middle sm:h-screen"
          aria-hidden="true"
        >
          &#8203;
        </span>
        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div className="flex justify-between">
              <div>
                <div className="sm:flex sm:items-start">
                  {icon && DialogIcon()}
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    {title && <Typography variant={'h6'}>{title}</Typography>}
                    <div className="mt-2">{children}</div>
                  </div>
                </div>
              </div>
              <Link onClick={onClose}>
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  ></path>
                </svg>
              </Link>
            </div>
          </div>
          <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <Button
              classes={['sm:ml-3', 'sm:w-auto']}
              color={'primary'}
              onClick={onSubmit}
              fullWidth={true}
            >
              {confirmationText}
            </Button>
            {!alert && (
              <>
                <Button
                  classes={['mt-3', 'sm:ml-3', 'sm:w-auto', 'sm:mt-0']}
                  fullWidth={true}
                  onClick={onCancel}
                >
                  {cancellationText}
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Layout
