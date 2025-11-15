import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { 
  ArrowLeft, Phone, MessageCircle, Star, MapPin, 
  Verified, Clock, Shield, Award, ChevronRight,
  Calendar, IndianRupee
} from 'lucide-react';
import { toast } from 'sonner';

const mockProvider = {
  id: 1,
  name: 'Rajesh Kumar',
  service: 'Professional Plumber',
  serviceHindi: 'पेशेवर प्लम्बर',
  rating: 4.8,
  reviewsCount: 234,
  distance: 2.5,
  hourlyRate: 299,
  fixedRate: 499,
  image: 'RK',
  verified: true,
  available: true,
  experience: '8 years',
  completed: 456,
  phone: '+91 98765 43210',
  bio: 'Experienced plumber with expertise in pipe fitting, leak repairs, and bathroom installations. Available for emergency services.',
  bioHindi: '8 साल के अनुभव के साथ पाइप फिटिंग, लीक मरम्मत और बाथरूम स्थापना में विशेषज्ञता।',
  services: [
    { id: 1, name: 'Pipe Leak Repair', price: 299, duration: '1-2 hours' },
    { id: 2, name: 'Bathroom Installation', price: 2499, duration: '1 day' },
    { id: 3, name: 'Tap & Faucet Fix', price: 199, duration: '30 mins' },
    { id: 4, name: 'Drainage Cleaning', price: 499, duration: '1-2 hours' },
  ],
  gallery: ['Work 1', 'Work 2', 'Work 3', 'Work 4'],
  reviews: [
    {
      id: 1,
      name: 'Priya S.',
      rating: 5,
      comment: 'Excellent service! Very professional and punctual.',
      commentHindi: 'बहुत अच्छी सेवा! बहुत ही पेशेवर।',
      date: '2 days ago',
    },
    {
      id: 2,
      name: 'Arun M.',
      rating: 4,
      comment: 'Good work quality. Fixed the leak quickly.',
      commentHindi: 'अच्छी गुणवत्ता। लीक जल्दी ठीक कर दी।',
      date: '1 week ago',
    },
    {
      id: 3,
      name: 'Sneha K.',
      rating: 5,
      comment: 'Highly recommended! Will call again.',
      commentHindi: 'बहुत अच्छा! फिर से बुलाएंगे।',
      date: '2 weeks ago',
    },
  ],
};

