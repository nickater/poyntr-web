import { FC } from 'react'
import { FieldErrors, SubmitErrorHandler, SubmitHandler, useForm } from 'react-hook-form'
import Card from '../../molecules/Card'


type OnSubmitProps = {
  sessionId: string
}
type JoinSessionProps = {
  onValidSubmit: (props: OnSubmitProps) => void
  onInvalidSubmit?: (props: FieldErrors<OnSubmitProps>) => void
}
const Component: FC<JoinSessionProps> = ({ onValidSubmit, onInvalidSubmit }) => {
  const { register, handleSubmit } = useForm<OnSubmitProps>()

  const handleValidSubmit: SubmitHandler<OnSubmitProps> = (props, event) => {
    event?.preventDefault()
    onValidSubmit(props)
  }

  const handleInvalidSubmit: SubmitErrorHandler<OnSubmitProps> = (props, event) => {
    event?.preventDefault()
    onInvalidSubmit?.(props)
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
        </div>
        <div className="card-actions justify-center w-full pt-4">
          <input type="submit" className="btn btn-primary w-full" value="Join" />
        </div>
      </form>
    </Card>
  )
}

export { Component, type OnSubmitProps }
