import { FieldErrors } from 'react-hook-form'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import * as JoinSession from '../../components/organisms/JoinSession'
import * as NewSession from '../../components/organisms/NewSession'
import { StartTemplate } from '../../components/templates/StartTemplate'
import { useUser } from '../../hooks/useUser'
import { getSessionById } from '../../services/session'

const StartPage = () => {
  const navigate = useNavigate()
  const { user, isLoading } = useUser()

  const onNewSessionSubmit = (props: NewSession.OnSubmitProps) => {
    if (!user) {
      toast.error('Please login first')
      return
    }

    navigate('/session', { state: { voteStyle: props.voteStyle } })
  }

  const onJoinSessionSubmitSuccessful = async (props: JoinSession.OnSubmitProps) => {
    if (!user) {
      toast.error('Please login first')
      return
    }

    const session = await getSessionById(props.sessionId)

    if (!session) {
      toast.error('Session not found')
      return
    }

    navigate(`/session/${session.id}`)
  }

  const onJoinSessionSubmitFailed = (props: FieldErrors<JoinSession.OnSubmitProps>) => {
    if (props.sessionId?.type === 'required') {
      toast.error('Session ID is required')
      return
    }
  }

  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <StartTemplate cards={[
      <JoinSession.Component onValidSubmit={onJoinSessionSubmitSuccessful} onInvalidSubmit={onJoinSessionSubmitFailed} />,
      <NewSession.Component onSubmit={onNewSessionSubmit} />
    ]}
    />
  )
}

export { StartPage }
