// app/components/audio/AudioManager.tsx
'use client';

import { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export function AudioManager() {
    const [activeTab, setActiveTab] = useState('original');
    const [volume, setVolume] = useState(100);
    const [musicUrl, setMusicUrl] = useState<string | null>(null);
    const [musicName, setMusicName] = useState('');

    const onDrop = useCallback((acceptedFiles: File[]) => {
        if (acceptedFiles.length === 0) return;

        const file = acceptedFiles[0];
        const isAudioFile = file.type.startsWith('audio/');

        if (!isAudioFile) {
            console.error('Please upload an audio file');
            return;
        }

        // Create object URL for preview
        const url = URL.createObjectURL(file);
        setMusicUrl(url);
        setMusicName(file.name);
    }, []);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: {
            'audio/*': []
        },
        maxFiles: 1
    });

    const addBackgroundMusic = () => {
        // In a real implementation, this would dispatch an action to add the background music
        console.log('Adding background music:', {
            url: musicUrl,
            name: musicName,
            volume,
        });
    };

    return (
        <div className="h-full">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="h-full flex flex-col">
                <TabsList className="grid grid-cols-2">
                    <TabsTrigger value="original">Original Audio</TabsTrigger>
                    <TabsTrigger value="bgmusic">Background Music</TabsTrigger>
                </TabsList>

                <TabsContent value="original" className="flex-grow overflow-y-auto">
                    <div className="space-y-4 pb-4">
                        <div className="p-4 border border-gray-700 rounded-lg bg-gray-800">
                            <div className="flex justify-between items-center mb-2">
                                <span className="font-medium">Original Audio Track</span>
                                <Button variant="ghost" size="sm" className="h-6 px-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 mr-1">
                                        <path d="M10 3.75a.75.75 0 00-1.264-.546L4.703 7H3.167a.75.75 0 00-.7.48A6.985 6.985 0 002 10c0 .887.165 1.737.468 2.52.111.29.39.48.7.48h1.535l4.033 3.796A.75.75 0 0010 16.25V3.75zM15.95 5.05a.75.75 0 00-1.06 1.061 5.5 5.5 0 010 7.778.75.75 0 001.06 1.06 7 7 0 000-9.899z" />
                                    </svg>
                                    Mute
                                </Button>
                            </div>

                            {/* Audio waveform visualization (mock) */}
                            <div className="h-20 bg-gray-700 rounded overflow-hidden">
                                <div className="w-full h-full bg-repeat-x"
                                    style={{
                                        backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'20\' height=\'80\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M0 40 L2 20 L4 50 L6 10 L8 60 L10 5 L12 70 L14 15 L16 55 L18 25 L20 40\' fill=\'none\' stroke=\'%234CAF50\' stroke-width=\'2\'/%3E%3C/svg%3E")',
                                        backgroundSize: '20px 80px'
                                    }}
                                />
                            </div>

                            <div className="mt-4">
                                <Label>Volume: {volume}%</Label>
                                <Slider
                                    value={[volume]}
                                    min={0}
                                    max={100}
                                    step={1}
                                    onValueChange={(value) => setVolume(value[0])}
                                    className="mt-2"
                                />
                            </div>
                        </div>
                    </div>
                </TabsContent>

                <TabsContent value="bgmusic" className="flex-grow overflow-y-auto">
                    <div className="space-y-4 pb-4">
                        {!musicUrl ? (
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
                                        d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3"
                                    />
                                </svg>

                                <p className="text-sm text-gray-400">Drag & drop audio file or click to browse</p>
                            </div>
                        ) : (
                            <div className="p-4 border border-gray-700 rounded-lg bg-gray-800">
                                <div className="flex justify-between items-center mb-2">
                                    <span className="font-medium truncate">{musicName}</span>
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        className="h-6 px-2"
                                        onClick={() => {
                                            setMusicUrl(null);
                                            setMusicName('');
                                        }}
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                                            <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
                                        </svg>
                                    </Button>
                                </div>

                                {/* Audio waveform visualization (mock) */}
                                <div className="h-20 bg-gray-700 rounded overflow-hidden">
                                    <div className="w-full h-full bg-repeat-x"
                                        style={{
                                            backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'20\' height=\'80\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M0 40 L2 30 L4 45 L6 20 L8 50 L10 25 L12 60 L14 35 L16 45 L18 30 L20 40\' fill=\'none\' stroke=\'%236495ED\' stroke-width=\'2\'/%3E%3C/svg%3E")',
                                            backgroundSize: '20px 80px'
                                        }}
                                    />
                                </div>

                                <audio src={musicUrl} controls className="w-full mt-2 h-10" />

                                <div className="mt-4">
                                    <Label>Volume: {volume}%</Label>
                                    <Slider
                                        value={[volume]}
                                        min={0}
                                        max={100}
                                        step={1}
                                        onValueChange={(value) => setVolume(value[0])}
                                        className="mt-2"
                                    />
                                </div>

                                <Button
                                    onClick={addBackgroundMusic}
                                    className="w-full mt-4 bg-blue-600 hover:bg-blue-700"
                                >
                                    Add Background Music
                                </Button>
                            </div>
                        )}

                        <div className="mt-6">
                            <h3 className="text-sm font-medium mb-3">Suggested Music</h3>
                            <div className="space-y-2">
                                {[
                                    { name: 'Upbeat Pop', duration: '2:45' },
                                    { name: 'Cinematic Score', duration: '3:30' },
                                    { name: 'Acoustic Guitar', duration: '2:15' },
                                    { name: 'Electronic Dance', duration: '3:10' },
                                ].map((track, index) => (
                                    <div
                                        key={index}
                                        className="flex justify-between items-center p-2 bg-gray-800 rounded hover:bg-gray-700 cursor-pointer"
                                    >
                                        <div className="flex items-center">
                                            <div className="w-8 h-8 bg-gray-700 rounded flex items-center justify-center mr-2">
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 9l10.5-3m0 6.553v3.75a2.25 2.25 0 01-1.632 2.163l-1.32.377a1.803 1.803 0 11-.99-3.467l2.31-.66a2.25 2.25 0 001.632-2.163zm0 0V2.25L9 5.25v10.303m0 0v3.75a2.25 2.25 0 01-1.632 2.163l-1.32.377a1.803 1.803 0 01-.99-3.467l2.31-.66A2.25 2.25 0 009 15.553z" />
                                                </svg>
                                            </div>
                                            <span>{track.name}</span>
                                        </div>
                                        <span className="text-sm text-gray-400">{track.duration}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </TabsContent>
            </Tabs>
        </div>
    );
}