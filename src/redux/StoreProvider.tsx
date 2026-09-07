'use client'

import { SessionProvider } from 'next-auth/react'
import React from 'react'
import { Provider } from 'react-redux'
import { store } from './store'


function StoreProvider({children}:{children:React.ReactNode}) {
  return (
        <Provider store={store}>
            {children}
        </Provider>
  )
}

export default StoreProvider

//  SetProvider is kept separately because it is a client component; keeping it out of layout.tsx allows the layout to remain a server component while still making the session available throughout the app.