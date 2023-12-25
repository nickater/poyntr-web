type NavBarOption = {
  id: string;
  name: string;
  onClick: () => void;
}
export type NavBarOptionsProps = {
  items: NavBarOption[];
}