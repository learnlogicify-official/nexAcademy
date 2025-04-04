'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

const links = [
  {
    title: 'Dashboard',
    href: '/admin',
  },
  {
    title: 'Courses',
    href: '/admin/courses',
  },
  {
    title: 'Users',
    href: '/admin/users',
  },
];

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <div className="w-64 border-r bg-background">
      <div className="flex h-16 items-center border-b px-4">
        <h1 className="text-xl font-semibold">Admin Panel</h1>
      </div>
      <nav className="space-y-1 p-4">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={cn(
              'flex items-center rounded-md px-3 py-2 text-sm font-medium transition-colors',
              pathname === link.href
                ? 'bg-primary text-primary-foreground'
                : 'hover:bg-accent hover:text-accent-foreground'
            )}
          >
            {link.title}
          </Link>
        ))}
      </nav>
    </div>
  );
} 