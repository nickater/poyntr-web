import { FC } from 'react'
import { SubmitErrorHandler, SubmitHandler, useForm } from 'react-hook-form'
import InputError from '../../atoms/InputError'
import Card from '../../molecules/Card'


type OnSubmitProps = {
  sessionId: string
}
type JoinSessionProps = {
  onSubmit: (props: OnSubmitProps) => void
}
const Component: FC<JoinSessionProps> = ({ onSubmit }) => {
  const { register, handleSubmit, formState: { errors } } = useForm<OnSubmitProps>()

  const handleValidSubmit: SubmitHandler<OnSubmitProps> = (props, event) => {
    event?.preventDefault()
    onSubmit(props)
  }

  const handleInvalidSubmit: SubmitErrorHandler<OnSubmitProps> = (props, event) => {
    event?.preventDefault()
    console.error('Invalid submit', props)
  }

  return (
    <Card title="Join Session">
      <form onSubmit={handleSubmit(handleValidSubmit, handleInvalidSubmit)}>
        <div className='pt-2'>
          <input
            type="text"
            placeholder="Your session ID"
            className="input input-bordered input-primary w-full"
            {...register('sessionId', { required: true })}
          />
          {
            errors.sessionId && <InputError message='Session ID is required' />
          }
        </div>
        <div className="card-actions justify-center w-full pt-4">
          <input type="submit" className="btn btn-primary w-full" value="Join" />
        </div>
      </form>
    </Card>
  )
}

export { Component, type OnSubmitProps }
