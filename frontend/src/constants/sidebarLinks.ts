import { LayoutDashboard, Heart, PlayCircle, Settings } from 'lucide-react';

export const sidebarLinks = [
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Liked Episodes', href: '/dashboard/liked', icon: Heart },      // Episodes they liked
  { name: 'Play History', href: '/dashboard/history', icon: PlayCircle }, // Recently played episodes
  { name: 'Settings', href: '/dashboard/settings', icon: Settings },      // Account & preferences
];