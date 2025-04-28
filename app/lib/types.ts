// app/lib/types.ts
export interface VideoSegment {
    id: string;
    startTime: number;
    endTime: number;
    sourceUrl: string;
    thumbnailUrl: string;
}

export interface AudioTrack {
    id: string;
    name: string;
    url: string;
    duration: number;
    waveformData?: number[];
}

export interface AudioSegment {
    id: string;
    trackId: string;
    startTime: number;
    endTime: number;
    volume: number;
    isMuted: boolean;
}

export interface Subtitle {
    id: string;
    text: string;
    startTime: number;
    endTime: number;
    position: {
        x: number;
        y: number;
    };
    style: {
        fontFamily: string;
        fontSize: number;
        color: string;
        backgroundColor: string;
        bold: boolean;
        italic: boolean;
        underline: boolean;
    };
}

export interface ImageOverlay {
    id: string;
    url: string;
    startTime: number;
    endTime: number;
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

export interface Track {
    id: string;
    type: 'video' | 'audio' | 'subtitle' | 'image';
    name: string;
    items: (VideoSegment | AudioSegment | Subtitle | ImageOverlay)[];
    isMuted?: boolean;
    isLocked?: boolean;
}