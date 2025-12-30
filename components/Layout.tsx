import React from 'react';

interface LayoutProps {
  sidebar: React.ReactNode;
  navigation: React.ReactNode;
  content: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ sidebar, navigation, content }) => {
  return (
    <div className="flex h-screen bg-white overflow-hidden font-sans text-zinc-900 selection:bg-electric selection:text-white">
      {/* Left Sidebar - Inputs */}
      <div className="hidden lg:block h-full shrink-0 shadow-xl z-20 border-r border-zinc-200">
        {sidebar}
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col h-full min-w-0 relative">
        {/* Top Navigation */}
        <header className="bg-white/90 backdrop-blur-md border-b border-zinc-200 z-10 shrink-0">
          {navigation}
        </header>

        {/* Dynamic Content */}
        <main className="flex-1 overflow-hidden relative bg-white">
          {content}
        </main>
      </div>
      
      {/* Mobile Drawer (Hidden on mobile for this demo) */}
    </div>
  );
};
