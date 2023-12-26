import { FC, PropsWithChildren } from 'react';

type CardProps = {
  title?: string;
}

const Card: FC<PropsWithChildren<CardProps>> = ({ title, children }) => {
  return (
    <div className="card card-compact h-full w-full bg-neutral text-neutral-content shadow-xl md:card-normal">
      <div className="card-body h-full justify-between" >
        <h2 className="card-title">{title}</h2>
        {
          children
        }
      </div>
    </div>
  );
}

export default Card;