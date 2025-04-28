// app/components/text/TextOverlay.tsx
'use client';

import { useState, useEffect } from 'react';
import Draggable from 'react-draggable';
import { useAppSelector } from '../../store/hooks';

interface TextOverlayProps {
    id: string;
    text: string;
    style: {
        fontFamily: string;
        fontSize: number;
        color: string;
        backgroundColor: string;
        bold: boolean;
        italic: boolean;
        underline: boolean;
    };
    position: {
        x: number;
        y: number;
    };
}

export function TextOverlay({ id, text, style, position }: TextOverlayProps) {
    const [pos, setPos] = useState(position);
    const currentTime = useAppSelector(state => state.timeline.currentTime);

    // This would be used in a real implementation to only show the overlay
    // during the defined time range
    const isVisible = true; // This would depend on start/end time

    if (!isVisible) return null;

    return (
        <Draggable
            position={pos}
            onStop={(e, data) => {
                setPos({ x: data.x, y: data.y });
            }}
        >
            <div
                className="absolute cursor-move select-none"
                style={{
                    fontFamily: style.fontFamily,
                    fontSize: `${style.fontSize}px`,
                    color: style.color,
                    backgroundColor: style.backgroundColor || 'transparent',
                    fontWeight: style.bold ? 'bold' : 'normal',
                    fontStyle: style.italic ? 'italic' : 'normal',
                    textDecoration: style.underline ? 'underline' : 'none',
                    padding: '4px 8px',
                    borderRadius: '4px',
                    zIndex: 10,
                }}
            >
                {text}
            </div>
        </Draggable>
    );
}