import { ServiceCategory, Language } from '../types';
import { t } from '../lib/translations';
import { categoryImages } from '../lib/mockData';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface CategoryCardProps {
  category: ServiceCategory;
  lang: Language;
  onClick: () => void;
}

export function CategoryCard({ category, lang, onClick }: CategoryCardProps) {
  return (
    <div
      onClick={onClick}
      className="flex-shrink-0 w-28 cursor-pointer group"
    >
      <div className="relative rounded-xl overflow-hidden mb-2 aspect-square">
        <ImageWithFallback
          src={categoryImages[category]}
          alt={t(category, lang)}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
      </div>
      <p className="text-center text-sm text-gray-900 truncate">
        {t(category, lang)}
      </p>
    </div>
  );
}