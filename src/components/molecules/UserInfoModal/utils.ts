export const openUserInfoModal = () => {
  const modal = document.getElementById("user_info_modal") as HTMLDialogElement
  modal?.showModal()
}

export const closeUserInfoModal = () => {
  const modal = document.getElementById("user_info_modal") as HTMLDialogElement
  modal?.close()
}