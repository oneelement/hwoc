type ContentProps = {
  children: React.ReactNode
}

export default function Content({ children }: ContentProps) {
  return (
    <main className="flex-1 px-6 pt-3 max-w-7xl mx-auto ">
      {children}
    </main>
  )
}