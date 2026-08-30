import { render, screen } from '@testing-library/react';
import Tile from '../components/Tile';
import { describe, it, expect } from 'vitest';

describe('Tile', () => {
    it('renders with correct letter and status', () => {
        render(<Tile letter="A" status="correct" />);
        expect(screen.getByText('A')).toBeInTheDocument();
        expect(screen.getByText('A')).toHaveClass('bg-green-500');
        expect(screen.getByText('A')).toHaveClass('text-white');
    });
    
    it('renders with present status', () => {
        render(<Tile letter="B" status="present" />);
        expect(screen.getByText('B')).toBeInTheDocument();
        expect(screen.getByText('B')).toHaveClass('bg-yellow-500');
        expect(screen.getByText('B')).toHaveClass('text-white');
    });
    
    it('renders with absent status', () => {
        render(<Tile letter="C" status="absent" />);
        expect(screen.getByText('C')).toBeInTheDocument();
        expect(screen.getByText('C')).toHaveClass('bg-gray-500');
        expect(screen.getByText('C')).toHaveClass('text-white');
    });
    
    it('renders with empty status', () => {
        render(<Tile letter="D" status="" />);
        expect(screen.getByText('D')).toBeInTheDocument();
        expect(screen.getByText('D')).toHaveClass('bg-white');
        expect(screen.getByText('D')).toHaveClass('text-gray-500');
    });
});