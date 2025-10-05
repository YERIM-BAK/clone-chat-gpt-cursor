'use client';

import dynamic from 'next/dynamic';
import Header from './components/layout/Header';
import Sidebar from './components/layout/Sidebar';

const ChatInterface = dynamic(() => import('./components/chat/ChatInterface'), {
  ssr: false,
});

export default function Home() {
  return (
    <div className="min-h-screen">
      <Header />
      <div className="mx-auto flex w-full max-w-6xl gap-4 px-4 py-4">
        <Sidebar />
        <div className="flex-1">
          <ChatInterface />
        </div>
      </div>
    </div>
  );
}
