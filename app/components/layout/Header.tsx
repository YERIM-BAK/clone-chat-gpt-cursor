"use client";

import { useRouter } from 'next/navigation';
import { useChatStore } from '@/app/store/chatStore';
import { Button } from '@/components/ui/button';

export default function Header() {
  const router = useRouter();
  const addThread = useChatStore((s) => s.addThread);

  return (
    <header className="sticky top-0 z-10 border-b border-border bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto flex h-14 w-full max-w-6xl items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <div className="h-6 w-6 rounded-md bg-primary" />
          <span className="text-sm font-semibold tracking-tight">AI Chat</span>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="default"
            onClick={() => {
              addThread();
              router.refresh();
            }}
          >
            새 대화
          </Button>
        </div>
      </div>
    </header>
  );
}


