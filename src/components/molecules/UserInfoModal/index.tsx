import { FC } from 'react';
import { useUser } from '../../../hooks/useUser';

type UserInfoModalProps = {
  onSubmitSuccess: () => void
  onSubmitFailure?: () => void
}
const UserInfoModal: FC<UserInfoModalProps> = ({ onSubmitSuccess, onSubmitFailure }) => {
  const { loginWithGithub } = useUser()

  const handleLoginWithGithub = async () => {
    const { error, data } = await loginWithGithub()
    if (error) {
      onSubmitFailure && onSubmitFailure()
      return
    }
    if (data) {
      onSubmitSuccess()
    }
  }

  return (
    <dialog id="user_info_modal" className="modal">
      <div className="modal-box">
        <h3 className="font-bold text-lg">Welcome!</h3>
        <button
          type='button'
          className="btn btn-secondary mt-4 w-full"
          onClick={handleLoginWithGithub}>Login with Github</button>
      </div>
      <form method="dialog" className="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>
  );
}



export { UserInfoModal };
