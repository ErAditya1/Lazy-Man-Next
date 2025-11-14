// pages/provider/[id]/book.tsx
'use client'
import { BookingFlowScreen } from "@/components/screens/BookingFlowScreen";
import { mockProviders } from "@/lib/mockData";
import { useParams, useRouter } from "next/navigation";


export default function BookPage() {
  const router = useRouter();
  const params = useParams()
  const {id} = params;
  const provider = mockProviders.find(p => p.id === id);

  if (!provider) return <div className="p-8">Provider not found</div>;

  return (
    
      <BookingFlowScreen
        provider={provider}
        lang="en"
        onBack={() => router.push(`/provider/${id}`)}
        onComplete={(data) => {
          console.log('booking done', data);
          router.push('/bookings');
        }}
      />
  
  );
}
