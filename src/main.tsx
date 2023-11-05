import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { AppContainer } from './components/organisms/AppContainer'
import './index.css'
import { CreateSessionPage } from './pages/CreateSessionPage'
import { SessionPage } from './pages/SessionPage'
import { StartPage } from './pages/StartPage'
import { store } from './store'

const router = createBrowserRouter([
  {
    path: '/',
    element: <AppContainer />,
    children: [
      {
        path: '/',
        element: <StartPage />
      },
      {
        path: '/session',
        element: <CreateSessionPage />
      },
      {
        path: '/session/:sessionId',
        element: <SessionPage />
      }
    ]
  }
])

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 15, // 15 minutes
      refetchOnWindowFocus: false,
      refetchOnMount: true
    },
  }
})


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </Provider>
  </React.StrictMode>
)
