import { Button } from '@/components/ui/button'
import { Card, CardHeader,CardContent,CardDescription,CardFooter,CardTitle } from '@/components/ui/card'
// import { link } from 'fs'
// import { Ghost } from 'lucide-react'
import React from 'react'

function Shad() {
  return (
    <>
    <Button className='bg-red-500' variant={`link`} size="lg">
        see more
    </Button>
       <Card className='w-[500px] bg-pink-500 text-center'>
  <CardHeader>
    <CardTitle>Card Title</CardTitle>
    <CardDescription>Card Description</CardDescription>
    {/* <CardAction>Card Action</CardAction> */}
      </CardHeader>
    <CardContent>
    <p>Card Content</p>
  </CardContent>
  <CardFooter>
       <p>Card Footer</p>
  </CardFooter>
</Card>
 
    </>
  )
}

export default Shad