import { useRef, useState } from 'react'
import { FieldErrors } from 'react-hook-form'
import toast from 'react-hot-toast'
import { useLocation } from 'react-router-dom'
import Card from '../../components/molecules/Card'
import { CreateSessionForm, CreateSessionFormData } from '../../components/molecules/CreateSessionForm'
import { CreateTicket } from '../../components/molecules/CreateTicket'
import { Ticket } from '../../components/molecules/Ticket'
import { VOTING_OPTIONS, VotingOptions } from '../../constants'
import { useUser } from '../../hooks/useUser'
import { createSession } from '../../services/session'
import { createTickets } from '../../services/ticket'
import { SessionInsertDto, TicketInsertDto } from '../../types'
import { wait } from '../../utils/wait'
import { mapSessionFormToInputSessionType } from './utils'

const CreateSessionPage = () => {
  const { state } = useLocation()
  const { user } = useUser()
  const [tickets, setTickets] = useState<TicketInsertDto[]>([])
  const sessionRef = useRef<SessionInsertDto | null>(null)
  const [viewSection, setViewSection] = useState<'ticket' | 'session'>('session')

  const onCreateSessionSubmitSuccessful = async (props: CreateSessionFormData) => {
    if (!user) {
      toast.error('User not found')
      return
    }

    const mappedSession = mapSessionFormToInputSessionType({
      name: props.name!,
      description: props.description!,
      owner_id: user.id,
    })
    console.log(mappedSession)
    sessionRef.current = mappedSession

    toast.success('Session details saved')
    await wait(600)
    setViewSection('ticket')
  }

  const onCreateSessionSubmitFailed = (props: FieldErrors<CreateSessionFormData>) => {
    if (props.name?.type === 'required') {
      toast.error('Session name is required')
      return
    }
  }

  const onCreateTicketSubmitSuccess = async (ticket: TicketInsertDto) => {
    if (!sessionRef.current) {
      toast.error('Set session details first')
      await wait(600)
      setViewSection('session')
      return
    }

    setTickets([...tickets, ticket])
  }

  const onCreateTicketSubmitFailed = (errors: FieldErrors<TicketInsertDto>) => {
    if (errors.url?.type === 'required') {
      toast.error('Ticket URL is required')
      return
    }

    if (errors.url?.type === 'pattern') {
      toast.error('Ticket URL must be a valid URL')
      return
    }
  }

  const handleFinalize = async () => {
    if (!sessionRef.current) {
      toast.error('Session not found')
      return
    }

    const session = sessionRef.current
    const createdSession = await createSession(session)

    if (createdSession.err) {
      toast.error('Error creating session')
      return
    }

    const sessionId = createdSession.safeUnwrap()

    const ticketsToAdd: TicketInsertDto[] = []
    for (const ticket of tickets) {
      ticket.session_id = sessionId
      ticketsToAdd.push(ticket)
    }

    await createTickets(ticketsToAdd)

    toast.success('Session created')
  }

  const removeTicket = (ticketIndex: number) => {
    return () => {
      const newTickets = [...tickets]
      newTickets.splice(ticketIndex, 1)
      setTickets(newTickets)
    }
  }

  const formattedVoteStyle = VOTING_OPTIONS[state.voteStyle as keyof VotingOptions].label


  return (
    <div>
      {
        tickets.length > 0 && (
          <div className='p-4'>
            <button className='btn btn-outline mb-4 w-full' onClick={handleFinalize}>Finalize</button>
          </div>
        )
      }
      <div className="collapse bg-base-200 mb-4">
        <input type="radio" name="my-accordion-1" checked={viewSection === 'session'} onChange={() => setViewSection('session')} />
        <div className="collapse-title text-xl font-medium">
          Session Details
        </div>
        <div className="collapse-content">
          <Card>
            <p className='pb-4'>Pointing Style: {formattedVoteStyle}</p>
            <CreateSessionForm onValidSubmit={onCreateSessionSubmitSuccessful} onInvalidSubmit={onCreateSessionSubmitFailed} />
          </Card>
        </div>
      </div>
      <div className="collapse bg-base-200">
        <input type="radio" name="my-accordion-1" checked={viewSection === 'ticket'} onChange={() => setViewSection('ticket')} />
        <div className="collapse-title text-xl font-medium">
          Add Tickets
        </div>
        <div className='collapse-content'>
          <CreateTicket onValidSubmit={onCreateTicketSubmitSuccess} onInvalidSubmit={onCreateTicketSubmitFailed} />
        </div>
      </div>
      {
        tickets.map((ticket, index) => (
          <div className='flex flex-row mx-4 mt-4 outline outline-1  rounded-md'>
            <div className='flex-grow'>
              <Ticket
                key={ticket.id}
                votable={false}
                description={null}
                name={ticket.name || null}
                url={ticket.url} />
            </div>
            <button className='btn btn-ghost' onClick={removeTicket(index)}>Delete</button>
          </div>
        ))
      }
    </div>
  )
}

export { CreateSessionPage }
