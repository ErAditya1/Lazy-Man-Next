import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Menu, Bell, TrendingUp, Clock, CheckCircle, XCircle,
  IndianRupee, Star, MapPin, Phone, User, Settings,
  Calendar, Award, LogOut
} from 'lucide-react';

interface ProviderDashboardProps {
  onLogout: () => void;
}

const pendingRequests = [
  {
    id: 1,
    customer: 'Sanjay Kumar',
    service: 'Pipe Leak Repair',
    address: 'Koramangala, Bangalore',
    distance: 2.5,
    time: '5 mins ago',
    amount: 299,
    scheduled: 'ASAP',
  },
  {
    id: 2,
    customer: 'Priya Sharma',
    service: 'Tap Replacement',
    address: 'HSR Layout, Bangalore',
    distance: 3.2,
    time: '12 mins ago',
    amount: 199,
    scheduled: 'Today, 3:00 PM',
  },
];

const upcomingJobs = [
  {
    id: 3,
    customer: 'Arun Mehta',
    service: 'Bathroom Installation',
    address: 'Indiranagar, Bangalore',
    time: 'Today, 4:00 PM',
    amount: 2499,
  },
];

const stats = [
  { label: 'Today\'s Earnings', value: '₹1,247', icon: IndianRupee, color: '#16A34A' },
  { label: 'Jobs Completed', value: '456', icon: CheckCircle, color: '#3B82F6' },
  { label: 'Rating', value: '4.8', icon: Star, color: '#F59E0B' },
  { label: 'Active Hours', value: '8.5h', icon: Clock, color: '#FF6B35' },
];

