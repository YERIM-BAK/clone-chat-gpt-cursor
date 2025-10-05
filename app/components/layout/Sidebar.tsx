"use client";

import { useChatStore } from '@/app/store/chatStore';

export default function Sidebar() {
  const { threads, activeThreadId, setActiveThread } = useChatStore();

  return (
    <aside className="hidden w-64 shrink-0 border-r p-3 md:block">
      <div className="mb-2 text-xs font-semibold text-gray-500">대화목록</div>
      <div className="flex flex-col gap-1">
        {threads.length === 0 && (
          <div className="text-xs text-gray-500">대화가 없습니다</div>
        )}
        {threads.map((t) => (
          <button
            key={t.id}
            className={`w-full truncate rounded-md px-2 py-2 text-left text-sm hover:bg-gray-100 dark:hover:bg-gray-800 ${
              t.id === activeThreadId ? 'bg-gray-100 dark:bg-gray-800' : ''
            }`}
            onClick={() => setActiveThread(t.id)}
            title={t.title}
          >
            {t.title}
          </button>
        ))}
      </div>
    </aside>
  );
}


