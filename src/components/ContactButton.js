// components/ContactButtons.js
'use client';

import { Phone, MessageCircle } from 'lucide-react';

export function ContactButtons() {
  return (
    <div className="flex flex-col sm:flex-row gap-4 justify-center my-8">
      <a
        href="tel:080-5291-4963"
        className="flex items-center justify-center gap-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
      >
        <Phone className="w-5 h-5" />
        <span>電話で相談する</span>
      </a>
      <a
        href="https://line.me/R/ti/p/@your-line-id"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center gap-2 px-6 py-3 bg-[#00B900] text-white rounded-lg hover:bg-[#009900] transition-colors"
      >
        <MessageCircle className="w-5 h-5" />
        <span>LINEで相談する</span>
      </a>
    </div>
  );
}
