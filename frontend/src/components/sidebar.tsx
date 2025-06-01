'use client';

import { usePathname } from 'next/navigation';
import { sidebarLinks } from '@/constants/sidebarLinks';
import Link from 'next/link';
import { useState } from 'react';
import { Menu, X, LogOut, User } from 'lucide-react';

export default function Sidebar() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  const toggleSidebar = () => setCollapsed(!collapsed);

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/auth/login';
  };

  return (
    <aside
      className={`h-screen bg-[var(--bg-clr)] text-[var(--txt-clr)] p-4 flex flex-col justify-between pry-ff transition-all duration-300 border border-[#1A1B1A] ${
        collapsed ? 'w-20' : 'w-64'
      }`}
    >
      <div>
        {/* Toggle Button */}
        <button
          onClick={toggleSidebar}
          className="mb-8 p-2 rounded-md hover:bg-zinc-700 transition self-end"
        >
          {collapsed ? <Menu /> : <X />}
        </button>

        {/* Title */}
        {!collapsed && <h2 className="text-xl font-bold mb-8">LarksPod</h2>}

        {/* Navigation */}
        <nav className="space-y-2">
          {sidebarLinks.map(({ name, href, icon: Icon }) => (
            <Link
              key={name}
              href={href}
              className={`flex items-center gap-3 px-4 py-2 rounded-md transition ${
                pathname === href
                  ? 'bg-[#2B0B0A] text-[#E04B4C]'
                  : 'text-[var(--txt-clr)] hover:bg-zinc-800'
              }`}
            >
              <Icon className="w-5 h-5" />
              {!collapsed && <span>{name}</span>}
            </Link>
          ))}

          {/* Logout Button Styled Like NavLink */}
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 w-full cursor-pointer px-4 py-2 rounded-md text-left text-[var(--txt-clr)] transition bg-[var(--acc-clr)]"
          >
            <LogOut className="w-5 h-5" />
            {!collapsed && <span>Logout</span>}
          </button>
        </nav>
      </div>

      {/* Avatar */}
      <div className="p-4 flex justify-left">
        <div className="p-2 rounded-full bg-gray-700 flex items-center justify-center text-[var(--txt-clr)]">
          <User size={17} />
        </div>
      </div>
    </aside>
  );
}