'use client';

import { useState } from 'react';
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
    isEditing?: boolean;
}

export function TextOverlay({ id, text, style, position, isEditing = false }: TextOverlayProps) {
    const [pos, setPos] = useState(position);
    const currentTime = useAppSelector(state => state.timeline.currentTime);

    // In a real editor, we'd determine visibility based on time range
    const isVisible = true; // This would depend on start/end time

    if (!isVisible) return null;

    return (
        <div
            className={`absolute ${isEditing ? 'cursor-move' : ''} pointer-events-${isEditing ? 'auto' : 'none'}`}
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
                left: `${pos.x}%`,
                top: `${pos.y}%`,
                transform: 'translate(-50%, -50%)',
                transition: isEditing ? 'none' : 'all 0.2s ease-out',
                textShadow: style.backgroundColor === 'transparent' ? '0 1px 2px rgba(0,0,0,0.7)' : 'none',
            }}
        >
            {text}
        </div>
    );
}