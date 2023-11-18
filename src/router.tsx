import { createBrowserRouter } from 'react-router-dom'

import AdminPanel from './components/AdminPanel/AdminPanel'
import Main from './components/Main/Main'
import RootElement from './components/RootElement/RootElement'

const router = createBrowserRouter([
  {
    path: `${import.meta.env.VITE_BASE_PATH}/`,
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
      }
    ]
  }
])

export default router
