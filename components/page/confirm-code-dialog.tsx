import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { toast } from 'react-toastify'
import { AxiosPromise } from 'axios'
import { useMutation } from 'react-query'
import { Progress } from '../../components/progress'
import { FormLabel, FormErrorMessage } from '../atoms'
import { Confirm } from '../template'
import { TextFieldType } from '../../data'
import {
  VerifyCodeRequest,
  BaseResponse,
  AuthRepository,
} from '../../repository/auth-repository'

const captains = console

type FormValues = {
  code: string
}

const schema = yup.object().shape({
  code: yup.number().required('入力してください'),
})

export const ConfirmCodeModal = ({
  onSubmit,
  onClose,
  onCancel,
}: {
  onSubmit: () => void
  onClose: (event: any) => void
  onCancel: (event: any) => void
}): JSX.Element => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: yupResolver(schema),
  })
  const mutation = useMutation(
    (req: VerifyCodeRequest): AxiosPromise<BaseResponse> =>
      AuthRepository.verifyCode(req)
  )

  const doSubmit = (data: FormValues): void => {
    captains.log(data)
    const request: VerifyCodeRequest = {
      code: data.code,
    }
    mutation.mutate(request, {
      onSuccess: () => {
        onClose(null)
        onSubmit()
        toast.success('パスワードを更新しました')
      },
    })
  }

  return (
    <>
      <Progress processing={mutation.isLoading} />
      <Confirm
        title={'認証コードの確認'}
        onSubmit={handleSubmit(doSubmit)}
        onClose={onClose}
        onCancel={onCancel}
        processing={mutation.isLoading}
      >
        <form className="px-6 mt-4 mb-4 w-full">
          <label className="block">
            <FormLabel>検証コード</FormLabel>
            <input
              id="code"
              type={TextFieldType.Number}
              className={`mt-1 w-full border-gray-300 block rounded-md focus:border-indigo-600 ${
                errors.code ? 'border-red-400' : ''
              }`}
              {...register('code', {
                valueAsNumber: true,
              })}
            />
            <FormErrorMessage>{errors.code?.message}</FormErrorMessage>
          </label>
        </form>
      </Confirm>
    </>
  )
}

export default ConfirmCodeModal
