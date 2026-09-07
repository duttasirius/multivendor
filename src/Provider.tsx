'use client'

import { SessionProvider } from 'next-auth/react'
import React from 'react'

function Provider({children}:{children:React.ReactNode}) {
  return (
        <SessionProvider>
            {children}
        </SessionProvider>
  )
}

export default Provider

//// SessionProvider is kept separately because it is a client component; keeping it out of layout.tsx allows the layout to remain a server component while still making the session available throughout the app.