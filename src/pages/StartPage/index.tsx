import { useNavigate } from 'react-router-dom'
import { openUserInfoModal } from '../../components/molecules/UserInfoModal/utils'
import * as JoinSession from '../../components/organisms/JoinSession'
import * as NewSession from '../../components/organisms/NewSession'
import { StartTemplate } from '../../components/templates/StartTemplate'
import { useUser } from '../../hooks/useUser'

const StartPage = () => {
  const navigate = useNavigate()
  const { user } = useUser()
  const onNewSessionSubmit = (props: NewSession.OnSubmitProps) => {
    if (!user.username) {
      openUserInfoModal()
      return
    }

    navigate('/session', { state: { voteStyle: props.voteStyle } })
  }

  const onJoinSessionSubmit = async (props: JoinSession.OnSubmitProps) => {
    if (!user.username) {
      openUserInfoModal()
      return
    }

    // const session = await getSessionById(props.sessionId)s

    // navigate(`/session/${session.id}`)
    navigate('/session/ozniCYc2PuyPCkqzv3yU')
  }

  return (
    <StartTemplate cards={[
      <JoinSession.Component onSubmit={onJoinSessionSubmit} />,
      <NewSession.Component onSubmit={onNewSessionSubmit} />
    ]}
    />
  )
}

export { StartPage }
