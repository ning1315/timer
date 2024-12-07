import { ReactNode } from 'react'

interface LayoutProps {
  children: ReactNode
}

export const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="w-screen h-screen bg-gray-100">
      <div className="sm:w-screen md:flex md:flex-col md:min-w-[375px] md:max-w-[430px] md:mx-auto bg-white h-screen">
        {children}
      </div>
    </div>
  )
}
