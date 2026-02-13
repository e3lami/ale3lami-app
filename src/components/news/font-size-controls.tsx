'use client';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ZoomIn, ZoomOut } from 'lucide-react';

interface FontSizeControlsProps {
    onSizeChange: (newSizeClass: string) => void;
}

const fontSizes = ['prose-base', 'prose-lg', 'prose-xl', 'prose-2xl'];

export default function FontSizeControls({ onSizeChange }: FontSizeControlsProps) {
    const [currentIndex, setCurrentIndex] = useState(1); // 'prose-lg' is default

    const increaseSize = () => {
        if (currentIndex < fontSizes.length - 1) {
            const newIndex = currentIndex + 1;
            setCurrentIndex(newIndex);
            onSizeChange(fontSizes[newIndex]);
        }
    };

    const decreaseSize = () => {
        if (currentIndex > 0) {
            const newIndex = currentIndex - 1;
            setCurrentIndex(newIndex);
            onSizeChange(fontSizes[newIndex]);
        }
    };

    return (
        <div className="flex items-center gap-1">
            <Button variant="outline" size="icon" className="h-8 w-8" onClick={decreaseSize} disabled={currentIndex === 0} aria-label="Decrease font size">
                <ZoomOut className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon" className="h-8 w-8" onClick={increaseSize} disabled={currentIndex === fontSizes.length - 1} aria-label="Increase font size">
                <ZoomIn className="h-4 w-4" />
            </Button>
        </div>
    );
}
