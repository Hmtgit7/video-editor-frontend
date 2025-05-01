'use client';

import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAppSelector } from '../../store/hooks';
import { SubtitleEditor } from '../text/SubtitleEditor';
import { ImageUploader } from '../image/ImageUploader';
import { AudioManager } from '../audio/AudioManager';

export function Sidebar() {
    const videoUrl = useAppSelector(state => state.video.videoUrl);
    const [activeTab, setActiveTab] = useState('text');

    if (!videoUrl) {
        return null;
    }

    return (
        <div className="w-80 bg-gray-950 border-r border-gray-800 h-full overflow-y-auto">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="h-full flex flex-col">
                <TabsList className="grid grid-cols-5 border-b border-gray-700 rounded-none bg-gray-900">
                    <TabsTrigger 
                        value="text" 
                        className="text-xs py-3 data-[state=active]:bg-blue-600 data-[state=active]:text-white"
                    >
                        Text
                    </TabsTrigger>
                    <TabsTrigger 
                        value="videos" 
                        className="text-xs py-3 data-[state=active]:bg-blue-600 data-[state=active]:text-white"
                    >
                        Videos
                    </TabsTrigger>
                    <TabsTrigger 
                        value="photos" 
                        className="text-xs py-3 data-[state=active]:bg-blue-600 data-[state=active]:text-white"
                    >
                        Photos
                    </TabsTrigger>
                    <TabsTrigger 
                        value="audio" 
                        className="text-xs py-3 data-[state=active]:bg-blue-600 data-[state=active]:text-white"
                    >
                        Audio
                    </TabsTrigger>
                    <TabsTrigger 
                        value="effects" 
                        className="text-xs py-3 data-[state=active]:bg-blue-600 data-[state=active]:text-white"
                    >
                        Effects
                    </TabsTrigger>
                </TabsList>

                <div className="flex-grow overflow-y-auto p-4 bg-gradient-to-b from-gray-900 to-gray-950">
                    <TabsContent value="text" className="h-full">
                        <SubtitleEditor />
                    </TabsContent>

                    <TabsContent value="videos" className="h-full">
                        <div className="text-gray-300">Video clips will appear here</div>
                    </TabsContent>

                    <TabsContent value="photos" className="h-full">
                        <ImageUploader />
                    </TabsContent>

                    <TabsContent value="audio" className="h-full">
                        <AudioManager />
                    </TabsContent>

                    <TabsContent value="effects" className="h-full">
                        <div className="grid grid-cols-2 gap-2">
                            {['blur', 'zoom', 'retro', 'shake', 'rainbow'].map(effect => (
                                <div
                                    key={effect}
                                    className="bg-gray-800 rounded p-2 text-center cursor-pointer hover:bg-gray-700"
                                >
                                    {effect.charAt(0).toUpperCase() + effect.slice(1)}
                                </div>
                            ))}
                        </div>

                        <h3 className="font-medium mt-6 mb-2">TRENDING</h3>
                        <div className="grid grid-cols-2 gap-2">
                            {[
                                'Sharpen Edge',
                                'Spooky Night',
                                'Retro Shake',
                                'Auto Style',
                                'Dark Night',
                                'Diamond'
                            ].map(effect => (
                                <div
                                    key={effect}
                                    className="relative rounded overflow-hidden aspect-square bg-gray-800 cursor-pointer hover:bg-gray-700"
                                >
                                    <div className="absolute bottom-2 left-2 text-xs">{effect}</div>
                                </div>
                            ))}
                        </div>
                    </TabsContent>
                </div>
            </Tabs>
        </div>
    );
}