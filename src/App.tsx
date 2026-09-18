import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { FeaturesSection } from './components/FeaturesSection';
import { ThemeCatalog } from './components/ThemeCatalog';
import { SocialProofSection } from './components/SocialProofSection';
import { PricingSection } from './components/PricingSection';
import { FAQSection } from './components/FAQSection';
import { Footer } from './components/Footer';
import { StickyBottomCTA } from './components/StickyBottomCTA';
import { LiveAssistantDrawer } from './components/LiveAssistantDrawer';
import { CreateInvitationModal } from './components/CreateInvitationModal';
import { FullScreenDemoModal } from './components/FullScreenDemoModal';
import { THEMES_DATA } from './data/weddingContent';
import { ThemeItem, InvitationData } from './types';

export default function App() {
  // Active Theme State (default: Modern Editorial)
  const [currentTheme, setCurrentTheme] = useState<ThemeItem>(THEMES_DATA[0]);

  // Invitation Data state for live synchronization with phone mockup
  const [invitationData, setInvitationData] = useState<InvitationData>({
    groomName: 'Arya',
    brideName: 'Clarissa',
    groomFull: 'Arya Pratama, S.Kom.',
    brideFull: 'Clarissa Azzahra, B.Des.',
    weddingDate: 'Sabtu, 24 Oktober 2026',
    venueName: 'The Glass House Ballroom',
    venueAddress: 'Jl. Senopati No. 88, Kebayoran Baru, Jakarta Selatan',
    receptionTime: '18.30 - 21.30',
    akadTime: '08.00 - 10.00',
    themeId: 'modern-editorial',
    guestName: 'Raditya Pratama & Partner',
    isOpened: false,
    activeTab: 'home',
  });

  // Modal / Drawer States
  const [isAssistantOpen, setIsAssistantOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [selectedPackageForModal, setSelectedPackageForModal] = useState<string | undefined>(undefined);
  const [fullDemoTheme, setFullDemoTheme] = useState<ThemeItem | null>(null);

  // Handlers
  const handleUpdateGuestName = (newName: string) => {
    setInvitationData((prev) => ({
      ...prev,
      guestName: newName,
    }));
  };

  const handleSelectTheme = (theme: ThemeItem) => {
    setCurrentTheme(theme);
    setInvitationData((prev) => ({
      ...prev,
      themeId: theme.id,
    }));
  };

  const handleSelectThemeById = (themeId: string) => {
    const found = THEMES_DATA.find((t) => t.id === themeId);
    if (found) {
      handleSelectTheme(found);
    }
  };

  const handleOpenCreateModal = (packageName?: string) => {
    setSelectedPackageForModal(packageName);
    setIsCreateModalOpen(true);
  };

  const handleSaveInvitation = (updated: Partial<InvitationData>) => {
    setInvitationData((prev) => ({
      ...prev,
      ...updated,
    }));
    if (updated.themeId) {
      const themeObj = THEMES_DATA.find((t) => t.id === updated.themeId);
      if (themeObj) setCurrentTheme(themeObj);
    }
  };

  return (
    <div className="min-h-screen bg-stone-50 text-stone-900 font-sans selection:bg-amber-200 selection:text-amber-950 flex flex-col justify-between">
      
      {/* 1. Brand Navbar */}
      <Navbar
        onOpenCreateModal={() => handleOpenCreateModal()}
        onOpenAssistant={() => setIsAssistantOpen(true)}
      />

      {/* Main Sections */}
      <main className="flex-1">
        
        {/* 1. Hero Section with Interactive Mockup */}
        <HeroSection
          currentTheme={currentTheme}
          invitationData={invitationData}
          onUpdateGuestName={handleUpdateGuestName}
          onOpenCreateModal={() => handleOpenCreateModal()}
          onOpenFullDemo={() => setFullDemoTheme(currentTheme)}
        />

        {/* 2. The "Powerful" Features (Smart Guest, RSVP, Cashless Gift, Live Preview) */}
        <FeaturesSection
          onSelectThemeById={handleSelectThemeById}
          onOpenCreateModal={() => handleOpenCreateModal()}
        />

        {/* 3. Katalog Tema (Aesthetic Grid) */}
        <ThemeCatalog
          currentTheme={currentTheme}
          onSelectTheme={handleSelectTheme}
          onOpenFullDemo={(theme) => setFullDemoTheme(theme)}
          onOpenCreateModal={(theme) => handleOpenCreateModal(theme?.name)}
        />

        {/* 4. Social Proof & Success Metrics */}
        <SocialProofSection />

        {/* 5. Pricing & Package (Transparan: Basic, Pro, VIP) */}
        <PricingSection
          onOpenCreateModal={(pkgName) => handleOpenCreateModal(pkgName)}
        />

        {/* 6. Interactive FAQ */}
        <FAQSection
          onOpenAssistant={() => setIsAssistantOpen(true)}
        />

      </main>

      {/* Brand Footer */}
      <Footer
        onOpenAssistant={() => setIsAssistantOpen(true)}
        onOpenCreateModal={() => handleOpenCreateModal()}
      />

      {/* 6. Sticky Bottom CTA & Floating WhatsApp & AI Assistant */}
      <StickyBottomCTA
        onOpenCreateModal={() => handleOpenCreateModal()}
        onOpenAssistant={() => setIsAssistantOpen(true)}
      />

      {/* Live AI Assistant Drawer (VowBot AI) */}
      <LiveAssistantDrawer
        isOpen={isAssistantOpen}
        onClose={() => setIsAssistantOpen(false)}
        onSelectThemeById={handleSelectThemeById}
        onOpenCreateModal={() => {
          setIsAssistantOpen(false);
          handleOpenCreateModal();
        }}
      />

      {/* 3-Step Instant Creation Wizard Modal */}
      <CreateInvitationModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        invitationData={invitationData}
        onSaveInvitation={handleSaveInvitation}
        initialPackage={selectedPackageForModal}
      />

      {/* Full Screen Theme Demo Modal */}
      <FullScreenDemoModal
        theme={fullDemoTheme}
        onClose={() => setFullDemoTheme(null)}
        invitationData={invitationData}
        onOpenCreateModal={() => {
          setFullDemoTheme(null);
          handleOpenCreateModal();
        }}
      />

    </div>
  );
}
