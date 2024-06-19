type ContentProps = {
  children: React.ReactNode
}

export default function Content({ children }: ContentProps) {
  return (
    <main className="flex-1 max-w-7xl min-h-screen mx-auto">
      {children}
    </main>
  )
}