export default function ProviderDashboard({ onLogout }: ProviderDashboardProps) {
  const navigate = useNavigate();
  const [isAvailable, setIsAvailable] = useState(true);
  const [showMenu, setShowMenu] = useState(false);

  const handleAccept = (id: number) => {
    alert(`Accepted request #${id}`);
  };

  const handleDecline = (id: number) => {
    alert(`Declined request #${id}`);
  };

  const handleLogout = () => {
    if (confirm('Are you sure you want to logout?')) {
      onLogout();
      navigate('/auth');
    }
  };

  return (
    <div className="min-h-screen bg-[#F7F8FA] pb-6">
      {/* Header */}
      <div className="bg-gradient-to-br from-[#FF6B35] to-[#E55A2A] px-4 pt-6 pb-20 text-white">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-white/20 rounded-xl backdrop-blur-sm flex items-center justify-center">
              <span>RK</span>
            </div>
            <div>
              <h3 className="text-white">Rajesh Kumar</h3>
              <p className="text-white/80">Professional Plumber</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button className="p-2 hover:bg-white/10 rounded-lg relative">
              <Bell className="w-6 h-6" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#DC2626] rounded-full" />
            </button>
            <button 
              onClick={() => setShowMenu(!showMenu)}
              className="p-2 hover:bg-white/10 rounded-lg"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Availability Toggle */}
        <div className="bg-white/10 backdrop-blur-sm p-4 rounded-xl">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium mb-1">Availability Status</p>
              <p className="text-white/80">
                {isAvailable ? 'Available for new requests' : 'Not accepting requests'}
              </p>
            </div>
            <button
              onClick={() => setIsAvailable(!isAvailable)}
              className={`w-14 h-8 rounded-full transition-all ${
                isAvailable ? 'bg-[#16A34A]' : 'bg-white/30'
              }`}
            >
              <div
                className={`w-6 h-6 bg-white rounded-full shadow-sm transition-all ${
                  isAvailable ? 'translate-x-7' : 'translate-x-1'
                }`}
              />
            </button>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="px-4 -mt-12 mb-6">
        <div className="grid grid-cols-2 gap-3">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div key={index} className="bg-white p-4 rounded-xl shadow-sm">
                <div 
                  className="w-10 h-10 rounded-lg flex items-center justify-center mb-3"
                  style={{ backgroundColor: `${stat.color}15` }}
                >
                  <Icon className="w-5 h-5" style={{ color: stat.color }} />
                </div>
                <p className="text-2xl font-medium mb-1">{stat.value}</p>
                <p className="text-[#6B7280]">{stat.label}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Pending Requests */}
      <div className="px-4 mb-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3>New Requests</h3>
            <p className="text-[#6B7280]">नए अनुरोध</p>
          </div>
          <span className="px-3 py-1 bg-[#FF6B35] text-white rounded-full">
            {pendingRequests.length}
          </span>
        </div>

        <div className="space-y-3">
          {pendingRequests.map((request) => (
            <div key={request.id} className="bg-white p-4 rounded-xl shadow-sm">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h4 className="mb-1">{request.customer}</h4>
                  <p className="text-[#6B7280]">{request.service}</p>
                </div>
                <span className="px-3 py-1 bg-[#FFE8E0] text-[#FF6B35] rounded-full">
                  {request.time}
                </span>
              </div>

              <div className="space-y-2 mb-4">
                <div className="flex items-center gap-2 text-[#6B7280]">
                  <MapPin className="w-4 h-4" />
                  <span>{request.address}</span>
                  <span className="text-[#9CA3AF]">• {request.distance} km</span>
                </div>
                <div className="flex items-center gap-2 text-[#6B7280]">
                  <Clock className="w-4 h-4" />
                  <span>{request.scheduled}</span>
                </div>
                <div className="flex items-center gap-2">
                  <IndianRupee className="w-4 h-4 text-[#16A34A]" />
                  <span className="font-medium text-[#16A34A]">₹{request.amount}</span>
                </div>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => handleDecline(request.id)}
                  className="flex-1 flex items-center justify-center gap-2 py-3 bg-[#F7F8FA] rounded-xl hover:bg-[#FEE2E2] hover:text-[#DC2626] transition-all"
                >
                  <XCircle className="w-5 h-5" />
                  <span>Decline</span>
                </button>
                <button
                  onClick={() => handleAccept(request.id)}
                  className="flex-1 flex items-center justify-center gap-2 py-3 bg-[#16A34A] text-white rounded-xl hover:bg-[#15803D] transition-all"
                >
                  <CheckCircle className="w-5 h-5" />
                  <span>Accept</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Upcoming Jobs */}
      <div className="px-4 mb-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3>Upcoming Jobs</h3>
            <p className="text-[#6B7280]">आगामी काम</p>
          </div>
        </div>

        <div className="space-y-3">
          {upcomingJobs.map((job) => (
            <div key={job.id} className="bg-white p-4 rounded-xl shadow-sm">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h4 className="mb-1">{job.customer}</h4>
                  <p className="text-[#6B7280]">{job.service}</p>
                </div>
                <span className="px-3 py-1 bg-[#DBEAFE] text-[#3B82F6] rounded-full">
                  Confirmed
                </span>
              </div>

              <div className="space-y-2 mb-4">
                <div className="flex items-center gap-2 text-[#6B7280]">
                  <MapPin className="w-4 h-4" />
                  <span>{job.address}</span>
                </div>
                <div className="flex items-center gap-2 text-[#6B7280]">
                  <Calendar className="w-4 h-4" />
                  <span>{job.time}</span>
                </div>
                <div className="flex items-center gap-2">
                  <IndianRupee className="w-4 h-4 text-[#16A34A]" />
                  <span className="font-medium text-[#16A34A]">₹{job.amount}</span>
                </div>
              </div>

              <div className="flex gap-2">
                <button className="flex-1 flex items-center justify-center gap-2 py-3 bg-[#F7F8FA] rounded-xl hover:bg-[#E5E7EB] transition-all">
                  <MapPin className="w-5 h-5" />
                  <span>Navigate</span>
                </button>
                <button className="flex-1 flex items-center justify-center gap-2 py-3 bg-[#16A34A] text-white rounded-xl hover:bg-[#15803D] transition-all">
                  <Phone className="w-5 h-5" />
                  <span>Call Customer</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="px-4">
        <h3 className="mb-4">Quick Actions</h3>
        <div className="bg-white rounded-xl overflow-hidden shadow-sm divide-y divide-[#E5E7EB]">
          <button className="w-full flex items-center justify-between p-4 hover:bg-[#F7F8FA] transition-all">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[#FFE8E0] rounded-lg flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-[#FF6B35]" />
              </div>
              <span>View Earnings</span>
            </div>
            <span className="text-[#6B7280]">₹12,450</span>
          </button>

          <button className="w-full flex items-center justify-between p-4 hover:bg-[#F7F8FA] transition-all">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[#DCFCE7] rounded-lg flex items-center justify-center">
                <Award className="w-5 h-5 text-[#16A34A]" />
              </div>
              <span>My Reviews</span>
            </div>
            <span className="flex items-center gap-1 text-[#F59E0B]">
              <Star className="w-4 h-4" fill="#F59E0B" />
              4.8
            </span>
          </button>

          <button className="w-full flex items-center justify-between p-4 hover:bg-[#F7F8FA] transition-all">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[#DBEAFE] rounded-lg flex items-center justify-center">
                <Settings className="w-5 h-5 text-[#3B82F6]" />
              </div>
              <span>Profile Settings</span>
            </div>
          </button>

          <button 
            onClick={handleLogout}
            className="w-full flex items-center justify-between p-4 hover:bg-[#FEE2E2] transition-all"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[#FEE2E2] rounded-lg flex items-center justify-center">
                <LogOut className="w-5 h-5 text-[#DC2626]" />
              </div>
              <span className="text-[#DC2626]">Logout</span>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}
