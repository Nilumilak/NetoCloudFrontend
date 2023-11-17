import { createBrowserRouter } from 'react-router-dom'
import RootElement from './components/RootElement/RootElement'
import Main from './components/Main/Main'
import AdminPanel from './components/AdminPanel/AdminPanel'

const router = createBrowserRouter([
  {
    path: `${import.meta.env.VITE_BASE_PATH}/`,
    element: <RootElement />,
    children: [
        {
            path: "/",
            element: <Main />,
        },
        {
          path: "admin",
          element: <AdminPanel />
        }
    ]
  }
])

export default router
