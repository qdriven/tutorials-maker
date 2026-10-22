'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowRight, Camera, ImageUp, Loader2, Mic2, PenLine, Sparkles } from 'lucide-react';
import { toast } from 'sonner';
import { MathTutorLogo } from '@/components/math-tutor/math-tutor-logo';
import { MobileDesktopTip } from '@/components/math-tutor/mobile-desktop-tip';
import { Button } from '@/components/ui/button';
import { ImageCropper } from '@/components/ui/image-cropper';

const ALLOWED_TYPES = new Set(['image/jpeg', 'image/png', 'image/webp', 'image/gif']);
const MAX_BYTES = 10 * 1024 * 1024;
const SESSION_KEY = 'mathTutor.pendingHomeworkImage';
const TUTOR_PATH = '/tutor';

type DemoHomework = {
  title: string;
  subtitle: string;
  imageSrc: string;
  fileName: string;
};

const DEMO_HOMEWORKS: DemoHomework[] = [
  {
    title: 'Basic linear equation',
    subtitle: '2x + 3 = 11',
    imageSrc: '/demo/demo-math-equation.png',
    fileName: 'demo-math-equation.png',
  },
  {
    title: 'Variables both sides',
    subtitle: '4(x - 3) = 2x + 10',
    imageSrc: '/demo/demo-linear-equation.png',
    fileName: 'demo-linear-equation.png',
  },
  {
    title: 'Fraction equation',
    subtitle: '(x + 2) / 3 + (x - 1) / 2 = 5',
    imageSrc: '/demo/demo-fraction-equation.png',
    fileName: 'demo-fraction-equation.png',
  },
  {
    title: 'Two-variable system',
    subtitle: '2x + y = 11, x - y = 1',
    imageSrc: '/demo/demo-system-equations.png',
    fileName: 'demo-system-equations.png',
  },
  {
    title: 'Factoring quadratic',
    subtitle: 'x^2 - 5x + 6 = 0',
    imageSrc: '/demo/demo-quadratic-factor.png',
    fileName: 'demo-quadratic-factor.png',
  },
  {
    title: 'Advanced quadratic',
    subtitle: '2x^2 - 7x - 4 = 0',
    imageSrc: '/demo/demo-advanced-quadratic.png',
    fileName: 'demo-advanced-quadratic.png',
  },
];

function validateFile(file: File): string | null {
  if (!ALLOWED_TYPES.has(file.type)) {
    return 'Only JPEG, PNG, WebP, and GIF images are supported.';
  }
  if (file.size > MAX_BYTES) {
    return 'Image must be under 10 MB. Try cropping it first.';
  }
  return null;
}

