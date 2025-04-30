// app/components/image/ImageOverlay.tsx
'use client';

import { useState } from 'react';
// First, add the proper type definitions for react-draggable and re-resizable
import Draggable, { DraggableData } from 'react-draggable';
import { Resizable, ResizeCallbackData } from 're-resizable';
import { useAppSelector } from '../../store/hooks';

interface ImageOverlayProps {
    id: string;
    url: string;
    position: {
        x: number;
        y: number;
    };
    size: {
        width: number;
        height: number;
    };
    style: {
        opacity: number;
        borderWidth: number;
        borderColor: string;
        borderRadius: number;
    };
}

export function ImageOverlay({ id, url, position, size, style }: ImageOverlayProps) {
    const [pos, setPos] = useState(position);
    const [dimensions, setDimensions] = useState(size);
    const currentTime = useAppSelector(state => state.timeline.currentTime);

    // This would be used in a real implementation to only show the overlay
    // during the defined time range
    const isVisible = true; // This would depend on start/end time

    if (!isVisible) return null;

    return (
        <Draggable
            position={pos}
            onStop={(e: React.MouseEvent | React.TouchEvent | MouseEvent | TouchEvent, data: DraggableData) => {
                setPos({ x: data.x, y: data.y });
            }}
        >
            <Resizable
                size={dimensions}
                onResizeStop={(
                    e: MouseEvent | TouchEvent,
                    direction: string,
                    ref: HTMLElement,
                    d: ResizeCallbackData
                ) => {
                    setDimensions({
                        width: dimensions.width + d.width,
                        height: dimensions.height + d.height,
                    });
                }}
                minWidth={50}
                minHeight={50}
            >
                <div
                    className="cursor-move select-none absolute"
                    style={{
                        opacity: style.opacity / 100,
                        border: `${style.borderWidth}px solid ${style.borderColor}`,
                        borderRadius: `${style.borderRadius}px`,
                        overflow: 'hidden',
                        width: '100%',
                        height: '100%',
                    }}
                >
                    <img
                        src={url}
                        alt="Overlay"
                        className="w-full h-full object-cover"
                    />
                </div>
            </Resizable>
        </Draggable>
    );
}