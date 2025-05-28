'use client';
import Link from "next/link";

import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuList,
} from "@/components/ui/navigation-menu"
import Signout from "./Signout";

const menuList = [
    { title: 'Profile', path: '/admin/accounts/profile' },
    { title: 'About Me', path: '/admin/accounts/about' },
    { title: 'Contact', path: '/admin/accounts/contact' },
    { title: 'Experience', path: '/admin/accounts/experience' },
    { title: 'Projects', path: '/admin/accounts/projects' },
    { title: 'Skills', path: '/admin/accounts/skills' },
]

function NavBar() {
    return (
        <nav className="flex justify-between">
            <div><Link href="/admin/accounts">Portfolio Builder</Link></div>
            <div>
                <NavigationMenu>
                    <NavigationMenuList className="flex gap-5">
                        {menuList.map((oMenuList, index) => (
                            <NavigationMenuItem key={`menu-${index}`}>
                                <Link href={oMenuList.path} passHref>
                                    {oMenuList.title}
                                </Link>
                            </NavigationMenuItem>
                        ))}
                        <Signout />
                    </NavigationMenuList>
                </NavigationMenu>
            </div>
        </nav>
    )
}

export default NavBar