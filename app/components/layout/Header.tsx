// app/components/layout/Header.tsx
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { useAppSelector, useAppDispatch } from '../../store/hooks';
import { setProjectName } from '../../store/slices/projectSlice';

export function Header() {
    const dispatch = useAppDispatch();
    const projectName = useAppSelector(state => state.project.name);
    const [editingName, setEditingName] = useState(false);
    const [nameInput, setNameInput] = useState(projectName);

    const handleNameChange = () => {
        if (nameInput.trim()) {
            dispatch(setProjectName(nameInput));
        } else {
            setNameInput(projectName);
        }
        setEditingName(false);
    };

    return (
        <header className="h-16 bg-gray-900 border-b border-gray-800 flex items-center justify-between px-4">
            <div className="flex items-center">
                <Link href="/" className="text-blue-500 font-bold text-2xl mr-8">
                    VideoEditor
                </Link>

                {editingName ? (
                    <div className="flex items-center">
                        <input
                            type="text"
                            value={nameInput}
                            onChange={e => setNameInput(e.target.value)}
                            onBlur={handleNameChange}
                            onKeyDown={e => e.key === 'Enter' && handleNameChange()}
                            autoFocus
                            className="bg-gray-800 text-white px-2 py-1 border border-gray-700 rounded"
                        />
                    </div>
                ) : (
                    <div
                        className="font-medium hover:bg-gray-800 px-2 py-1 rounded cursor-pointer"
                        onClick={() => setEditingName(true)}
                    >
                        {projectName}
                    </div>
                )}
            </div>

            <div className="flex items-center gap-2">
                <Button
                    variant="outline"
                    size="sm"
                    className="border-gray-700 text-gray-300"
                >
                    Undo
                </Button>
                <Button
                    variant="outline"
                    size="sm"
                    className="border-gray-700 text-gray-300"
                >
                    Redo
                </Button>
                <Button
                    variant="default"
                    size="sm"
                    className="bg-blue-600 hover:bg-blue-700 ml-4"
                >
                    Save
                </Button>
                <Button
                    variant="default"
                    size="sm"
                    className="bg-green-600 hover:bg-green-700"
                >
                    Export
                </Button>
            </div>
        </header>
    );
}