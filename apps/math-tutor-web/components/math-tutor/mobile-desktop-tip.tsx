import { MonitorUp } from 'lucide-react';
import { cn } from '@/lib/shadcn/utils';

export function MobileDesktopTip({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        'flex w-full max-w-lg items-start gap-3 rounded-xl border border-[#b8cff4] bg-white px-4 py-3 text-left shadow-sm sm:hidden',
        className
      )}
    >
      <div className="mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-lg bg-[#eef5ff] text-[#4880e5]">
        <MonitorUp className="size-4.5" strokeWidth={2.2} />
      </div>
      <div>
        <p className="font-mono text-[11px] font-bold tracking-widest text-[#4880e5] uppercase">
          Tip
        </p>
        <p className="mt-1 text-sm leading-5 font-medium text-[#25313a]">
          Math Tutor works best on a desktop or laptop for a smoother tutoring experience.
        </p>
      </div>
    </div>
  );
}
