import { useState } from 'react'
import { Button } from '@/components/ui/button'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background text-foreground p-8">
      <div className="max-w-2xl mx-auto text-center space-y-8">
        <h1 className="text-4xl font-bold tracking-tight">
          Vite + React + Shadcn UI
        </h1>

        <div className="space-y-4">
          <p className="text-lg text-muted-foreground">
            Click the button to test the setup
          </p>

          <div className="flex gap-4 justify-center flex-wrap">
            <Button onClick={() => setCount((count) => count + 1)}>
              Count is {count}
            </Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="destructive">Destructive</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="link">Link</Button>
          </div>
        </div>

        <div className="pt-8 space-y-2">
          <p className="text-sm text-muted-foreground">
            Edit <code className="bg-muted px-2 py-1 rounded">src/App.jsx</code> and save to test HMR
          </p>
          <p className="text-sm text-muted-foreground">
            Shadcn UI is successfully integrated! 🎉
          </p>
        </div>
      </div>
    </div>
  )
}

export default App
