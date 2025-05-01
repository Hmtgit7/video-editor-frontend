'use client';

import { useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { useAppDispatch } from '../../store/hooks';
import { reorderVideoSegments } from '../../store/slices/videoSlice';
import { cn } from '@/lib/utils';

interface DraggableSegmentProps {
    id: string;
    index: number;
    segmentWidth: string | number;
    segmentLeft: string | number;
    children: React.ReactNode;
    className?: string;
}

type DragItem = {
    id: string;
    index: number;
    type: string;
};

export function DraggableSegment({
    id,
    index,
    segmentWidth,
    segmentLeft,
    children,
    className
}: DraggableSegmentProps) {
    const dispatch = useAppDispatch();
    const ref = useRef<HTMLDivElement>(null);

    const [{ isDragging }, drag] = useDrag({
        type: 'VIDEO_SEGMENT',
        item: () => ({ id, index, type: 'VIDEO_SEGMENT' }),
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    });

    const [{ isOver, canDrop }, drop] = useDrop({
        accept: 'VIDEO_SEGMENT',
        canDrop: () => true,
        hover: (item: DragItem, monitor) => {
            if (!ref.current) {
                return;
            }

            const dragIndex = item.index;
            const hoverIndex = index;

            // Don't replace items with themselves
            if (dragIndex === hoverIndex) {
                return;
            }

            // Determine rectangle on screen
            const hoverBoundingRect = ref.current.getBoundingClientRect();

            // Get horizontal middle
            const hoverMiddleX = (hoverBoundingRect.right - hoverBoundingRect.left) / 2;

            // Determine mouse position
            const clientOffset = monitor.getClientOffset();

            // Get pixels to the left
            const hoverClientX = clientOffset!.x - hoverBoundingRect.left;

            // Only perform the move when the mouse has crossed half of the items width
            if (
                (dragIndex < hoverIndex && hoverClientX < hoverMiddleX) ||
                (dragIndex > hoverIndex && hoverClientX > hoverMiddleX)
            ) {
                return;
            }

            // Time to actually perform the action
            dispatch(reorderVideoSegments({ fromIndex: dragIndex, toIndex: hoverIndex }));

            // Note: we're mutating the monitor item here!
            // Generally it's better to avoid mutations,
            // but it's good here for the sake of performance
            // to avoid expensive index searches.
            item.index = hoverIndex;
        },
        collect: (monitor) => ({
            isOver: monitor.isOver(),
            canDrop: monitor.canDrop(),
        }),
    });

    // Initialize drag and drop refs
    drag(drop(ref));

    return (
        <div
            ref={ref}
            className={cn(
                "absolute h-12 rounded cursor-move flex items-center justify-center",
                isDragging && "opacity-50 border-2 border-dashed border-blue-500",
                isOver && canDrop && "bg-blue-500/30",
                className
            )}
            style={{
                width: segmentWidth,
                left: segmentLeft,
            }}
        >
            {children}
        </div>
    );
}