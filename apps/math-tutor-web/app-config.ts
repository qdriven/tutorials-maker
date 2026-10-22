export interface AppConfig {
  pageTitle: string;

  pageDescription: string;

  companyName: string;

  supportsChatInput: boolean;

  supportsVideoInput: boolean;

  supportsScreenShare: boolean;

  isPreConnectBufferEnabled: boolean;

  logo: string;
  startButtonText: string;
  accent?: string;
  logoDark?: string;
  accentDark?: string;

  audioVisualizerType?: 'bar' | 'wave' | 'grid' | 'radial' | 'aura';
  audioVisualizerColor?: `#${string}`;
  audioVisualizerColorDark?: `#${string}`;
  audioVisualizerColorShift?: number;
  audioVisualizerBarCount?: number;
  audioVisualizerGridRowCount?: number;
  audioVisualizerGridColumnCount?: number;
  audioVisualizerRadialBarCount?: number;
  audioVisualizerRadialRadius?: number;
  audioVisualizerWaveLineWidth?: number;

  agentName?: string;

  sandboxId?: string;
}

export const APP_CONFIG_DEFAULTS: AppConfig = {
  companyName: 'Math Tutor',
  pageTitle: 'Math Tutor',
  pageDescription: 'A one-on-one AI math tutor with LiveKit voice and an interactive tldraw canvas',

  supportsChatInput: true,
  supportsVideoInput: false,
  supportsScreenShare: false,
  isPreConnectBufferEnabled: true,

  logo: 'public/logo/android-chrome-512x512.png',
  accent: '#4880e5',
  logoDark: 'public/logo/android-chrome-512x512.png',
  accentDark: '#4880e5',
  startButtonText: 'Start tutoring',

  agentName: process.env.NEXT_PUBLIC_AGENT_NAME ?? process.env.AGENT_NAME ?? 'math-tutor',

  sandboxId: undefined,
};
