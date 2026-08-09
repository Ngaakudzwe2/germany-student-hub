'use client';

import Image from 'next/image';
import {
  BedDouble,
  Calendar,
  FileText,
  Mail,
  MapPin,
  Phone,
  ShieldAlert,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';
import type { DemoListing } from '@/lib/demo-data';
import { SCAM_RED_FLAGS } from '@/lib/demo-data';
import { unsplashUrl } from '@/lib/event-meta';
import { Modal } from '@/components/ui/modal';

interface PropertyModalProps {
  listing: DemoListing | null;
  onClose: () => void;
  onGenerateLetter: () => void;
}

export function PropertyModal({ listing, onClose, onGenerateLetter }: PropertyModalProps) {
  if (!listing) return null;

  const quickFlags = SCAM_RED_FLAGS.slice(0, 3);

  return (
    <Modal
      open={!!listing}
      onClose={onClose}
      title={listing.title}
      subtitle={`${listing.district}, ${listing.city}`}
    >
      <div className="space-y-6">
        <div className="relative h-40 w-full overflow-hidden rounded-xl">
          <Image
            src={unsplashUrl(listing.coverPhotoId, 640)}
            alt=""
            fill
            sizes="512px"
            className="object-cover"
          />
        </div>

        <div className="grid grid-cols-3 gap-2 text-center">
          <div className="rounded-lg border border-white/10 bg-white/[0.03] py-2">
            <p className="text-sm font-semibold text-zinc-50">€{listing.rentEur}</p>
            <p className="text-[10px] text-zinc-500">per month</p>
          </div>
          <div className="rounded-lg border border-white/10 bg-white/[0.03] py-2">
            <p className="flex items-center justify-center gap-1 text-sm font-semibold text-zinc-50">
              <BedDouble className="h-3.5 w-3.5" />
              {listing.roomSizeSqm} m²
            </p>
            <p className="text-[10px] text-zinc-500">room size</p>
          </div>
          <div className="rounded-lg border border-white/10 bg-white/[0.03] py-2">
            <p className="flex items-center justify-center gap-1 text-sm font-semibold text-zinc-50">
              <Calendar className="h-3.5 w-3.5" />
              {new Date(listing.moveInDate).toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
              })}
            </p>
            <p className="text-[10px] text-zinc-500">move-in</p>
          </div>
        </div>

        <section>
          <p className="text-sm text-zinc-400">{listing.description}</p>
        </section>

        <section>
          <h3 className="mb-2 text-sm font-medium text-zinc-200">Amenities</h3>
          <ul className="flex flex-wrap gap-2">
            {listing.amenities.map((amenity) => (
              <li
                key={amenity}
                className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-zinc-300"
              >
                {amenity}
              </li>
            ))}
          </ul>
        </section>

        <section>
          <h3 className="mb-2 flex items-center gap-2 text-sm font-medium text-zinc-200">
            <MapPin className="h-4 w-4 text-orange-400" />
            Landlord contact
          </h3>
          <div className="rounded-lg border border-white/10 bg-white/[0.03] p-3">
            <p className="mb-2 text-sm font-medium text-zinc-100">{listing.landlordName}</p>
            <div className="flex flex-wrap gap-2">
              <a
                href={`mailto:${listing.landlordEmail}`}
                className="inline-flex items-center gap-1.5 rounded-lg border border-white/10 px-3 py-1.5 text-xs font-medium text-zinc-300 hover:border-white/20"
              >
                <Mail className="h-3.5 w-3.5" />
                Email
              </a>
              <a
                href={`tel:${listing.landlordPhone.replace(/\s+/g, '')}`}
                className="inline-flex items-center gap-1.5 rounded-lg border border-white/10 px-3 py-1.5 text-xs font-medium text-zinc-300 hover:border-white/20"
              >
                <Phone className="h-3.5 w-3.5" />
                {listing.landlordPhone}
              </a>
            </div>
          </div>
        </section>

        <section>
          <h3 className="mb-2 flex items-center gap-2 text-sm font-medium text-zinc-200">
            {listing.verified ? (
              <ShieldCheck className="h-4 w-4 text-emerald-400" />
            ) : (
              <ShieldAlert className="h-4 w-4 text-amber-400" />
            )}
            Scam risk check
          </h3>
          <div
            className={`rounded-lg border p-3 text-sm ${
              listing.verified
                ? 'border-emerald-500/20 bg-emerald-500/5 text-emerald-300'
                : 'border-amber-500/20 bg-amber-500/5 text-amber-300'
            }`}
          >
            {listing.verified
              ? 'Landlord identity and Wohnungsgeberbestätigung verified by our team.'
              : 'This landlord hasn\'t been verified yet — review the reminders below before sending any money.'}
          </div>
          <ul className="mt-2 space-y-1.5">
            {quickFlags.map((flag) => (
              <li key={flag.id} className="flex items-start gap-2 text-xs text-zinc-500">
                <span className="mt-1 h-1 w-1 shrink-0 rounded-full bg-zinc-600" />
                {flag.description}
              </li>
            ))}
          </ul>
        </section>

        <button
          type="button"
          onClick={onGenerateLetter}
          className="flex w-full items-center justify-center gap-1.5 rounded-xl bg-gradient-to-r from-orange-500 to-amber-400 py-3 text-sm font-semibold text-zinc-950"
        >
          <FileText className="h-4 w-4" />
          Generate German Application Letter
          <Sparkles className="h-3.5 w-3.5" />
        </button>
      </div>
    </Modal>
  );
}
