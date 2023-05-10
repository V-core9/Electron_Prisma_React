import { useState } from 'react';

interface DashboardLayoutProps {
  children: JSX.Element;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <div>DashboardLayout</div>
      <div>DashboardLayout</div>
      <div>DashboardLayout</div>
      {children}
    </div>
  );
}
