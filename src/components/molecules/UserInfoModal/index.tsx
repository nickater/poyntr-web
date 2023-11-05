import { FC, useRef } from 'react';

type UserInfoModalProps = {
  onSubmit: (props: { username: string }) => void
}
const UserInfoModal: FC<UserInfoModalProps> = ({ onSubmit }) => {
  const _username = useRef('')

  const handleOnSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    onSubmit({ username: _username.current })
  }

  return (
    <dialog id="user_info_modal" className="modal">
      <div className="modal-box">
        <h3 className="font-bold text-lg">Welcome!</h3>
        <form onSubmit={handleOnSubmit}>
          <input
            onChange={(e) => _username.current = e.target.value}
            placeholder='Please enter your name'
            type="text"
            className="border-2 border-gray-300 rounded-lg p-2 w-full mt-4"
          />
          <button
            type='submit'
            className="btn btn-primary mt-4 w-full"
          >Submit</button>
        </form>
      </div>
      <form method="dialog" className="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>
  );
}



export { UserInfoModal };
