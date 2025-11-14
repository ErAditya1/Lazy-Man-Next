import { Star } from 'lucide-react';
import { useState } from 'react';

interface RatingStarsProps {
  rating?: number;
  maxRating?: number;
  size?: 'sm' | 'md' | 'lg';
  interactive?: boolean;
  onChange?: (rating: number) => void;
}

export function RatingStars({ 
  rating = 0, 
  maxRating = 5, 
  size = 'md', 
  interactive = false,
  onChange 
}: RatingStarsProps) {
  const [hoverRating, setHoverRating] = useState(0);
  
  const sizes = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6'
  };
  
  const displayRating = interactive && hoverRating > 0 ? hoverRating : rating;
  
  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: maxRating }, (_, i) => i + 1).map((star) => {
        const isFilled = star <= displayRating;
        const isPartial = !Number.isInteger(displayRating) && star === Math.ceil(displayRating);
        
        return (
          <button
            key={star}
            type="button"
            className={`${interactive ? 'cursor-pointer' : 'cursor-default'} transition-transform hover:scale-110`}
            onClick={() => interactive && onChange?.(star)}
            onMouseEnter={() => interactive && setHoverRating(star)}
            onMouseLeave={() => interactive && setHoverRating(0)}
            disabled={!interactive}
          >
            <Star 
              className={`${sizes[size]} ${isFilled ? 'fill-yellow-400 text-yellow-400' : 'text-[var(--color-neutral-300)]'}`}
            />
          </button>
        );
      })}
    </div>
  );
}
