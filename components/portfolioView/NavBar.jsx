'use client'

import { navbarData } from "@/app/assets"

const NavBar = () => {
  return (
    <div className="z-10 w-full fixed bottom-0 flex justify-evenly p-5 bg-[#E6E7EB]">
        {navbarData.map((onavbarData, index) => (
            <a key={index} href={`#${onavbarData.id}`} className="group flex flex-col items-center p-2">
                <div className="text-2xl text-yellow-600 group-hover:scale-125 transition-all">{onavbarData.icon}</div>
                <div className="text-[10px] group-hover:scale-125">{onavbarData.name}</div>
            </a>
        ))}
    </div>
  )
}

export default NavBar