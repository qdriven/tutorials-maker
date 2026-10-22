'use client';

import type { AppConfig } from '@/app-config';
import { MathTutorWorkspace } from '@/components/math-tutor/math-tutor-workspace';

interface AppProps {
  appConfig: AppConfig;
}

export function App({ appConfig }: AppProps) {
  return <MathTutorWorkspace appConfig={appConfig} />;
}
