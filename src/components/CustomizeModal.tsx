import React, { useState } from 'react';
import { Edit3, RotateCcw, X } from 'lucide-react';
import { Language, NameOrder, WeddingConfig } from '../types/wedding';
import { initialWeddingConfig } from '../config/weddingConfig';
import { translations } from '../translations/translations';

interface CustomizeModalProps {
  config: WeddingConfig;
  onUpdateConfig: (newConfig: WeddingConfig) => void;
  currentLanguage: Language;
}

export const CustomizeModal: React.FC<CustomizeModalProps> = ({
  config,
  onUpdateConfig,
  currentLanguage,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [groomEn, setGroomEn] = useState(config.groom.name.en);
  const [brideEn, setBrideEn] = useState(config.bride.name.en);
  const [initials, setInitials] = useState(config.initials);
  const [nameOrder, setNameOrder] = useState<NameOrder>(config.nameOrder);
  const [nikahVenue, setNikahVenue] = useState(config.nikah.venueName.en);

  const t = translations[currentLanguage];

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const updated: WeddingConfig = {
      ...config,
      groom: {
        ...config.groom,
        name: {
          ...config.groom.name,
          en: groomEn,
        },
      },
      bride: {
        ...config.bride,
        name: {
          ...config.bride.name,
          en: brideEn,
        },
      },
      initials,
      nameOrder,
      nikah: {
        ...config.nikah,
        venueName: {
          ...config.nikah.venueName,
          en: nikahVenue,
        },
      },
    };
    onUpdateConfig(updated);
    setIsOpen(false);
  };

  const handleReset = () => {
    onUpdateConfig(initialWeddingConfig);
    setGroomEn(initialWeddingConfig.groom.name.en);
    setBrideEn(initialWeddingConfig.bride.name.en);
    setInitials(initialWeddingConfig.initials);
    setNameOrder(initialWeddingConfig.nameOrder);
    setNikahVenue(initialWeddingConfig.nikah.venueName.en);
    setIsOpen(false);
  };

  return (
    <>
      {/* Floating Customize / Edit Trigger */}
      <aside aria-label="Invitation Customizer" className="fixed bottom-4 right-4 z-40">
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className="inline-flex items-center gap-2 px-3.5 py-2 bg-white/90 backdrop-blur-md border border-[#C9AE7A]/60 rounded-full shadow-lg text-xs font-medium text-[#35332F] hover:bg-[#FAF8F4] transition-all cursor-pointer"
        >
          <Edit3 className="w-3.5 h-3.5 text-[#C9AE7A]" />
          <span>{t.customizeNotice}</span>
        </button>
      </aside>

      {/* Modal Dialog */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs overflow-y-auto"
          role="dialog"
          aria-modal="true"
          aria-labelledby="customize-title"
        >
          <div className="bg-[#FAF8F4] border border-[#E8DFD2] rounded-xl shadow-2xl max-w-lg w-full p-6 relative max-h-[90vh] overflow-y-auto">
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 text-[#7D766A] hover:text-[#35332F] p-1 rounded-md"
              aria-label={t.close}
            >
              <X className="w-5 h-5" />
            </button>

            <div className="border-b border-[#E8DFD2] pb-3 mb-4">
              <h2 id="customize-title" className="text-xl font-playfair font-semibold text-[#35332F]">
                Customize Wedding Invitation
              </h2>
              <p className="text-xs text-[#7D766A] mt-0.5">
                Preview your own names, wax seal initials, and celebration preferences.
              </p>
            </div>

            <form onSubmit={handleSave} className="space-y-4">
              {/* Groom's Name */}
              <div>
                <label className="block text-xs font-medium uppercase tracking-wider text-[#59604C]">
                  Groom's Name
                </label>
                <input
                  type="text"
                  value={groomEn}
                  onChange={(e) => setGroomEn(e.target.value)}
                  className="mt-1 w-full px-3 py-2 bg-white border border-[#E8DFD2] rounded-md text-sm text-[#35332F] focus:ring-1 focus:ring-[#C9AE7A]"
                />
              </div>

              {/* Bride's Name */}
              <div>
                <label className="block text-xs font-medium uppercase tracking-wider text-[#59604C]">
                  Bride's Name
                </label>
                <input
                  type="text"
                  value={brideEn}
                  onChange={(e) => setBrideEn(e.target.value)}
                  className="mt-1 w-full px-3 py-2 bg-white border border-[#E8DFD2] rounded-md text-sm text-[#35332F] focus:ring-1 focus:ring-[#C9AE7A]"
                />
              </div>

              {/* Wax Seal Initials */}
              <div>
                <label className="block text-xs font-medium uppercase tracking-wider text-[#59604C]">
                  Wax Seal Initials
                </label>
                <input
                  type="text"
                  maxLength={7}
                  value={initials}
                  onChange={(e) => setInitials(e.target.value)}
                  placeholder="e.g. Z & A"
                  className="mt-1 w-full px-3 py-2 bg-white border border-[#E8DFD2] rounded-md text-sm text-[#35332F] focus:ring-1 focus:ring-[#C9AE7A]"
                />
              </div>

              {/* Name Order Selection */}
              <div>
                <label className="block text-xs font-medium uppercase tracking-wider text-[#59604C] mb-1">
                  Name Order
                </label>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <button
                    type="button"
                    onClick={() => setNameOrder('groom_first')}
                    className={`py-2 px-3 rounded-md border text-center font-medium transition-colors ${
                      nameOrder === 'groom_first'
                        ? 'bg-[#C9AE7A] text-white border-[#C9AE7A]'
                        : 'bg-white text-[#35332F] border-[#E8DFD2]'
                    }`}
                  >
                    Groom First
                  </button>
                  <button
                    type="button"
                    onClick={() => setNameOrder('bride_first')}
                    className={`py-2 px-3 rounded-md border text-center font-medium transition-colors ${
                      nameOrder === 'bride_first'
                        ? 'bg-[#C9AE7A] text-white border-[#C9AE7A]'
                        : 'bg-white text-[#35332F] border-[#E8DFD2]'
                    }`}
                  >
                    Bride First
                  </button>
                </div>
              </div>

              {/* Venue Name */}
              <div>
                <label className="block text-xs font-medium uppercase tracking-wider text-[#59604C]">
                  Nikah Venue
                </label>
                <input
                  type="text"
                  value={nikahVenue}
                  onChange={(e) => setNikahVenue(e.target.value)}
                  className="mt-1 w-full px-3 py-2 bg-white border border-[#E8DFD2] rounded-md text-sm text-[#35332F] focus:ring-1 focus:ring-[#C9AE7A]"
                />
              </div>

              {/* Modal Actions */}
              <div className="pt-4 border-t border-[#E8DFD2] flex items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={handleReset}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs text-[#7D766A] hover:text-[#35332F]"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>{t.resetDefault}</span>
                </button>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setIsOpen(false)}
                    className="px-3.5 py-1.5 text-xs text-[#59604C] bg-white border border-[#E8DFD2] rounded-md hover:bg-[#FAF8F4]"
                  >
                    {t.close}
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-1.5 text-xs font-medium text-white bg-[#C9AE7A] hover:bg-[#B89C67] rounded-md shadow-xs"
                  >
                    {t.saveChanges}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};
