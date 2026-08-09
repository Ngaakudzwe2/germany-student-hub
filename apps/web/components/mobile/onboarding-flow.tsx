'use client';

import { useRef, useState, useSyncExternalStore } from 'react';
import Image from 'next/image';
import {
  Camera,
  Check,
  Coffee,
  Download,
  MapPin,
  MessagesSquare,
  Martini,
  Code2,
  QrCode,
  Sparkles,
} from 'lucide-react';

const INTERESTS = [
  { id: 'tech', label: 'Tech', icon: Code2 },
  { id: 'nightlife', label: 'Nightlife', icon: Martini },
  { id: 'language_exchange', label: 'Language Exchange', icon: MessagesSquare },
  { id: 'dating_coffee', label: 'Dating & Coffee Matches', icon: Coffee },
];

const CITIES = ['Berlin', 'Munich', 'Hamburg', 'Frankfurt', 'Cologne'];

const AVATAR_EMOJIS = ['🧑‍💻', '🎨', '🌍', '⚽', '🎧', '📚', '☕', '🚴'];
const AVATAR_COLORS = [
  'from-emerald-400 to-cyan-500',
  'from-indigo-400 to-violet-500',
  'from-orange-400 to-amber-500',
  'from-fuchsia-400 to-pink-500',
  'from-cyan-400 to-blue-500',
  'from-lime-400 to-emerald-500',
  'from-rose-400 to-orange-500',
  'from-violet-400 to-indigo-500',
];

type Step = 'welcome' | 'interests' | 'location' | 'avatar' | 'done';

// origin never changes after mount, so subscribe is a no-op — this just lets
// the client read window.location.origin without SSR/hydration mismatches.
const noopSubscribe = () => () => {};
const getClientOrigin = () => window.location.origin;
const getServerOrigin = () => null;

