import { cn } from '@/lib/shadcn/utils';

type MathTutorLogoProps = {
  className?: string;
  imageClassName?: string;
};

export function MathTutorLogo({ className, imageClassName }: MathTutorLogoProps) {
  return (
    <div
      className={cn(
        'relative flex size-16 shrink-0 items-center justify-center text-white',
        className
      )}
    >
      <img
        src="/logo/android-chrome-512x512.png"
        alt=""
        aria-hidden="true"
        className={cn('size-full object-contain', imageClassName)}
      />
    </div>
  );
}
