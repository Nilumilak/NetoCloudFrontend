import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux/es/exports'

import App from './App.tsx'
import store from './redux/store.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
)
