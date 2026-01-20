import { ReactNode } from "react";
import { BottomNav } from "./BottomNav";

interface MobileLayoutProps {
  children: ReactNode;
  hideNav?: boolean;
}

export function MobileLayout({ children, hideNav = false }: MobileLayoutProps) {
  return (
    <div className="min-h-screen bg-background flex flex-col max-w-md mx-auto relative">
      <main className={hideNav ? "" : "pb-24"}>
        {children}
      </main>
      {!hideNav && <BottomNav />}
    </div>
  );
}
