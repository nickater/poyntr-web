import { useEffect } from 'react'
import toast, { Toaster } from 'react-hot-toast'
import { Link, Outlet, useNavigate } from 'react-router-dom'
import { useUser } from '../../../hooks/useUser'
import { UserInfoModal } from '../../molecules/UserInfoModal'
import { closeUserInfoModal, openUserInfoModal } from '../../molecules/UserInfoModal/utils'

function AppContainer() {
  const { user, clearUser, setUsername, checkUsername } = useUser()
  const navigate = useNavigate()

  const login = () => {
    openUserInfoModal()
  }

  const logout = () => {
    clearUser()
    toast.success('Logged out!')
    navigate('/')
  }

  const onModalSubmit = (props: { username: string }) => {
    if (props.username) {
      setUsername(props.username)
      toast.success(`Welcome ${props.username}!`)
    }
    closeUserInfoModal()
  }

  useEffect(() => {
    const userAlreadyExists = checkUsername()

    if (!userAlreadyExists) {
      openUserInfoModal()
      return
    }

  }, [checkUsername, user])

  return (
    <div className='w-full'>
      <div className='z-100'><Toaster /></div>
      <div className="navbar bg-base-300 sticky top-0 z-10">
        <div className="flex-1">
          <Link to={'/'} className="btn btn-ghost normal-case text-2xl">poyntr</Link>
        </div>
        <div>
          <button onClick={user.username ? logout : login} className="btn btn-ghost normal-case text-lg">
            {
              user.username ? `${user.username}` : 'Login'
            }
          </button>
        </div>
      </div>
      <div className='px-2 pt-6 md:px-10 md:pt-12'>
        <Outlet />
      </div>
      <UserInfoModal onSubmit={onModalSubmit} />
    </div>
  )
}

export { AppContainer }
