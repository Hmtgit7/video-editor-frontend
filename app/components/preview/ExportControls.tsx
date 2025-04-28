// app/components/preview/ExportControls.tsx
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Progress } from '@/components/ui/progress';
import { useAppDispatch, useAppSelector } from '../../store/hooks';

export function ExportControls() {
    const dispatch = useAppDispatch();
    const [isExporting, setIsExporting] = useState(false);
    const [exportProgress, setExportProgress] = useState(0);
    const [format, setFormat] = useState<'mp4' | 'webm' | 'gif'>('mp4');
    const [quality, setQuality] = useState<'low' | 'medium' | 'high'>('high');
    const [exportDialogOpen, setExportDialogOpen] = useState(false);

    const handleExport = () => {
        setIsExporting(true);
        setExportDialogOpen(false);

        // Simulate export process
        let progress = 0;
        const interval = setInterval(() => {
            progress += 5;
            setExportProgress(progress);

            if (progress >= 100) {
                clearInterval(interval);
                setIsExporting(false);

                // Simulate a download after 1 second
                setTimeout(() => {
                    const a = document.createElement('a');
                    a.href = '#';
                    a.download = `export.${format}`;
                    a.click();
                }, 1000);
            }
        }, 300);
    };

    return (
        <div className="flex items-center gap-4">
            {isExporting ? (
                <div className="flex items-center gap-4 w-64">
                    <Progress value={exportProgress} className="h-2 flex-grow" />
                    <span className="text-sm whitespace-nowrap">{exportProgress}%</span>
                </div>
            ) : (
                <Dialog open={exportDialogOpen} onOpenChange={setExportDialogOpen}>
                    <DialogTrigger asChild>
                        <Button className="bg-blue-600 hover:bg-blue-700">
                            Export Video
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-md bg-gray-900 border-gray-800">
                        <DialogHeader>
                            <DialogTitle>Export Video</DialogTitle>
                            <DialogDescription>
                                Choose your export settings below.
                            </DialogDescription>
                        </DialogHeader>

                        <div className="grid gap-4 py-4">
                            <div className="space-y-2">
                                <Label>Format</Label>
                                <RadioGroup value={format} onValueChange={(val) => setFormat(val as any)}>
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem value="mp4" id="mp4" />
                                        <Label htmlFor="mp4">MP4</Label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem value="webm" id="webm" />
                                        <Label htmlFor="webm">WebM</Label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem value="gif" id="gif" />
                                        <Label htmlFor="gif">GIF</Label>
                                    </div>
                                </RadioGroup>
                            </div>

                            <div className="space-y-2">
                                <Label>Quality</Label>
                                <RadioGroup value={quality} onValueChange={(val) => setQuality(val as any)}>
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem value="low" id="low" />
                                        <Label htmlFor="low">Low (Fast)</Label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem value="medium" id="medium" />
                                        <Label htmlFor="medium">Medium</Label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem value="high" id="high" />
                                        <Label htmlFor="high">High (Slow)</Label>
                                    </div>
                                </RadioGroup>
                            </div>
                        </div>

                        <DialogFooter>
                            <Button variant="outline" onClick={() => setExportDialogOpen(false)}>
                                Cancel
                            </Button>
                            <Button className="bg-blue-600 hover:bg-blue-700" onClick={handleExport}>
                                Export
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            )}
        </div>
    );
}