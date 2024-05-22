import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import React, { ReactNode } from 'react'

function QueryProvider({children} : {children : ReactNode}) {
  return (
    <QueryClientProvider client = {new QueryClient()}>
        {children}
    </QueryClientProvider>  
  )
}   

export default QueryProvider