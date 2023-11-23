import { createBrowserRouter } from 'react-router-dom'

import AdminPanel from './components/AdminPanel/AdminPanel'
import ErrorElement from './components/ErrorElement/ErrorElement'
import Main from './components/Main/Main'
import RootElement from './components/RootElement/RootElement'

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootElement />,
    children: [
      {
        path: '/',
        element: <Main />
      },
      {
        path: 'admin',
        element: <AdminPanel />
      },
      {
        path: 'admin/storages/:id',
        element: <Main />
      },
      {
        path: '*',
        element: <ErrorElement />
      }
    ]
  }
])

export default router
