import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { Provider } from 'react-redux'
import store from './redux/store.ts'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    {/* eslint-disable-next-line @typescript-eslint/no-unsafe-assignment */}
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
)