export default function ProviderProfile() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [showAllReviews, setShowAllReviews] = useState(false);

  const handleCall = () => {
    toast.success('Opening dialer...', {
      description: 'डायलर खोल रहे हैं...',
    });
    window.open(`tel:${mockProvider.phone}`, '_self');
  };

  const handleMessage = () => {
    toast.success('Opening WhatsApp...', {
      description: 'व्हाट्सएप खोल रहे हैं...',
    });
  };

  const handleBookNow = () => {
    navigate(`/booking/${id}`);
  };

  const displayedReviews = showAllReviews 
    ? mockProvider.reviewsCount 
    : mockProvider.reviews.slice(0, 2);

  return (
    <div className="min-h-screen bg-[#F7F8FA] pb-24">
      {/* Header */}
      <div className="bg-white px-4 py-4 shadow-sm sticky top-0 z-10">
        <div className="flex items-center justify-between">
          <button
            onClick={() => navigate(-1)}
            className="p-2 hover:bg-[#F7F8FA] rounded-lg -ml-2"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h3>Provider Profile</h3>
          <div className="w-10" />
        </div>
      </div>

      {/* Profile Header */}
      <div className="bg-white p-6">
        <div className="flex items-start gap-4 mb-4">
          <div className="w-20 h-20 bg-gradient-to-br from-[#FF6B35] to-[#E55A2A] rounded-2xl flex items-center justify-center text-white relative">
            <span className="text-2xl">{mockProvider.image}</span>
            {mockProvider.available && (
              <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-[#16A34A] border-4 border-white rounded-full" />
            )}
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <h2>{mockProvider.name}</h2>
              {mockProvider.verified && (
                <Verified className="w-5 h-5 text-[#3B82F6]" fill="#3B82F6" />
              )}
            </div>
            <p className="text-[#6B7280] mb-1">{mockProvider.service}</p>
            <p className="text-[#FF6B35]">{mockProvider.serviceHindi}</p>
            <div className="flex items-center gap-4 mt-3">
              <div className="flex items-center gap-1">
                <Star className="w-5 h-5 text-[#F59E0B]" fill="#F59E0B" />
                <span className="font-medium">{mockProvider.rating}</span>
                <span className="text-[#9CA3AF]">({mockProvider.reviews[0]?.name})</span>
              </div>
              <div className="flex items-center gap-1 text-[#6B7280]">
                <MapPin className="w-4 h-4" />
                <span>{mockProvider.distance} km</span>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="flex gap-3">
          <button
            onClick={handleCall}
            className="flex-1 flex items-center justify-center gap-2 py-3 bg-[#16A34A] text-white rounded-xl hover:bg-[#15803D] active:scale-[0.98] transition-all"
          >
            <Phone className="w-5 h-5" />
            <span>Call</span>
          </button>
          <button
            onClick={handleMessage}
            className="flex-1 flex items-center justify-center gap-2 py-3 bg-[#F7F8FA] rounded-xl hover:bg-[#E5E7EB] active:scale-[0.98] transition-all"
          >
            <MessageCircle className="w-5 h-5" />
            <span>Message</span>
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="bg-white mt-2 p-6 grid grid-cols-3 gap-4">
        <div className="text-center">
          <div className="w-12 h-12 mx-auto bg-[#FFE8E0] rounded-xl flex items-center justify-center mb-2">
            <Clock className="w-6 h-6 text-[#FF6B35]" />
          </div>
          <p className="font-medium">{mockProvider.experience}</p>
          <p className="text-[#9CA3AF]">Experience</p>
        </div>
        <div className="text-center">
          <div className="w-12 h-12 mx-auto bg-[#DCFCE7] rounded-xl flex items-center justify-center mb-2">
            <Award className="w-6 h-6 text-[#16A34A]" />
          </div>
          <p className="font-medium">{mockProvider.completed}</p>
          <p className="text-[#9CA3AF]">Jobs Done</p>
        </div>
        <div className="text-center">
          <div className="w-12 h-12 mx-auto bg-[#DBEAFE] rounded-xl flex items-center justify-center mb-2">
            <Shield className="w-6 h-6 text-[#3B82F6]" />
          </div>
          <p className="font-medium">Verified</p>
          <p className="text-[#9CA3AF]">सत्यापित</p>
        </div>
      </div>

      {/* About */}
      <div className="bg-white mt-2 p-6">
        <h3 className="mb-3">About</h3>
        <p className="text-[#6B7280] mb-2">{mockProvider.bio}</p>
        <p className="text-[#9CA3AF]">{mockProvider.bioHindi}</p>
      </div>

      {/* Services & Pricing */}
      <div className="bg-white mt-2 p-6">
        <h3 className="mb-4">Services & Pricing</h3>
        <div className="space-y-3">
          {mockProvider.services.map((service) => (
            <div
              key={service.id}
              className="p-4 bg-[#F7F8FA] rounded-xl flex items-center justify-between"
            >
              <div>
                <h4 className="mb-1">{service.name}</h4>
                <p className="text-[#9CA3AF]">{service.duration}</p>
              </div>
              <div className="text-right">
                <p className="font-medium text-[#FF6B35]">₹{service.price}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Work Gallery */}
      <div className="bg-white mt-2 p-6">
        <h3 className="mb-4">Work Gallery</h3>
        <div className="grid grid-cols-4 gap-2">
          {mockProvider.gallery.map((item, index) => (
            <div
              key={index}
              className="aspect-square bg-gradient-to-br from-[#FF6B35] to-[#E55A2A] rounded-xl flex items-center justify-center text-white"
            >
              {item}
            </div>
          ))}
        </div>
      </div>

      {/* Reviews */}
      <div className="bg-white mt-2 p-6">
        <div className="flex items-center justify-between mb-4">
          <h3>Reviews ({mockProvider.reviews.length})</h3>
          <div className="flex items-center gap-1">
            <Star className="w-5 h-5 text-[#F59E0B]" fill="#F59E0B" />
            <span className="font-medium">{mockProvider.rating}</span>
          </div>
        </div>

        <div className="space-y-4">
          {mockProvider?.reviews?.map((review) => (
            <div key={review.id} className="pb-4 border-b border-[#E5E7EB] last:border-0">
              <div className="flex items-center justify-between mb-2">
                <h4>{review.name}</h4>
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 text-[#F59E0B]" fill="#F59E0B" />
                  <span>{review.rating}</span>
                </div>
              </div>
              <p className="text-[#6B7280] mb-1">{review.comment}</p>
              <p className="text-[#9CA3AF]">{review.commentHindi}</p>
              <p className="text-[#9CA3AF] mt-2">{review.date}</p>
            </div>
          ))}
        </div>

        {!showAllReviews && mockProvider.reviews.length > 2 && (
          <button
            onClick={() => setShowAllReviews(true)}
            className="w-full mt-4 py-3 text-[#FF6B35] hover:bg-[#FFE8E0] rounded-xl transition-all flex items-center justify-center gap-1"
          >
            View All Reviews
            <ChevronRight className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Bottom spacing */}
      <div className="h-4" />

      {/* Fixed Bottom CTA */}
      <div className="fixed bottom-0 left-0 right-0 bg-white p-4 shadow-lg border-t border-[#E5E7EB]">
        <div className="flex items-center gap-3">
          <div>
            <p className="text-[#9CA3AF]">Starting from</p>
            <p className="font-medium text-[#FF6B35]">₹{mockProvider.hourlyRate}/hour</p>
          </div>
          <button
            onClick={handleBookNow}
            className="flex-1 bg-[#FF6B35] text-white py-4 rounded-xl hover:bg-[#E55A2A] active:scale-[0.98] transition-all shadow-md flex items-center justify-center gap-2"
          >
            <Calendar className="w-5 h-5" />
            <span>Book Now • बुक करें</span>
          </button>
        </div>
      </div>
    </div>
  );
}
