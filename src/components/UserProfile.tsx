import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, User, MapPin, Phone, Mail, Calendar,
  ChevronRight, Star, Clock, Settings, LogOut,
  CreditCard, HelpCircle, Shield
} from 'lucide-react';

interface UserProfileProps {
  onLogout: () => void;
}

const bookingHistory = [
  {
    id: 1,
    provider: 'Rajesh Kumar',
    service: 'Pipe Leak Repair',
    date: '15 Nov 2025',
    amount: 299,
    status: 'completed',
    rating: 5,
  },
  {
    id: 2,
    provider: 'Amit Sharma',
    service: 'Electrical Repair',
    date: '10 Nov 2025',
    amount: 349,
    status: 'completed',
    rating: 4,
  },
  {
    id: 3,
    provider: 'Sunita Devi',
    service: 'House Cleaning',
    date: '5 Nov 2025',
    amount: 199,
    status: 'completed',
    rating: 5,
  },
];

export default function UserProfile({ onLogout }: UserProfileProps) {
  const navigate = useNavigate();
  const [showBookings, setShowBookings] = useState(true);

  const handleLogout = () => {
    if (confirm('Are you sure you want to logout?')) {
      onLogout();
      navigate('/auth');
    }
  };

  return (
    <div className="min-h-screen bg-[#F7F8FA] pb-6">
      {/* Header */}
      <div className="bg-white px-4 py-4 shadow-sm">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate('/home')}
            className="p-2 hover:bg-[#F7F8FA] rounded-lg -ml-2"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h3>My Profile</h3>
        </div>
      </div>

      {/* Profile Info */}
      <div className="bg-white mt-2 p-6">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-20 h-20 bg-gradient-to-br from-[#FF6B35] to-[#E55A2A] rounded-2xl flex items-center justify-center text-white">
            <span className="text-2xl">SK</span>
          </div>
          <div className="flex-1">
            <h2>Sanjay Kumar</h2>
            <p className="text-[#6B7280]">Customer since Nov 2024</p>
            <div className="flex items-center gap-1 mt-1">
              <Star className="w-4 h-4 text-[#F59E0B]" fill="#F59E0B" />
              <span className="font-medium">4.9</span>
              <span className="text-[#9CA3AF]">Customer Rating</span>
            </div>
          </div>
        </div>

        {/* Contact Info */}
        <div className="space-y-3">
          <div className="flex items-center gap-3 text-[#6B7280]">
            <Phone className="w-5 h-5" />
            <span>+91 98765 43210</span>
          </div>
          <div className="flex items-center gap-3 text-[#6B7280]">
            <Mail className="w-5 h-5" />
            <span>sanjay@example.com</span>
          </div>
          <div className="flex items-center gap-3 text-[#6B7280]">
            <MapPin className="w-5 h-5" />
            <span>Koramangala, Bangalore</span>
          </div>
        </div>

        <button className="w-full mt-6 py-3 bg-[#F7F8FA] rounded-xl hover:bg-[#E5E7EB] transition-all">
          Edit Profile
        </button>
      </div>

      {/* Stats */}
      <div className="bg-white mt-2 p-6">
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center">
            <p className="text-2xl font-medium text-[#FF6B35]">{bookingHistory.length}</p>
            <p className="text-[#6B7280]">Bookings</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-medium text-[#16A34A]">{bookingHistory.length}</p>
            <p className="text-[#6B7280]">Completed</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-medium text-[#3B82F6]">₹{bookingHistory.reduce((sum, b) => sum + b.amount, 0)}</p>
            <p className="text-[#6B7280]">Total Spent</p>
          </div>
        </div>
      </div>

      {/* Menu Options */}
      <div className="bg-white mt-2 p-6 space-y-1">
        <button className="w-full flex items-center justify-between p-3 hover:bg-[#F7F8FA] rounded-xl transition-all">
          <div className="flex items-center gap-3">
            <Settings className="w-5 h-5 text-[#6B7280]" />
            <span>Settings</span>
          </div>
          <ChevronRight className="w-5 h-5 text-[#9CA3AF]" />
        </button>

        <button className="w-full flex items-center justify-between p-3 hover:bg-[#F7F8FA] rounded-xl transition-all">
          <div className="flex items-center gap-3">
            <CreditCard className="w-5 h-5 text-[#6B7280]" />
            <span>Payment Methods</span>
          </div>
          <ChevronRight className="w-5 h-5 text-[#9CA3AF]" />
        </button>

        <button className="w-full flex items-center justify-between p-3 hover:bg-[#F7F8FA] rounded-xl transition-all">
          <div className="flex items-center gap-3">
            <Shield className="w-5 h-5 text-[#6B7280]" />
            <span>Privacy & Security</span>
          </div>
          <ChevronRight className="w-5 h-5 text-[#9CA3AF]" />
        </button>

        <button className="w-full flex items-center justify-between p-3 hover:bg-[#F7F8FA] rounded-xl transition-all">
          <div className="flex items-center gap-3">
            <HelpCircle className="w-5 h-5 text-[#6B7280]" />
            <span>Help & Support</span>
          </div>
          <ChevronRight className="w-5 h-5 text-[#9CA3AF]" />
        </button>
      </div>

      {/* Booking History */}
      <div className="bg-white mt-2 p-6">
        <div className="flex items-center justify-between mb-4">
          <h3>Booking History</h3>
          <button
            onClick={() => setShowBookings(!showBookings)}
            className="text-[#FF6B35]"
          >
            {showBookings ? 'Hide' : 'Show'}
          </button>
        </div>

        {showBookings && (
          <div className="space-y-3">
            {bookingHistory.map((booking) => (
              <button
                key={booking.id}
                onClick={() => navigate(`/booking-status/${booking.id}`)}
                className="w-full p-4 bg-[#F7F8FA] rounded-xl hover:bg-[#E5E7EB] transition-all text-left"
              >
                <div className="flex items-center justify-between mb-2">
                  <h4>{booking.provider}</h4>
                  <span className="px-3 py-1 bg-[#DCFCE7] text-[#16A34A] rounded-full">
                    {booking.status}
                  </span>
                </div>
                <p className="text-[#6B7280] mb-2">{booking.service}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 text-[#9CA3AF]">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      <span>{booking.date}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-[#F59E0B]" fill="#F59E0B" />
                      <span>{booking.rating}</span>
                    </div>
                  </div>
                  <span className="font-medium text-[#FF6B35]">₹{booking.amount}</span>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Logout */}
      <div className="p-4">
        <button
          onClick={handleLogout}
          className="w-full flex items-center justify-center gap-2 py-4 bg-white text-[#DC2626] rounded-xl hover:bg-[#FEE2E2] transition-all"
        >
          <LogOut className="w-5 h-5" />
          <span>Logout • लॉग आउट करें</span>
        </button>
      </div>
    </div>
  );
}
