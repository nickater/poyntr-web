import { NavBarOptionsProps } from './types';

const NavBarOptions: React.FC<NavBarOptionsProps> = ({ items }) => {

  return (
    <ul className="menu menu-horizontal bg-base-200 rounded-box">
      {
        items.map((item) => (
          <button key={item.id} className="btn btn-ghost" onClick={item.onClick}>{item.name}</button>
        ))
      }

    </ul>
  )
}

export default NavBarOptions;