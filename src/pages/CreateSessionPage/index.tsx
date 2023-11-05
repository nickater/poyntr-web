import { uuidv4 } from '@firebase/util'
import { useState } from 'react'
import toast from 'react-hot-toast'
import { useLocation } from 'react-router-dom'
import Card from '../../components/molecules/Card'
import { CreateSessionForm, CreateSessionFormData } from '../../components/molecules/CreateSessionForm'
import { CreateTicket } from '../../components/molecules/CreateTicket'
import { Ticket } from '../../components/molecules/Ticket'
import { InputTicketType, TicketType } from '../../types'

const CreateSessionPage = () => {
  const { state } = useLocation()
  const [tickets, setTickets] = useState<TicketType[]>([])
  const [viewSection, setViewSection] = useState<'ticket' | 'session'>('session')

  const onCreateSessionSubmit = (props: CreateSessionFormData) => {
    console.log(props)
    toast.success('Session Created!')
  }

  const onCreateTicketSubmit = (props: InputTicketType) => {
    console.log(state.voteStyle)
    console.log(props)

    // create a unique id with firebase

    const ticket: TicketType = {
      ...props,
      id: uuidv4(),
      votes: [],
      createdAt: new Date(),
      updatedAt: new Date()
    }
    setTickets([...tickets, ticket])
  }

  return (
    <div>
      <div className="collapse bg-base-200 mb-4">
        <input type="radio" name="my-accordion-1" checked={viewSection === 'session'} onChange={() => setViewSection('session')} />
        <div className="collapse-title text-xl font-medium">
          Session Details
        </div>
        <div className="collapse-content">
          <Card>
            <p className='pb-4'>Pointing Style: {state.voteStyle}</p>
            <CreateSessionForm onSubmit={onCreateSessionSubmit} />
          </Card>
        </div>
      </div>
      <div className="collapse bg-base-200">
        <input type="radio" name="my-accordion-1" checked={viewSection === 'ticket'} onChange={() => setViewSection('ticket')} />
        <div className="collapse-title text-xl font-medium">
          Create Ticket
        </div>
        <div className='collapse-content'>
          <CreateTicket onCreateTicketSubmit={onCreateTicketSubmit} />
        </div>
      </div>
      {
        tickets.map((ticket) => (
          <Ticket key={ticket.id} {...ticket} votable={false} />
        ))
      }
    </div>
  )
}

export { CreateSessionPage }
