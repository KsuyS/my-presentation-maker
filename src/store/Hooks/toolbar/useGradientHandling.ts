import { useState, useCallback } from 'react';
import { useAppActions } from '../useAppActions';

export const useGradientHandling = () => {
    const { changeBackground } = useAppActions();

    // Состояния для градиента
    const [gradientType, setGradientType] = useState<'linear' | 'radial'>('linear');
    const [gradientDirection, setGradientDirection] = useState<string>('to right');
    const [gradientStartColor, setGradientStartColor] = useState<string>('#ffffff');
    const [gradientEndColor, setGradientEndColor] = useState<string>('#000000');
    const [gradientRadialShape, setGradientRadialShape] = useState<'circle' | 'ellipse'>('circle');
    const [gradientRadialPosition, setGradientRadialPosition] = useState<{ x: string; y: string; }>({ x: '50%', y: '50%' });

    const handleGradientTypeChange = useCallback((type: 'linear' | 'radial') => {
        setGradientType(type);
    }, []);

    const handleGradientDirectionChange = useCallback((direction: string) => {
        setGradientDirection(direction);
    }, []);

    const handleGradientColorChange = useCallback((isStart: boolean, color: string) => {
        if (isStart) {
            setGradientStartColor(color);
        } else {
            setGradientEndColor(color);
        }
    }, []);

    const handleRadialShapeChange = useCallback((shape: 'circle' | 'ellipse') => {
        setGradientRadialShape(shape);
    }, []);

    const handleRadialPositionChange = useCallback((axis: 'x' | 'y', value: string) => {
        setGradientRadialPosition(prev => ({
            ...prev,
            [axis]: value
        }));
    }, []);

    const applyGradient = useCallback(() => {
        let gradientValue = '';
        if (gradientType === 'linear') {
            gradientValue = `linear-gradient(${gradientDirection}, ${gradientStartColor}, ${gradientEndColor})`;
        } else {
            gradientValue = `radial-gradient(${gradientRadialShape} at ${gradientRadialPosition.x} ${gradientRadialPosition.y}, ${gradientStartColor}, ${gradientEndColor})`;
        }
        changeBackground({ type: 'gradient', value: gradientValue });
    }, [
        gradientType,
        gradientDirection,
        gradientStartColor,
        gradientEndColor,
        gradientRadialShape,
        gradientRadialPosition,
        changeBackground
    ]);

    return {
        gradientType,
        gradientDirection,
        gradientStartColor,
        gradientEndColor,
        gradientRadialShape,
        gradientRadialPosition,
        handleGradientTypeChange,
        handleGradientDirectionChange,
        handleGradientColorChange,
        handleRadialShapeChange,
        handleRadialPositionChange,
        applyGradient
    };
};