export function OnboardingFlow({ onComplete }: { onComplete: () => void }) {
  const [step, setStep] = useState<Step>('welcome');
  const [interests, setInterests] = useState<Set<string>>(new Set());
  const [city, setCity] = useState<string | null>(null);
  const [avatarEmoji, setAvatarEmoji] = useState<string | null>(null);
  const [uploadedPhoto, setUploadedPhoto] = useState<string | null>(null);
  const origin = useSyncExternalStore(noopSubscribe, getClientOrigin, getServerOrigin);
  const fileInputRef = useRef<HTMLInputElement>(null);

  function toggleInterest(id: string) {
    setInterests((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  function handlePhotoUpload(file: File | undefined) {
    if (!file) return;
    setUploadedPhoto(URL.createObjectURL(file));
    setAvatarEmoji(null);
  }

  const qrUrl = origin
    ? `https://api.qrserver.com/v1/create-qr-code/?size=160x160&bgcolor=09090b&color=f4f4f5&data=${encodeURIComponent(origin)}`
    : null;

  if (step === 'welcome') {
    return (
      <div className="flex h-full flex-col items-center justify-center gap-5 text-center">
        <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-400 to-cyan-500">
          <Sparkles className="h-7 w-7 text-zinc-950" />
        </span>
        <div>
          <h1 className="text-lg font-semibold text-zinc-50">Settle In</h1>
          <p className="mt-1 text-sm text-zinc-400">
            Meetups, dating &amp; coffee matches, and everything else for your move to Germany.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setStep('interests')}
          className="w-full rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-500 py-3 text-sm font-semibold text-zinc-950"
        >
          Get Started
        </button>

        <div className="w-full rounded-xl border border-white/10 bg-white/[0.02] p-4">
          <p className="mb-2 flex items-center justify-center gap-1.5 text-xs font-medium text-zinc-400">
            <QrCode className="h-3.5 w-3.5" />
            Scan to open on your phone
          </p>
          <div className="mx-auto flex h-[160px] w-[160px] items-center justify-center rounded-lg bg-white/5">
            {qrUrl ? (
              // eslint-disable-next-line @next/next/no-img-element -- external QR image, no next/image domain needed
              <img src={qrUrl} alt="QR code linking to this app" width={160} height={160} />
            ) : (
              <span className="text-xs text-zinc-600">Loading…</span>
            )}
          </div>
          <button
            type="button"
            disabled
            className="mt-3 flex w-full items-center justify-center gap-1.5 rounded-lg border border-white/10 py-2 text-xs font-medium text-zinc-500"
          >
            <Download className="h-3.5 w-3.5" />
            Download App — Coming Soon
          </button>
          <p className="mt-2 text-[10px] text-zinc-600">
            No native app yet — the QR code opens this responsive web app on your phone instead.
            {origin?.includes('localhost')
              ? " On localhost it won't be scannable from a real device until this is deployed."
              : ''}
          </p>
        </div>
      </div>
    );
  }

  if (step === 'interests') {
    return (
      <OnboardingStep
        title="What are you into?"
        subtitle="Pick a few — we'll tailor your meetup feed"
        onBack={() => setStep('welcome')}
        onNext={() => setStep('location')}
        nextDisabled={interests.size === 0}
      >
        <div className="grid grid-cols-2 gap-2">
          {INTERESTS.map((interest) => {
            const Icon = interest.icon;
            const active = interests.has(interest.id);
            return (
              <button
                key={interest.id}
                type="button"
                onClick={() => toggleInterest(interest.id)}
                className={`flex flex-col items-center gap-1.5 rounded-xl border px-2 py-4 text-center transition-colors ${
                  active
                    ? 'border-emerald-400/40 bg-emerald-500/10 text-emerald-300'
                    : 'border-white/10 text-zinc-400'
                }`}
              >
                <Icon className="h-5 w-5" />
                <span className="text-xs font-medium">{interest.label}</span>
              </button>
            );
          })}
        </div>
      </OnboardingStep>
    );
  }

  if (step === 'location') {
    return (
      <OnboardingStep
        title="Where are you based?"
        subtitle="We'll show meetups and listings near you"
        onBack={() => setStep('interests')}
        onNext={() => setStep('avatar')}
        nextDisabled={!city}
      >
        <div className="space-y-2">
          {CITIES.map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => setCity(c)}
              className={`flex w-full items-center gap-2 rounded-xl border px-3 py-2.5 text-left text-sm transition-colors ${
                city === c
                  ? 'border-emerald-400/40 bg-emerald-500/10 text-emerald-300'
                  : 'border-white/10 text-zinc-300'
              }`}
            >
              <MapPin className="h-4 w-4" />
              {c}
              {city === c && <Check className="ml-auto h-4 w-4" />}
            </button>
          ))}
        </div>
      </OnboardingStep>
    );
  }

  if (step === 'avatar') {
    const hasAvatar = Boolean(avatarEmoji || uploadedPhoto);
    return (
      <OnboardingStep
        title="Pick a profile picture"
        subtitle="Upload a photo or choose an avatar"
        onBack={() => setStep('location')}
        onNext={() => setStep('done')}
        nextDisabled={!hasAvatar}
      >
        <div className="mb-4 flex justify-center">
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="relative flex h-20 w-20 items-center justify-center overflow-hidden rounded-full border border-dashed border-white/20 bg-white/[0.03]"
          >
            {uploadedPhoto ? (
              <Image src={uploadedPhoto} alt="Uploaded profile" fill className="object-cover" />
            ) : avatarEmoji ? (
              <span className="text-3xl">{avatarEmoji}</span>
            ) : (
              <Camera className="h-6 w-6 text-zinc-500" />
            )}
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => handlePhotoUpload(e.target.files?.[0])}
          />
        </div>

        <p className="mb-2 text-center text-xs text-zinc-500">or pick an avatar</p>
        <div className="grid grid-cols-4 gap-2">
          {AVATAR_EMOJIS.map((emoji, i) => (
            <button
              key={emoji}
              type="button"
              onClick={() => {
                setAvatarEmoji(emoji);
                setUploadedPhoto(null);
              }}
              className={`flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br text-lg ${AVATAR_COLORS[i]} ${
                avatarEmoji === emoji ? 'ring-2 ring-white/60' : ''
              }`}
            >
              {emoji}
            </button>
          ))}
        </div>
      </OnboardingStep>
    );
  }

  return (
    <div className="flex h-full flex-col items-center justify-center gap-4 text-center">
      <span className="flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500/15">
        <Check className="h-7 w-7 text-emerald-400" />
      </span>
      <div>
        <h1 className="text-lg font-semibold text-zinc-50">You&apos;re all set!</h1>
        <p className="mt-1 text-sm text-zinc-400">
          {city} · {interests.size} interest{interests.size === 1 ? '' : 's'} selected
        </p>
      </div>
      <button
        type="button"
        onClick={onComplete}
        className="w-full rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-500 py-3 text-sm font-semibold text-zinc-950"
      >
        Enter App →
      </button>
    </div>
  );
}

function OnboardingStep({
  title,
  subtitle,
  onBack,
  onNext,
  nextDisabled,
  children,
}: {
  title: string;
  subtitle: string;
  onBack: () => void;
  onNext: () => void;
  nextDisabled: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-full flex-col">
      <div className="mb-4">
        <h2 className="text-base font-semibold text-zinc-50">{title}</h2>
        <p className="text-xs text-zinc-500">{subtitle}</p>
      </div>
      <div className="flex-1">{children}</div>
      <div className="mt-4 flex gap-2">
        <button
          type="button"
          onClick={onBack}
          className="rounded-xl border border-white/10 px-4 py-2.5 text-xs font-medium text-zinc-400"
        >
          Back
        </button>
        <button
          type="button"
          onClick={onNext}
          disabled={nextDisabled}
          className="flex-1 rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-500 py-2.5 text-xs font-semibold text-zinc-950 disabled:cursor-not-allowed disabled:opacity-40"
        >
          Continue
        </button>
      </div>
    </div>
  );
}
