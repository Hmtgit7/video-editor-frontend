// app/page.tsx
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-950 text-white p-4">
      <h1 className="text-4xl md:text-6xl font-bold mb-6">Video Editor</h1>
      <p className="text-xl md:text-2xl mb-10 text-gray-300 max-w-2xl text-center">
        A powerful web-based video editing platform. Upload, edit, and export your videos with ease.
      </p>
      <Link href="/editor">
        <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-6 text-xl">
          Start Editing
        </Button>
      </Link>
    </div>
  );
}