
function LayoutWrapper({ id, children }: { id: string, children: React.ReactNode }) {
  return (
    <div id={id} className="min-h-screen flex flex-col justify-center items-center p-6">
        {children}
    </div>
  )
}

export default LayoutWrapper