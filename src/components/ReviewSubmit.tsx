import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Star, Check } from 'lucide-react';
import { toast } from 'sonner@2.0.3';

const reviewCategories = [
  { id: 'quality', label: 'Quality', labelHindi: 'गुणवत्ता' },
  { id: 'punctuality', label: 'Punctuality', labelHindi: 'समयनिष्ठा' },
  { id: 'behavior', label: 'Behavior', labelHindi: 'व्यवहार' },
  { id: 'value', label: 'Value for Money', labelHindi: 'पैसे का मूल्य' },
];

export default function ReviewSubmit() {
  const navigate = useNavigate();
  const { bookingId } = useParams();
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState('');
  const [categoryRatings, setCategoryRatings] = useState<Record<string, number>>({});
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (rating === 0) {
      toast.error('Please provide a rating');
      return;
    }

    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setLoading(false);

    toast.success('Review submitted successfully!', {
      description: 'समीक्षा सफलतापूर्वक सबमिट की गई!',
    });

    navigate('/home');
  };

  return (
    <div className="min-h-screen bg-[#F7F8FA] pb-24">
      {/* Header */}
      <div className="bg-white px-4 py-4 shadow-sm sticky top-0 z-10">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate('/home')}
            className="p-2 hover:bg-[#F7F8FA] rounded-lg -ml-2"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <div>
            <h3>Rate & Review</h3>
            <p className="text-[#9CA3AF]">समीक्षा दें</p>
          </div>
        </div>
      </div>

      <div className="p-4 space-y-6">
        {/* Provider Info */}
        <div className="bg-white p-6 rounded-xl">
          <div className="flex items-center gap-3">
            <div className="w-16 h-16 bg-gradient-to-br from-[#FF6B35] to-[#E55A2A] rounded-xl flex items-center justify-center text-white">
              RK
            </div>
            <div>
              <h4>Rajesh Kumar</h4>
              <p className="text-[#6B7280]">Professional Plumber</p>
              <p className="text-[#9CA3AF]">Pipe Leak Repair</p>
            </div>
          </div>
        </div>

        {/* Overall Rating */}
        <div className="bg-white p-6 rounded-xl">
          <h3 className="mb-2">Overall Rating</h3>
          <p className="text-[#6B7280] mb-6">How was your experience?</p>
          
          <div className="flex justify-center gap-4 mb-4">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                onClick={() => setRating(star)}
                onMouseEnter={() => setHoverRating(star)}
                onMouseLeave={() => setHoverRating(0)}
                className="transition-transform hover:scale-110 active:scale-95"
              >
                <Star
                  className={`w-12 h-12 transition-colors ${
                    star <= (hoverRating || rating)
                      ? 'text-[#F59E0B]'
                      : 'text-[#E5E7EB]'
                  }`}
                  fill={star <= (hoverRating || rating) ? '#F59E0B' : '#E5E7EB'}
                />
              </button>
            ))}
          </div>

          <p className="text-center text-[#6B7280]">
            {rating === 0 && 'Tap to rate'}
            {rating === 1 && 'Poor • खराब'}
            {rating === 2 && 'Fair • ठीक'}
            {rating === 3 && 'Good • अच्छा'}
            {rating === 4 && 'Very Good • बहुत अच्छा'}
            {rating === 5 && 'Excellent • उत्कृष्ट'}
          </p>
        </div>

        {/* Category Ratings */}
        <div className="bg-white p-6 rounded-xl">
          <h3 className="mb-4">Detailed Ratings</h3>
          
          <div className="space-y-4">
            {reviewCategories.map((category) => (
              <div key={category.id}>
                <div className="flex justify-between mb-2">
                  <span className="font-medium">{category.label}</span>
                  <span className="text-[#9CA3AF]">{category.labelHindi}</span>
                </div>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      onClick={() => setCategoryRatings({ ...categoryRatings, [category.id]: star })}
                      className="transition-transform hover:scale-110 active:scale-95"
                    >
                      <Star
                        className={`w-6 h-6 ${
                          star <= (categoryRatings[category.id] || 0)
                            ? 'text-[#F59E0B]'
                            : 'text-[#E5E7EB]'
                        }`}
                        fill={star <= (categoryRatings[category.id] || 0) ? '#F59E0B' : '#E5E7EB'}
                      />
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Written Review */}
        <div className="bg-white p-6 rounded-xl">
          <h3 className="mb-2">Write a Review</h3>
          <p className="text-[#6B7280] mb-4">Share your experience (optional)</p>
          
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Tell others about your experience..."
            rows={5}
            className="w-full px-4 py-3 bg-[#F7F8FA] rounded-xl outline-none focus:ring-2 focus:ring-[#FF6B35] transition-all resize-none"
            maxLength={500}
          />
          <p className="text-[#9CA3AF] mt-2 text-right">
            {comment.length}/500
          </p>
        </div>

        {/* Quick Tags */}
        <div className="bg-white p-6 rounded-xl">
          <h3 className="mb-4">Quick Tags</h3>
          <div className="flex flex-wrap gap-2">
            {[
              'Professional', 'Punctual', 'Friendly', 'Skilled',
              'Clean Work', 'Fair Pricing', 'Polite', 'Efficient'
            ].map((tag) => (
              <button
                key={tag}
                className="px-4 py-2 bg-[#F7F8FA] rounded-full hover:bg-[#FFE8E0] hover:text-[#FF6B35] transition-all"
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Fixed Bottom CTA */}
      <div className="fixed bottom-0 left-0 right-0 bg-white p-4 shadow-lg border-t border-[#E5E7EB]">
        <button
          onClick={handleSubmit}
          disabled={loading}
          className="w-full bg-[#FF6B35] text-white py-4 rounded-xl hover:bg-[#E55A2A] active:scale-[0.98] transition-all shadow-md disabled:opacity-50 flex items-center justify-center gap-2"
        >
          {loading ? (
            <>
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              <span>Submitting...</span>
            </>
          ) : (
            <>
              <Check className="w-5 h-5" />
              <span>Submit Review • समीक्षा सबमिट करें</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}
