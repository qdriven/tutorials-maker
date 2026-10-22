import { ImageResponse } from 'next/og';
import getImageSize from 'buffer-image-size';
import mime from 'mime';
import { existsSync } from 'node:fs';
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';

type Dimensions = {
  width: number;
  height: number;
};

type ImageData = {
  base64: string;
  dimensions: Dimensions;
};

export const alt = 'Math Tutor';
export const size = {
  width: 1200,
  height: 628,
};

const OG_LOGO_URI = 'public/logo/logo.svg';

function isRemoteFile(uri: string) {
  return uri.startsWith('http');
}

function doesLocalFileExist(uri: string) {
  return existsSync(join(process.cwd(), uri));
}

async function loadFileData(filePath: string): Promise<ArrayBuffer> {
  if (isRemoteFile(filePath)) {
    const response = await fetch(filePath);
    if (!response.ok) {
      throw new Error(`Failed to fetch ${filePath} - ${response.status} ${response.statusText}`);
    }
    return await response.arrayBuffer();
  }

  if (doesLocalFileExist(filePath)) {
    const buffer = await readFile(join(process.cwd(), filePath));
    return buffer.buffer.slice(
      buffer.byteOffset,
      buffer.byteOffset + buffer.byteLength
    ) as ArrayBuffer;
  }

  const publicFilePath = filePath.replace('public/', '');
  const fontUrl = `https://${process.env.VERCEL_URL}/${publicFilePath}`;

  const response = await fetch(fontUrl);
  if (!response.ok) {
    throw new Error(`Failed to fetch ${fontUrl} - ${response.status} ${response.statusText}`);
  }

  return await response.arrayBuffer();
}

async function getImageData(uri: string, fallbackUri?: string): Promise<ImageData> {
  try {
    const fileData = await loadFileData(uri);
    const buffer = Buffer.from(fileData);
    const mimeType = mime.getType(uri);

    return {
      base64: `data:${mimeType};base64,${buffer.toString('base64')}`,
      dimensions: getImageSize(buffer),
    };
  } catch (e) {
    if (fallbackUri) {
      return getImageData(fallbackUri, fallbackUri);
    }
    throw e;
  }
}

function scaleImageSize(size: Dimensions, desiredHeight: number) {
  const scale = desiredHeight / size.height;
  return {
    width: size.width * scale,
    height: desiredHeight,
  };
}

export const contentType = 'image/png';

export default async function Image() {
  let commitMonoData: ArrayBuffer | undefined;

  try {
    commitMonoData = await loadFileData('public/commit-mono-400-regular.woff');
  } catch (e) {
    console.error('Failed to load fonts:', e);
  }

  const { base64: logoSrcBase64, dimensions: logoDimensions } = await getImageData(OG_LOGO_URI);
  const logoSize = scaleImageSize(logoDimensions, 220);

  return new ImageResponse(
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: size.width,
        height: size.height,
        background: '#eef5ff',
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 56,
        }}
      >
        <img src={logoSrcBase64} width={logoSize.width} height={logoSize.height} />
        <div
          style={{
            fontSize: 96,
            fontWeight: 700,
            fontFamily: 'CommitMono, monospace',
            color: '#111827',
            lineHeight: 1,
            letterSpacing: 0,
          }}
        >
          Math Tutor
        </div>
      </div>
    </div>,

    {
      ...size,
      fonts: [
        ...(commitMonoData
          ? [
              {
                name: 'CommitMono',
                data: commitMonoData,
                style: 'normal' as const,
                weight: 400 as const,
              },
            ]
          : []),
      ],
    }
  );
}
