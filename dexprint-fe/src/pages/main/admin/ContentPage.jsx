import { BannerManagement } from "../../../components/admin/content/BannerManagement";
import { ClientSection } from "../../../components/admin/content/ClientSection";
import { HeroSection } from "../../../components/admin/content/HeroSection";
import { ReviewSection } from "../../../components/admin/content/ReviewSection";

export function ContentPage() {
  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-100 py-10 px-4 sm:px-8">
        <div className="max-w-full mx-auto space-y-12">
          {/* Header */}
          <header className="text-center sm:text-left pb-4 border-b border-gray-200">
            <h1 className="text-3xl font-bold text-gray-800 mb-1">
              Landing Page Content Manager
            </h1>
            <p className="text-gray-500 text-sm">
              Manage banner, client brands, and customer reviews
            </p>
          </header>

          <HeroSection />
          <BannerManagement />
          <ReviewSection />
          <ClientSection />
        </div>
      </div>
    </>
  );
}
