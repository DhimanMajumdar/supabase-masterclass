import { Button } from '@/components/ui/button'
import { createClient } from '@/lib/supabase/server'
import React from 'react'

const page = async () => {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  return (
    <div className='flex justify-center items-center min-h-screen'>
      <form action="/auth/logout" method="post">
        <Button>Logout</Button>
      </form>
      {JSON.stringify(user)}
    </div>
  )
}

export default page