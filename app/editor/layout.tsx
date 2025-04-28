// app/editor/layout.tsx
import { EditorLayout } from '../components/layout/EditorLayout';

export default function Layout({ children }: { children: React.ReactNode }) {
    return <EditorLayout>{children}</EditorLayout>;
}