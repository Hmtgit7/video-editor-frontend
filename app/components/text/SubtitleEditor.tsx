'use client';

import { useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { addSubtitle, setPreviewSubtitle, clearPreviewSubtitle } from '../../store/slices/subtitleSlice';
import { setCurrentTime } from '../../store/slices/timelineSlice';
import { v4 as uuidv4 } from 'uuid';

// Helper function to convert time string to seconds
const parseTimeToSeconds = (timeStr: string): number => {
    const parts = timeStr.split(':').map(Number);
    if (parts.length === 2) {
        return parts[0] * 60 + parts[1]; // MM:SS format
    } else if (parts.length === 3) {
        return parts[0] * 3600 + parts[1] * 60 + parts[2]; // HH:MM:SS format
    }
    return 0;
};

export function SubtitleEditor() {
    const dispatch = useAppDispatch();
    const [subtitleText, setSubtitleText] = useState('');
    const [startTime, setStartTime] = useState('00:00');
    const [endTime, setEndTime] = useState('00:05');
    const [fontSize, setFontSize] = useState(24);
    const [fontColor, setFontColor] = useState('#FFFFFF');
    const [backgroundColor, setBackgroundColor] = useState('#000000');
    const [position, setPosition] = useState('bottom');
    const [fontFamily, setFontFamily] = useState('Arial');
    const [activeTab, setActiveTab] = useState('subtitle');

    // Clear preview when unmounting
    useEffect(() => {
        return () => {
            dispatch(clearPreviewSubtitle());
        };
    }, [dispatch]);

    const addSubtitleHandler = () => {
        if (!subtitleText.trim()) return;

        const subtitle = {
            id: uuidv4(),
            text: subtitleText,
            startTime: parseTimeToSeconds(startTime),
            endTime: parseTimeToSeconds(endTime),
            position: {
                x: 50, // Center horizontally
                y: position === 'top' ? 10 : position === 'middle' ? 50 : 90,
            },
            style: {
                fontFamily,
                fontSize,
                color: fontColor,
                backgroundColor: backgroundColor === '#000000' && fontColor === '#FFFFFF'
                    ? 'rgba(0, 0, 0, 0.7)' // Semi-transparent black for white text
                    : backgroundColor,
                bold: false,
                italic: false,
                underline: false,
            },
        };

        dispatch(addSubtitle(subtitle));

        // Clear form or prepare for next entry
        setSubtitleText('');

        // Optionally adjust start time for the next subtitle
        const endSecs = parseTimeToSeconds(endTime);
        const newStartSecs = endSecs;
        const newStartMins = Math.floor(newStartSecs / 60);
        const newStartRemainingSecs = newStartSecs % 60;
        setStartTime(`${String(newStartMins).padStart(2, '0')}:${String(newStartRemainingSecs).padStart(2, '0')}`);

        // And end time (add 5 seconds)
        const newEndSecs = newStartSecs + 5;
        const newEndMins = Math.floor(newEndSecs / 60);
        const newEndRemainingSecs = newEndSecs % 60;
        setEndTime(`${String(newEndMins).padStart(2, '0')}:${String(newEndRemainingSecs).padStart(2, '0')}`);
    };

    const previewSubtitle = () => {
        if (!subtitleText.trim()) return;

        const previewTime = parseTimeToSeconds(startTime);
        dispatch(setCurrentTime(previewTime));

        const subtitle = {
            id: 'preview',
            text: subtitleText,
            startTime: parseTimeToSeconds(startTime),
            endTime: parseTimeToSeconds(endTime),
            position: {
                x: 50, // Center horizontally
                y: position === 'top' ? 10 : position === 'middle' ? 50 : 90,
            },
            style: {
                fontFamily,
                fontSize,
                color: fontColor,
                backgroundColor: backgroundColor === '#000000' && fontColor === '#FFFFFF'
                    ? 'rgba(0, 0, 0, 0.7)' // Semi-transparent black for white text
                    : backgroundColor,
                bold: false,
                italic: false,
                underline: false,
            },
        };

        dispatch(setPreviewSubtitle(subtitle));

        // Clear preview after 3 seconds
        setTimeout(() => {
            dispatch(clearPreviewSubtitle());
        }, 3000);
    };

    return (
        <div className="h-full">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="h-full flex flex-col">
                <TabsList className="grid grid-cols-2">
                    <TabsTrigger
                        value="subtitle"
                        className="data-[state=active]:bg-blue-600 data-[state=active]:text-white"
                    >
                        Subtitle
                    </TabsTrigger>
                    <TabsTrigger
                        value="text"
                        className="data-[state=active]:bg-blue-600 data-[state=active]:text-white"
                    >
                        Text Overlay
                    </TabsTrigger>
                </TabsList>

                <TabsContent value="subtitle" className="flex-grow overflow-y-auto">
                    <div className="space-y-4 pb-4">
                        <div className="space-y-2">
                            <Label htmlFor="subtitle-text">Subtitle Text</Label>
                            <Input
                                id="subtitle-text"
                                value={subtitleText}
                                onChange={(e) => setSubtitleText(e.target.value)}
                                placeholder="Enter subtitle text"
                                className="bg-gray-800 border-gray-700"
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="start-time">Start Time</Label>
                                <Input
                                    id="start-time"
                                    value={startTime}
                                    onChange={(e) => setStartTime(e.target.value)}
                                    placeholder="00:00"
                                    className="bg-gray-800 border-gray-700"
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="end-time">End Time</Label>
                                <Input
                                    id="end-time"
                                    value={endTime}
                                    onChange={(e) => setEndTime(e.target.value)}
                                    placeholder="00:05"
                                    className="bg-gray-800 border-gray-700"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label>Position</Label>
                            <Select value={position} onValueChange={setPosition}>
                                <SelectTrigger className="bg-gray-800 border-gray-700">
                                    <SelectValue placeholder="Select position" />
                                </SelectTrigger>
                                <SelectContent className="bg-gray-800 border-gray-700">
                                    <SelectItem value="top">Top</SelectItem>
                                    <SelectItem value="middle">Middle</SelectItem>
                                    <SelectItem value="bottom">Bottom</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="space-y-2">
                            <Label>Font Family</Label>
                            <Select value={fontFamily} onValueChange={setFontFamily}>
                                <SelectTrigger className="bg-gray-800 border-gray-700">
                                    <SelectValue placeholder="Select font" />
                                </SelectTrigger>
                                <SelectContent className="bg-gray-800 border-gray-700">
                                    <SelectItem value="Arial">Arial</SelectItem>
                                    <SelectItem value="Helvetica">Helvetica</SelectItem>
                                    <SelectItem value="Times New Roman">Times New Roman</SelectItem>
                                    <SelectItem value="Courier New">Courier New</SelectItem>
                                    <SelectItem value="Georgia">Georgia</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="space-y-2">
                            <Label>Font Size: {fontSize}px</Label>
                            <Slider
                                value={[fontSize]}
                                min={12}
                                max={48}
                                step={1}
                                onValueChange={(value) => setFontSize(value[0])}
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="font-color">Font Color</Label>
                                <div className="flex">
                                    <Input
                                        id="font-color"
                                        type="color"
                                        value={fontColor}
                                        onChange={(e) => setFontColor(e.target.value)}
                                        className="w-12 p-0 bg-transparent border-0"
                                    />
                                    <Input
                                        value={fontColor}
                                        onChange={(e) => setFontColor(e.target.value)}
                                        className="flex-grow ml-2 bg-gray-800 border-gray-700"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="bg-color">Background Color</Label>
                                <div className="flex">
                                    <Input
                                        id="bg-color"
                                        type="color"
                                        value={backgroundColor}
                                        onChange={(e) => setBackgroundColor(e.target.value)}
                                        className="w-12 p-0 bg-transparent border-0"
                                    />
                                    <Input
                                        value={backgroundColor}
                                        onChange={(e) => setBackgroundColor(e.target.value)}
                                        className="flex-grow ml-2 bg-gray-800 border-gray-700"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4 mt-4">
                            <Button
                                onClick={previewSubtitle}
                                className="bg-gray-700 hover:bg-gray-600"
                            >
                                Preview Subtitle
                            </Button>

                            <Button
                                onClick={addSubtitleHandler}
                                className="bg-blue-600 hover:bg-blue-700"
                            >
                                Add Subtitle
                            </Button>
                        </div>
                    </div>
                </TabsContent>

                <TabsContent value="text" className="flex-grow overflow-y-auto">
                    <div className="space-y-4 pb-4">
                        <div className="space-y-2">
                            <Label htmlFor="overlay-text">Text Overlay</Label>
                            <Input
                                id="overlay-text"
                                placeholder="Enter text overlay"
                                className="bg-gray-800 border-gray-700"
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="overlay-start-time">Start Time</Label>
                                <Input
                                    id="overlay-start-time"
                                    placeholder="00:00"
                                    className="bg-gray-800 border-gray-700"
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="overlay-end-time">End Time</Label>
                                <Input
                                    id="overlay-end-time"
                                    placeholder="00:05"
                                    className="bg-gray-800 border-gray-700"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label>Font Size</Label>
                            <Slider
                                value={[24]}
                                min={12}
                                max={72}
                                step={1}
                            />
                        </div>

                        <div className="space-y-2">
                            <Label>Position</Label>
                            <div className="grid grid-cols-3 gap-2 mt-2">
                                {['Top Left', 'Top Center', 'Top Right', 'Middle Left', 'Center', 'Middle Right', 'Bottom Left', 'Bottom Center', 'Bottom Right'].map((pos) => (
                                    <Button
                                        key={pos}
                                        variant="outline"
                                        className="h-12 border-gray-700 hover:bg-gray-700"
                                    >
                                        {pos}
                                    </Button>
                                ))}
                            </div>
                        </div>

                        <div className="space-y-2 mt-4">
                            <Label>Text Style</Label>
                            <div className="flex gap-2 mt-2">
                                <Button variant="outline" className="flex-1 border-gray-700 hover:bg-gray-700">
                                    B
                                </Button>
                                <Button variant="outline" className="flex-1 border-gray-700 hover:bg-gray-700">
                                    I
                                </Button>
                                <Button variant="outline" className="flex-1 border-gray-700 hover:bg-gray-700">
                                    U
                                </Button>
                                <Button variant="outline" className="flex-1 border-gray-700 hover:bg-gray-700">
                                    T
                                </Button>
                            </div>
                        </div>

                        <Button className="w-full mt-4 bg-blue-600 hover:bg-blue-700">
                            Add Text Overlay
                        </Button>
                    </div>
                </TabsContent>
            </Tabs>
        </div>
    );
}