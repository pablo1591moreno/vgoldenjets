// ShareBar.tsx
import React from "react";

type Props = { url: string; title: string; text?: string };

export default function ShareBar({ url, title, text }: Props) {
  const enc = (s: string) => encodeURIComponent(s);
  const shareUrl = url;
  const shareText = text ?? title;

  const links = [
    {
      name: "X",
      href: `https://twitter.com/intent/tweet?url=${enc(shareUrl)}&text=${enc(shareText)}`,
    },
    {
      name: "LinkedIn",
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${enc(shareUrl)}`,
    },
    {
      name: "Facebook",
      href: `https://www.facebook.com/sharer/sharer.php?u=${enc(shareUrl)}`,
    },
    {
      name: "WhatsApp",
      href: `https://api.whatsapp.com/send?text=${enc(`${shareText} ${shareUrl}`)}`,
    },
    {
      name: "Telegram",
      href: `https://t.me/share/url?url=${enc(shareUrl)}&text=${enc(shareText)}`,
    },
    {
      name: "Email",
      href: `mailto:?subject=${enc(title)}&body=${enc(`${shareText}\n\n${shareUrl}`)}`,
    },
  ];

  return (
    <div className="mt-8 flex flex-wrap items-center gap-2">
      <span className="text-sm text-gray-600 mr-2">Compartir:</span>
      {links.map((l) => (
        <a
          key={l.name}
          href={l.href}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm px-3 py-1.5 rounded-full ring-1 ring-gray-300 hover:bg-gray-50"
        >
          {l.name}
        </a>
      ))}
    </div>
  );
}
