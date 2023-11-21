import { FC } from 'react'
import { SubmitErrorHandler, SubmitHandler, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { VOTING_OPTIONS } from '../../../constants'
import Select from '../../atoms/Select'
import Card from '../../molecules/Card'

type OnSubmitProps = {
  voteStyle: keyof typeof VOTING_OPTIONS
}
type CreateSessionProps = {
  onSubmit: (props: OnSubmitProps) => void
}
const Component: FC<CreateSessionProps> = ({ onSubmit }) => {
  const { handleSubmit, register } = useForm<OnSubmitProps>()


  const handleValidSubmit: SubmitHandler<OnSubmitProps> = (props, event) => {
    event?.preventDefault()
    onSubmit(props)
  }

  const handleInvalidSubmit: SubmitErrorHandler<OnSubmitProps> = (props, event) => {
    event?.preventDefault()
    toast.error('Please select a vote style')
  }

  const formattedOptions = Object.entries(VOTING_OPTIONS).map(([key, value]) => ({
    label: `${value.label} (${value.example})`,
    value: key
  }))

  return (
    <Card title="New Session">
      <form onSubmit={handleSubmit(handleValidSubmit, handleInvalidSubmit)}>
        <div className="card-actions justify-center w-full pt-4">
          <Select
            formRegister={register('voteStyle', { required: true })}
            placeholder='Vote Style'
            options={formattedOptions}
          />
        </div>
        <div className="card-actions justify-end w-full pt-4">
          <input type='submit' className="btn btn-primary w-full" value="Start" />
        </div>
      </form>
    </Card>
  )
}

export { Component, type OnSubmitProps }
