import { useEffect } from 'react'
import toast, { Toaster } from 'react-hot-toast'
import { Link, Outlet, useNavigate } from 'react-router-dom'
import { useUser } from '../../../hooks/useUser'
import NavBarOptions from '../../molecules/NavBarOptions'
import { NavBarOptionsProps } from '../../molecules/NavBarOptions/types'
import { UserInfoModal } from '../../molecules/UserInfoModal'
import { closeUserInfoModal, openUserInfoModal } from '../../molecules/UserInfoModal/utils'

function AppContainer() {
  const { user, logout, isLoading } = useUser()
  const navigate = useNavigate()
  const username = user?.user_metadata.user_name

  const login = () => {
    openUserInfoModal()
  }

  const logoutUser = () => {
    logout()
    toast.success('Logged out!')
    navigate('/')
  }

  const onModalSubmitSuccess = () => {
    if (user) {
      toast.success(`Welcome ${username}`)
    }
    closeUserInfoModal()
  }

  const onModalSubmitFailure = () => {
    toast.error('Something went wrong!')
  }

  const navBarItems: NavBarOptionsProps["items"] = [
    {
      id: '1',
      name: 'Sessions',
      onClick: () => navigate('/session/manage')
    },
    {
      id: '2',
      name: 'Logout',
      onClick: logoutUser
    }
  ]


  useEffect(() => {
    if (isLoading) return

    if (!user) {
      openUserInfoModal()
    }
  }, [isLoading, user])

  return (
    <div className='w-full'>
      <div className='z-100'><Toaster /></div>
      <div className="navbar bg-base-300 sticky top-0 z-10">
        <div className="flex-1">
          <Link to={'/'} className="btn btn-ghost normal-case text-2xl">poyntr</Link>
        </div>
        <div>
          {
            user ?
              <NavBarOptions items={navBarItems} />
              :
              <button className="btn btn-ghost" onClick={login}>Login</button>
          }
        </div>
      </div>
      <div className='px-2 pt-6 container md:container mx-auto'>
        <Outlet />
      </div>
      <UserInfoModal onSubmitSuccess={onModalSubmitSuccess} onSubmitFailure={onModalSubmitFailure} />
    </div>
  )
}

export { AppContainer }
