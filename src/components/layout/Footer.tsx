import React from 'react';
import { Phone, Mail, MapPin, ShieldCheck } from 'lucide-react';

interface FooterProps {
  onOpenHelpdesk?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenHelpdesk }) => {
  return (
    <footer className="mt-12 border-t border-[#D6EBE1] bg-[#F7FCFA] px-6 py-6 text-xs text-[#5B7A70]">
      <div className="mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h4 className="font-bold text-sm text-[#12352B]">
            UPTD Puskesmas Kepanjen
          </h4>
          <p className="mt-0.5 text-xs">
            Jl. Jatirejoyoso No. 4, Kepanjen, Kabupaten Malang, Jawa Timur 65163
          </p>
          <p className="mt-0.5 text-[11px] text-[#5B7A70]">
            SI-KAWAN Posyandu • Sistem Informasi Kolaborasi, Akses, dan Integrasi Posyandu
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-6 text-xs">
          <button
            onClick={onOpenHelpdesk}
            className="font-semibold text-[#17503C] hover:text-[#2F9E73] transition-colors cursor-pointer"
          >
            Hubungi Helpdesk
          </button>
          <span className="text-[#BDCAC0]">•</span>
          <span className="font-mono text-[#5B7A70]">v2.4.0 Siklus Hidup</span>
        </div>
      </div>
    </footer>
  );
};
