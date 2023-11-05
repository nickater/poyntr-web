import { FC } from 'react'

type StartTemplateProps = {
  cards: JSX.Element[]
}
const StartTemplate: FC<StartTemplateProps> = ({ cards }) => {
  return (
    <div className='flex flex-col md:justify-center md:flex-row gap-8'>
      {
        cards.map((card, index) => (
          <div className='w-full' key={index}>
            {card}
          </div>
        ))
      }
    </div>
  )
}

export { StartTemplate }
