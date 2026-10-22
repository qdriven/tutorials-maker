'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { type Crop, ReactCrop } from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';

interface ImageCropperProps {
  file: File;
  onCrop: (croppedFile: File) => void;
  onCancel: () => void;
}

export function ImageCropper({ file, onCrop, onCancel }: ImageCropperProps) {
  const [crop, setCrop] = useState<Crop>();
  const [rotation, setRotation] = useState(0);
  const imageRef = useRef<HTMLImageElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);
  const [imgSrc, setImgSrc] = useState<string>('');

  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

  useEffect(() => {
    const objectUrl = URL.createObjectURL(file);
    setImgSrc(objectUrl);
    return () => URL.revokeObjectURL(objectUrl);
  }, [file]);

  const handleImageLoad = useCallback((e: React.SyntheticEvent<HTMLImageElement>) => {
    setIsLoading(false);
    const img = e.currentTarget;
    const container = containerRef.current;
    if (!container) return;

    const availableWidth = container.clientWidth - 32;
    const availableHeight = container.clientHeight - 32;
    const imageRatio = img.naturalWidth / img.naturalHeight;
    const containerRatio = availableWidth / availableHeight;

    let displayWidth: number;
    let displayHeight: number;

    if (imageRatio > containerRatio) {
      displayWidth = availableWidth;
      displayHeight = availableWidth / imageRatio;
    } else {
      displayHeight = availableHeight;
      displayWidth = availableHeight * imageRatio;
    }

    img.style.width = `${displayWidth}px`;
    img.style.height = `${displayHeight}px`;

    setCrop({
      unit: '%',
      width: 90,
      height: 90,
      x: 5,
      y: 5,
    });
  }, []);

  const handleRotate = () => {
    setRotation((prev) => (prev + 90) % 360);
  };

  const handleCropComplete = async () => {
    if (!imageRef.current || !crop) return;
    setIsProcessing(true);

    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (!ctx) {
      setIsProcessing(false);
      return;
    }

    const scaleX = imageRef.current.naturalWidth / imageRef.current.width;
    const scaleY = imageRef.current.naturalHeight / imageRef.current.height;

    let pixelCrop: { x: number; y: number; width: number; height: number };
    if (crop.unit === '%') {
      pixelCrop = {
        x: ((crop.x * imageRef.current.width) / 100) * scaleX,
        y: ((crop.y * imageRef.current.height) / 100) * scaleY,
        width: ((crop.width * imageRef.current.width) / 100) * scaleX,
        height: ((crop.height * imageRef.current.height) / 100) * scaleY,
      };
    } else {
      pixelCrop = {
        x: crop.x * scaleX,
        y: crop.y * scaleY,
        width: crop.width * scaleX,
        height: crop.height * scaleY,
      };
    }

    if (rotation) {
      canvas.width = rotation % 180 ? pixelCrop.height : pixelCrop.width;
      canvas.height = rotation % 180 ? pixelCrop.width : pixelCrop.height;
      ctx.translate(canvas.width / 2, canvas.height / 2);
      ctx.rotate((rotation * Math.PI) / 180);
      ctx.translate(-canvas.width / 2, -canvas.height / 2);
    } else {
      canvas.width = pixelCrop.width;
      canvas.height = pixelCrop.height;
    }

    ctx.drawImage(
      imageRef.current,
      pixelCrop.x,
      pixelCrop.y,
      pixelCrop.width,
      pixelCrop.height,
      0,
      0,
      canvas.width,
      canvas.height
    );

    canvas.toBlob((blob) => {
      if (!blob) {
        setIsProcessing(false);
        return;
      }
      const croppedFile = new File([blob], file.name, {
        type: file.type,
        lastModified: Date.now(),
      });
      onCrop(croppedFile);
    }, file.type);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div
        className={`relative flex flex-col overflow-hidden bg-white ${
          isMobile ? 'h-full w-full' : 'h-[90vh] w-[90vw] max-w-4xl rounded-xl shadow-2xl'
        }`}
      >
        <div className="flex flex-none flex-col border-b border-gray-100 bg-white">
          <div className="flex h-14 items-center justify-between px-4">
            <button
              onClick={onCancel}
              disabled={isProcessing}
              className="cursor-pointer text-gray-400 transition-colors hover:text-gray-700 disabled:cursor-not-allowed disabled:opacity-40"
              aria-label="Cancel"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
            <div className="text-center">
              <p className="font-mono text-sm font-bold text-[#4880e5]">Select the problem area</p>
              <p className="text-xs text-gray-400">Drag to adjust · Rotate if needed</p>
            </div>
            <button
              onClick={handleCropComplete}
              disabled={isProcessing}
              className="flex cursor-pointer items-center gap-2 rounded-lg bg-[#4880e5] px-5 py-2 font-medium text-white transition-colors hover:bg-[#356fce] disabled:cursor-wait disabled:opacity-80"
            >
              {isProcessing && (
                <span className="size-4 animate-spin rounded-full border-2 border-white/60 border-t-white" />
              )}
              {isProcessing ? 'Preparing' : 'Use this'}
            </button>
          </div>
        </div>

        <div
          ref={containerRef}
          className="flex min-h-0 flex-1 items-center justify-center overflow-hidden bg-gray-50 p-4"
        >
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="h-8 w-8 animate-spin rounded-full border-4 border-[#4880e5] border-t-transparent" />
            </div>
          )}
          {imgSrc && (
            <ReactCrop
              crop={crop}
              onChange={(c) => setCrop(c)}
              className="flex items-center justify-center"
              circularCrop={false}
              keepSelection={true}
              minWidth={50}
              minHeight={50}
            >
              <img
                ref={imageRef}
                src={imgSrc}
                onLoad={handleImageLoad}
                style={{ transform: `rotate(${rotation}deg)` }}
                className="max-h-full max-w-full object-contain"
                alt="Crop preview"
              />
            </ReactCrop>
          )}
        </div>

        <div className="flex h-16 flex-none items-center justify-center border-t border-gray-100 bg-white">
          <button
            onClick={handleRotate}
            disabled={isProcessing}
            className="flex h-11 w-11 cursor-pointer items-center justify-center rounded-full bg-gray-100 transition-colors hover:bg-gray-200 disabled:cursor-not-allowed disabled:opacity-40"
            aria-label="Rotate 90°"
          >
            <svg
              className="h-5 w-5 text-gray-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
