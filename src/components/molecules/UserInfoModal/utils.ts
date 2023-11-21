
type OpenUserInfoModalProps = {
  onClose?: () => void
}
export const openUserInfoModal = (props: OpenUserInfoModalProps = {}) => {
  const modal = document.getElementById("user_info_modal") as HTMLDialogElement
  modal?.showModal()
  // listen to close event
  if (props.onClose) {
    modal.addEventListener("close", props.onClose)
  }
}

export const closeUserInfoModal = () => {
  const modal = document.getElementById("user_info_modal") as HTMLDialogElement
  modal?.close()
}