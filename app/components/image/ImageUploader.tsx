// app/components/image/ImageUploader.tsx
'use client';

import { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { useAppDispatch } from '../../store/hooks';

export function ImageUploader() {
    const dispatch = useAppDispatch();
    const [imageUrl, setImageUrl] = useState<string | null>(null);
    const [startTime, setStartTime] = useState('00:00');
    const [endTime, setEndTime] = useState('00:05');
    const [opacity, setOpacity] = useState(100);
    const [borderWidth, setBorderWidth] = useState(0);
    const [borderColor, setBorderColor] = useState('#000000');
    const [borderRadius, setBorderRadius] = useState(0);

    const onDrop = useCallback((acceptedFiles: File[]) => {
        if (acceptedFiles.length === 0) return;

        const file = acceptedFiles[0];
        const isImageFile = file.type.startsWith('image/');

        if (!isImageFile) {
            console.error('Please upload an image file');
            return;
        }

        // Create object URL for preview
        const url = URL.createObjectURL(file);
        setImageUrl(url);
    }, []);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: {
            'image/*': []
        },
        maxFiles: 1
    });

    const addImageOverlay = () => {
        // In a real implementation, this would dispatch an action to add the image overlay
        console.log('Adding image overlay:', {
            imageUrl,
            startTime,
            endTime,
            style: {
                opacity,
                borderWidth,
                borderColor,
                borderRadius,
            },
        });
    };

    return (
        <div className="space-y-4 pb-4">
            {!imageUrl ? (
                <div
                    {...getRootProps()}
                    className={`
            border-2 border-dashed rounded-lg p-6 
            flex flex-col items-center justify-center
            cursor-pointer transition-colors h-40
            ${isDragActive ? 'border-blue-500 bg-blue-500/10' : 'border-gray-700 hover:border-gray-500'}
          `}
                >
                    <input {...getInputProps()} />

                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-10 w-10 mb-2 text-gray-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={1.5}
                            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                    </svg>

                    <p className="text-sm text-gray-400">Drag & drop an image or click to browse</p>
                </div>
            ) : (
                <div className="relative">
                    <img
                        src={imageUrl}
                        alt="Uploaded image"
                        className="w-full rounded-lg object-contain max-h-40"
                    />
                    <Button
                        variant="outline"
                        size="icon"
                        className="absolute top-2 right-2 h-6 w-6 bg-black/50 border-gray-600 hover:bg-black/70"
                        onClick={() => setImageUrl(null)}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                            <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
                        </svg>
                    </Button>
                </div>
            )}

            <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label htmlFor="image-start-time">Start Time</Label>
                    <Input
                        id="image-start-time"
                        value={startTime}
                        onChange={(e) => setStartTime(e.target.value)}
                        placeholder="00:00"
                        className="bg-gray-800 border-gray-700"
                    />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="image-end-time">End Time</Label>
                    <Input
                        id="image-end-time"
                        value={endTime}
                        onChange={(e) => setEndTime(e.target.value)}
                        placeholder="00:05"
                        className="bg-gray-800 border-gray-700"
                    />
                </div>
            </div>

            <div className="space-y-2">
                <Label>Opacity: {opacity}%</Label>
                <Slider
                    value={[opacity]}
                    min={0}
                    max={100}
                    step={1}
                    onValueChange={(value) => setOpacity(value[0])}
                />
            </div>

            <div className="space-y-2">
                <Label>Border Width: {borderWidth}px</Label>
                <Slider
                    value={[borderWidth]}
                    min={0}
                    max={20}
                    step={1}
                    onValueChange={(value) => setBorderWidth(value[0])}
                />
            </div>

            <div className="space-y-2">
                <Label>Border Radius: {borderRadius}px</Label>
                <Slider
                    value={[borderRadius]}
                    min={0}
                    max={100}
                    step={1}
                    onValueChange={(value) => setBorderRadius(value[0])}
                />
            </div>

            <div className="space-y-2">
                <Label htmlFor="border-color">Border Color</Label>
                <div className="flex">
                    <Input
                        id="border-color"
                        type="color"
                        value={borderColor}
                        onChange={(e) => setBorderColor(e.target.value)}
                        className="w-12 p-0 bg-transparent border-0"
                    />
                    <Input
                        value={borderColor}
                        onChange={(e) => setBorderColor(e.target.value)}
                        className="flex-grow ml-2 bg-gray-800 border-gray-700"
                    />
                </div>
            </div>

            <Button
                onClick={addImageOverlay}
                disabled={!imageUrl}
                className="w-full mt-4 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-700"
            >
                Add Image Overlay
            </Button>
        </div>
    );
}
