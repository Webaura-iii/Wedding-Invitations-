/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState } from 'react';
import { CurtainBackground } from './components/CurtainBackground';
import { PetalCanvas } from './components/PetalCanvas';
import { EnvelopeOpening } from './components/EnvelopeOpening';
import { InvitationCard } from './components/InvitationCard';
import { WeddingDetails } from './components/WeddingDetails';
import { WeddingCountdown } from './components/WeddingCountdown';
import { WeddingCalendar } from './components/WeddingCalendar';
import { ClosingSection } from './components/ClosingSection';
import { LanguageSwitcher } from './components/LanguageSwitcher';
import { AudioAmbient } from './components/AudioAmbient';
import { CustomizeModal } from './components/CustomizeModal';
import { initialWeddingConfig } from './config/weddingConfig';
import { Language, WeddingConfig } from './types/wedding';

export default function App() {
  const [config, setConfig] = useState<WeddingConfig>(() => {
    try {
      const saved = localStorage.getItem('wedding_config_custom');
      return saved ? JSON.parse(saved) : initialWeddingConfig;
    } catch {
      return initialWeddingConfig;
    }
  });

  const [currentLanguage, setCurrentLanguage] = useState<Language>(() => {
    try {
      const savedLang = localStorage.getItem('wedding_lang') as Language;
      if (savedLang === 'en' || savedLang === 'ur' || savedLang === 'ar') {
        return savedLang;
      }
    } catch {
      // default
    }
    return 'en';
  });

  const [isOpened, setIsOpened] = useState<boolean>(false);

  // Sync html dir and lang attributes
  useEffect(() => {
    const isRTL = currentLanguage === 'ur' || currentLanguage === 'ar';
    document.documentElement.lang = currentLanguage;
    document.documentElement.dir = isRTL ? 'rtl' : 'ltr';
    try {
      localStorage.setItem('wedding_lang', currentLanguage);
    } catch {
      // Ignore storage errors
    }
  }, [currentLanguage]);

  const handleUpdateConfig = (newConfig: WeddingConfig) => {
    setConfig(newConfig);
    try {
      localStorage.setItem('wedding_config_custom', JSON.stringify(newConfig));
    } catch {
      // Ignore storage errors
    }
  };

  const handleOpenComplete = () => {
    setIsOpened(true);
    // Smoothly scroll to the main card
    setTimeout(() => {
      const cardEl = document.getElementById('invitation-card');
      if (cardEl) {
        cardEl.scrollIntoView({ behavior: 'smooth' });
      }
    }, 150);
  };

  const handleReseal = () => {
    setIsOpened(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const coupleTitle =
    config.nameOrder === 'groom_first'
      ? `${config.groom.name[currentLanguage]} & ${config.bride.name[currentLanguage]}`
      : `${config.bride.name[currentLanguage]} & ${config.groom.name[currentLanguage]}`;

  return (
    <div className="min-h-screen bg-[#FAF8F4] text-[#35332F] relative selection:bg-[#C9AE7A]/30">
      {/* Drifting Rose Petals */}
      <PetalCanvas active={true} />

      {/* Main Curtain and Floral Backdrop */}
      <CurtainBackground>
        {!isOpened ? (
          /* Opening Scene: The Sealed Invitation Envelope */
          <EnvelopeOpening
            config={config}
            currentLanguage={currentLanguage}
            onLanguageChange={setCurrentLanguage}
            onOpenComplete={handleOpenComplete}
            soundControl={<AudioAmbient currentLanguage={currentLanguage} />}
          />
        ) : (
          /* Opened Main Wedding Experience */
          <div className="relative min-h-screen flex flex-col items-center">
            
            {/* Clean floating language selection (no nav bar) */}
            <div className="fixed top-3 end-3 sm:top-4 sm:end-4 z-40 flex items-center gap-1.5 sm:gap-2 pointer-events-auto">
              <LanguageSwitcher
                currentLanguage={currentLanguage}
                onLanguageChange={setCurrentLanguage}
              />
              <AudioAmbient currentLanguage={currentLanguage} />
            </div>

            {/* Scrollable Content Stack */}
            <main className="w-full flex flex-col items-center pt-6 pb-12">
              
              {/* Main Stationery Card */}
              <div id="invitation-card" className="w-full pt-4">
                <InvitationCard
                  config={config}
                  currentLanguage={currentLanguage}
                />
              </div>

              {/* Save the Date Month Calendar with Heart Mark */}
              <WeddingCalendar
                targetDateISO={config.eventDateTimeISO}
                currentLanguage={currentLanguage}
              />

              {/* Countdown Timer */}
              <WeddingCountdown
                targetDateISO={config.eventDateTimeISO}
                currentLanguage={currentLanguage}
              />

              {/* Ceremony & Reception Details */}
              <div id="wedding-details" className="w-full">
                <WeddingDetails
                  config={config}
                  currentLanguage={currentLanguage}
                />
              </div>

              {/* Closing Section with Sunnah Barakah Dua */}
              <ClosingSection
                config={config}
                currentLanguage={currentLanguage}
                onReseal={handleReseal}
              />
            </main>
          </div>
        )}
      </CurtainBackground>

      {/* Floating Customizer Modal for testing details */}
      <CustomizeModal
        config={config}
        onUpdateConfig={handleUpdateConfig}
        currentLanguage={currentLanguage}
      />
    </div>
  );
}