export function HomeworkUploadPage() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const [cropFile, setCropFile] = useState<File | null>(null);
  const [dragPreviewUrl, setDragPreviewUrl] = useState<string | null>(null);
  const [isPreparingBoard, setIsPreparingBoard] = useState(false);
  const [preparingDescription, setPreparingDescription] = useState(
    'Loading the AI classroom and placing your homework image on the canvas.'
  );

  useEffect(() => {
    router.prefetch(TUTOR_PATH);
  }, [router]);

  useEffect(() => {
    return () => {
      if (dragPreviewUrl) URL.revokeObjectURL(dragPreviewUrl);
    };
  }, [dragPreviewUrl]);

  const openCropper = useCallback(
    (file: File) => {
      if (isPreparingBoard) return;

      const error = validateFile(file);
      if (error) {
        toast.error(error);
        return;
      }
      setCropFile(file);
    },
    [isPreparingBoard]
  );

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) openCropper(file);

    e.target.value = '';
  };

  const handleDragOver = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragOver(true);

      const file = e.dataTransfer.items?.[0];
      if (file?.kind === 'file' && file.type.startsWith('image/')) {
        const actualFile = file.getAsFile();
        if (actualFile) {
          if (dragPreviewUrl) URL.revokeObjectURL(dragPreviewUrl);
          setDragPreviewUrl(URL.createObjectURL(actualFile));
        }
      }
    },
    [dragPreviewUrl]
  );

  const handleDragLeave = useCallback(
    (e: React.DragEvent) => {
      if (!e.currentTarget.contains(e.relatedTarget as Node)) {
        setIsDragOver(false);
        if (dragPreviewUrl) {
          URL.revokeObjectURL(dragPreviewUrl);
          setDragPreviewUrl(null);
        }
      }
    },
    [dragPreviewUrl]
  );

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragOver(false);
      if (dragPreviewUrl) {
        URL.revokeObjectURL(dragPreviewUrl);
        setDragPreviewUrl(null);
      }
      const file = e.dataTransfer.files?.[0];
      if (file) openCropper(file);
    },
    [dragPreviewUrl, openCropper]
  );

  useEffect(() => {
    const handlePaste = (e: ClipboardEvent) => {
      const item = Array.from(e.clipboardData?.items ?? []).find(
        (i) => i.kind === 'file' && i.type.startsWith('image/')
      );
      if (!item) return;
      const file = item.getAsFile();
      if (file) openCropper(file);
    };
    window.addEventListener('paste', handlePaste);
    return () => window.removeEventListener('paste', handlePaste);
  }, [openCropper]);

  const handleCroppedFile = async (croppedFile: File) => {
    setCropFile(null);
    setIsPreparingBoard(true);
    setPreparingDescription(
      'Loading the AI classroom and placing your homework image on the canvas.'
    );

    try {
      const dataUrl = await fileToDataUrl(croppedFile);
      storePendingHomeworkImage(dataUrl, croppedFile.name);
      router.push(TUTOR_PATH);
    } catch {
      setIsPreparingBoard(false);
      toast.error('Unable to prepare this image. Please try another photo.');
    }
  };

  const handleDemoSelect = useCallback(
    async (demo: DemoHomework) => {
      if (isPreparingBoard) return;

      setIsPreparingBoard(true);
      setPreparingDescription('Loading the sample equation and placing it on the tutor board.');

      try {
        const response = await fetch(demo.imageSrc);
        if (!response.ok) {
          throw new Error(`Unable to load demo image: ${demo.imageSrc}`);
        }

        const blob = await response.blob();
        const file = new File([blob], demo.fileName, { type: blob.type || 'image/png' });
        const error = validateFile(file);
        if (error) {
          throw new Error(error);
        }

        const dataUrl = await fileToDataUrl(file);
        storePendingHomeworkImage(dataUrl, demo.fileName);
        router.push(TUTOR_PATH);
      } catch {
        setIsPreparingBoard(false);
        toast.error('Unable to load this sample problem. Please try uploading your own photo.');
      }
    },
    [isPreparingBoard, router]
  );

  const handleSkip = () => {
    setIsPreparingBoard(true);
    setPreparingDescription('Opening a clean whiteboard for writing a problem from scratch.');
    sessionStorage.removeItem(SESSION_KEY);
    router.push(TUTOR_PATH);
  };

  return (
    <main className="relative min-h-svh overflow-hidden bg-[#eaf3ff] px-4 py-5 text-[#142033] sm:px-6 lg:px-8">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(72,128,229,0.08)_1px,transparent_1px),linear-gradient(0deg,rgba(72,128,229,0.08)_1px,transparent_1px)] bg-[size:48px_48px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-80 bg-[linear-gradient(180deg,rgba(255,255,255,0.92),rgba(255,255,255,0))]"
      />

      <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-col gap-6">
        <MobileDesktopTip />

        <header className="flex rounded-3xl border border-white/80 bg-white/72 px-4 py-4 shadow-sm shadow-[#4880e5]/10 backdrop-blur-xl sm:px-5">
          <div className="flex items-center gap-3">
            <MathTutorLogo className="size-14" />
            <div>
              <div className="font-mono text-[11px] font-bold tracking-[0.22em] text-[#4880e5] uppercase">
                Live AI Classroom
              </div>
              <h1 className="font-mono text-2xl font-bold tracking-wide text-[#111827]">
                Math Tutor
              </h1>
            </div>
          </div>
        </header>

        <section className="grid gap-5 lg:grid-cols-[minmax(0,1.03fr)_minmax(390px,0.97fr)] lg:items-stretch">
          <div className="rounded-3xl border border-[#c7dbfb] bg-white/86 p-4 shadow-xl shadow-[#4880e5]/12 backdrop-blur-xl sm:p-6">
            <div className="mb-5">
              <p className="font-mono text-xs font-bold tracking-[0.22em] text-[#4880e5] uppercase">
                Upload your homework
              </p>
              <h2 className="mt-2 max-w-xl text-3xl font-bold tracking-tight text-[#111827] sm:text-4xl">
                Bring a problem into a live tutoring board.
              </h2>
            </div>

            <div
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={() => {
                if (!isPreparingBoard) fileInputRef.current?.click();
              }}
              className={`group relative flex min-h-[310px] cursor-pointer flex-col items-center justify-center overflow-hidden rounded-3xl border-2 border-dashed px-8 py-10 text-center transition-all duration-200 ${
                isDragOver
                  ? 'border-[#4880e5] bg-[#eef5ff] shadow-lg shadow-[#4880e5]/16'
                  : 'border-[#b9d2f7] bg-[linear-gradient(180deg,#ffffff,#f8fbff)] shadow-inner shadow-white hover:border-[#4880e5]/70 hover:shadow-lg hover:shadow-[#4880e5]/12'
              } `}
            >
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-[linear-gradient(90deg,rgba(72,128,229,0.06)_1px,transparent_1px),linear-gradient(0deg,rgba(72,128,229,0.06)_1px,transparent_1px)] bg-[size:28px_28px] opacity-0 transition-opacity duration-200 group-hover:opacity-100"
              />

              {dragPreviewUrl ? (
                <img
                  src={dragPreviewUrl}
                  alt="Preview"
                  className="pointer-events-none relative z-10 h-28 w-auto rounded-xl object-contain opacity-90 shadow-lg"
                />
              ) : (
                <div className="relative z-10 flex size-20 items-center justify-center rounded-3xl bg-[#e9f2ff] shadow-sm ring-1 ring-[#c9daf7]">
                  <ImageUp className="size-9 text-[#4880e5]" strokeWidth={1.7} />
                </div>
              )}

              <div className="relative z-10 mt-5">
                <p className="text-2xl font-bold text-[#17212b]">
                  {isDragOver ? 'Drop to upload' : 'Drop a photo here'}
                </p>
                <p className="mt-2 text-base text-[#63738c]">
                  Paste from clipboard, browse files, or take a phone photo.
                </p>
                <p className="mt-1 text-sm text-[#8b9ab1]">JPEG, PNG, WebP, GIF · up to 10 MB</p>
              </div>

              <div className="relative z-10 mt-6 flex flex-wrap justify-center gap-3">
                <span className="flex items-center gap-2 rounded-xl border border-[#c9daf7] bg-white px-5 py-3 text-base font-semibold text-[#17212b] shadow-sm transition-colors duration-150 group-hover:border-[#4880e5]/70">
                  <Camera className="size-5 text-[#4880e5]" />
                  Browse / Take photo
                </span>
              </div>

              <input
                id="homework-image-input"
                name="homework-image"
                aria-label="Upload homework image"
                ref={fileInputRef}
                type="file"
                accept="image/*"
                capture="environment"
                className="hidden"
                onChange={handleFileSelect}
                onClick={(e) => e.stopPropagation()}
                disabled={isPreparingBoard}
              />
            </div>
          </div>

          <aside className="overflow-hidden rounded-3xl border border-[#c7dbfb] bg-white/90 text-[#17212b] shadow-xl shadow-[#4880e5]/12 backdrop-blur-xl">
            <div className="border-b border-[#d9e7fb] bg-[linear-gradient(135deg,#f8fbff,#edf5ff)] px-5 py-4">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="font-mono text-[11px] font-bold tracking-[0.22em] text-[#4880e5] uppercase">
                    Tutor loop
                  </p>
                  <h2 className="mt-1 text-xl font-bold text-[#111827]">
                    Speak, see, solve together.
                  </h2>
                </div>
                <div className="flex size-11 items-center justify-center rounded-2xl bg-[#4880e5] text-white shadow-sm shadow-[#4880e5]/25">
                  <Sparkles className="size-5" strokeWidth={2} />
                </div>
              </div>
            </div>

            <div className="grid gap-0 sm:grid-cols-[1.05fr_0.95fr] lg:grid-cols-1 xl:grid-cols-[1.05fr_0.95fr]">
              <div className="bg-[#f8fbff] p-4">
                <div className="rounded-2xl border border-[#d9e7fb] bg-white p-4 shadow-sm shadow-[#4880e5]/8">
                  <div className="mb-3 flex items-center justify-between">
                    <span className="font-mono text-[11px] font-bold tracking-widest text-[#4880e5] uppercase">
                      Whiteboard
                    </span>
                    <span className="rounded-full bg-[#e8f9f4] px-2.5 py-1 text-xs font-bold text-[#0f8f6d]">
                      AI writing
                    </span>
                  </div>
                  <div className="rounded-xl border border-[#f0e7d5] bg-[#fffdf7] p-4 shadow-inner shadow-[#f5deb3]/20">
                    <p className="font-mono text-3xl font-bold text-[#111827]">2x + 3 = 11</p>
                    <p className="mt-7 font-mono text-xl font-bold text-[#4b6ff1]">
                      Subtract 3 from both sides.
                    </p>
                    <p className="mt-5 font-mono text-3xl text-[#111827]">2x = 11 - 3</p>
                    <p className="mt-4 font-mono text-3xl text-[#111827]">2x = 8</p>
                    <p className="mt-5 font-mono text-xl font-bold text-[#4b6ff1]">
                      Divide both sides by 2.
                    </p>
                    <p className="mt-5 font-mono text-3xl font-bold text-[#0f8f6d]">x = 4</p>
                  </div>
                </div>
              </div>

              <div className="space-y-4 bg-[linear-gradient(180deg,#ffffff,#f3f8ff)] p-4">
                <div className="flex items-center gap-3 rounded-2xl border border-[#d9e7fb] bg-white p-4 shadow-sm shadow-[#4880e5]/8">
                  <Mic2 className="size-5 shrink-0 text-[#4880e5]" />
                  <div>
                    <p className="text-sm font-bold text-[#17212b]">Voice conversation</p>
                    <p className="text-xs leading-5 text-[#66758d]">
                      The student talks naturally while the transcript stays visible.
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3 rounded-2xl border border-[#d9e7fb] bg-white p-4 shadow-sm shadow-[#4880e5]/8">
                  <PenLine className="size-5 shrink-0 text-[#0f9f75]" />
                  <div>
                    <p className="text-sm font-bold text-[#17212b]">Canvas actions</p>
                    <p className="text-xs leading-5 text-[#66758d]">
                      The tutor can place steps beside the student&apos;s actual work.
                    </p>
                  </div>
                </div>
                <div className="rounded-2xl border border-[#d9e7fb] bg-white p-4 text-[#17212b] shadow-sm shadow-[#4880e5]/8">
                  <p className="text-sm font-semibold">
                    “I don&apos;t know how to solve it. Can you write the process?”
                  </p>
                  <p className="mt-3 rounded-xl bg-[#4880e5] px-3 py-2 text-sm font-semibold text-white">
                    “Let&apos;s isolate x one step at a time.”
                  </p>
                </div>
              </div>
            </div>
          </aside>
        </section>

        <section className="rounded-3xl border border-[#c9daf7] bg-white/82 p-3 shadow-xl shadow-[#4880e5]/10 backdrop-blur-xl sm:p-4">
          <div className="mb-4 flex items-center justify-between gap-4 px-1">
            <div>
              <h2 className="font-mono text-sm font-bold tracking-[0.18em] text-[#25313a] uppercase">
                Try a sample equation
              </h2>
              <p className="mt-1 text-sm text-[#64748b]">Jump straight into a ready-made board.</p>
            </div>
            <div className="flex size-11 shrink-0 items-center justify-center rounded-2xl bg-[#eef5ff] text-[#4880e5]">
              <Sparkles className="size-5" strokeWidth={1.9} />
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {DEMO_HOMEWORKS.map((demo) => (
              <button
                key={demo.imageSrc}
                type="button"
                aria-label={`Try sample problem: ${demo.title}`}
                disabled={isPreparingBoard}
                onClick={() => handleDemoSelect(demo)}
                className="group flex cursor-pointer flex-col gap-3 rounded-2xl border border-[#d9e7fb] bg-[#f8fbff] p-3 text-left shadow-sm transition-all duration-150 hover:-translate-y-1 hover:border-[#4880e5]/70 hover:bg-white hover:shadow-lg hover:shadow-[#4880e5]/12 disabled:cursor-progress disabled:opacity-70"
              >
                <div className="aspect-[4/3] w-full overflow-hidden rounded-lg border border-[#d9e7fb] bg-white">
                  <img
                    src={demo.imageSrc}
                    alt=""
                    className="h-full w-full object-cover object-center transition-transform duration-150 group-hover:scale-[1.03]"
                  />
                </div>

                <div className="min-w-0 flex-1">
                  <div className="text-sm font-semibold text-[#17212b]">{demo.title}</div>
                  <div className="mt-1 truncate font-mono text-sm text-[#4880e5]">
                    {demo.subtitle}
                  </div>
                </div>

                <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-[#4880e5] text-white shadow-sm shadow-[#4880e5]/25 transition-transform duration-150 group-hover:translate-x-0.5">
                  <ArrowRight className="size-4" />
                </div>
              </button>
            ))}
          </div>
        </section>

        <div className="my-2 flex items-center gap-4">
          <div className="h-px flex-1 bg-[#d9e7fb]" />
          <span className="font-mono text-xs text-[#94a3b8]">or</span>
          <div className="h-px flex-1 bg-[#d9e7fb]" />
        </div>

        <div className="mx-auto w-full sm:max-w-[calc((100%-0.75rem)/2)] lg:max-w-[calc((100%-1.5rem)/3)]">
          <Button
            variant="outline"
            className="group h-20 w-full rounded-2xl border-[#d9e7fb] bg-white px-5 font-medium text-[#17212b] shadow-sm transition-all duration-150 hover:-translate-y-0.5 hover:border-[#4880e5]/70 hover:bg-white hover:shadow-md hover:shadow-[#4880e5]/10"
            onClick={handleSkip}
            disabled={isPreparingBoard}
          >
            <span className="flex flex-col items-center gap-1">
              <span className="text-sm font-semibold">Start with empty board</span>
              <span className="font-mono text-xs text-[#64748b]">write from scratch</span>
            </span>
            <span className="ml-3 flex size-9 shrink-0 items-center justify-center rounded-lg bg-[#4880e5] text-white shadow-sm shadow-[#4880e5]/25 transition-transform duration-150 group-hover:translate-x-0.5">
              <ArrowRight className="size-4" />
            </span>
          </Button>
        </div>

        <p className="mt-4 text-center text-xs text-[#94a3b8]">
          You can also write or type your problem directly on the whiteboard.
        </p>
      </div>

      {cropFile && (
        <ImageCropper
          file={cropFile}
          onCrop={handleCroppedFile}
          onCancel={() => setCropFile(null)}
        />
      )}

      {isPreparingBoard && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-[#eef5ff]/90 px-6 backdrop-blur-sm">
          <div className="flex w-full max-w-sm flex-col items-center rounded-2xl border border-[#c9daf7] bg-white px-8 py-7 text-center shadow-xl shadow-[#4880e5]/15">
            <div className="mb-4 flex size-12 items-center justify-center rounded-xl bg-[#eef5ff] text-[#4880e5]">
              <Loader2 className="size-6 animate-spin" strokeWidth={2.2} />
            </div>
            <p className="font-mono text-sm font-bold tracking-wide text-[#17212b] uppercase">
              Preparing your tutor board
            </p>
            <p className="mt-2 text-sm leading-6 text-[#64748b]">{preparingDescription}</p>
          </div>
        </div>
      )}
    </main>
  );
}

function fileToDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

function storePendingHomeworkImage(dataUrl: string, fileName: string) {
  sessionStorage.setItem(SESSION_KEY, JSON.stringify({ dataUrl, fileName }));
}
