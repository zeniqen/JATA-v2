"use client";

import * as React from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { X } from "lucide-react";

import { type TeamMember } from "@/lib/team";
import { MemberAvatar } from "./MemberAvatar";
import { MemberSocials } from "./MemberSocials";

interface Props {
  member: TeamMember | null;
  onClose: () => void;
}

function subscribeNoop() {
  return () => {};
}
function getClientSnapshot() {
  return true;
}
function getServerSnapshot() {
  return false;
}

export function TeamModal({ member, onClose }: Props) {
  const reduce = useReducedMotion();
  const closeRef = React.useRef<HTMLButtonElement | null>(null);
  const mounted = React.useSyncExternalStore(
    subscribeNoop,
    getClientSnapshot,
    getServerSnapshot
  );

  React.useEffect(() => {
    if (!member) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const id = window.requestAnimationFrame(() => {
      closeRef.current?.focus();
    });

    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", onKey);

    return () => {
      window.cancelAnimationFrame(id);
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = previousOverflow;
    };
  }, [member, onClose]);

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {member && (
        <motion.div
          key="team-modal"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: reduce ? 0 : 0.2 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6"
          role="dialog"
          aria-modal="true"
          aria-labelledby="team-modal-title"
          aria-describedby="team-modal-bio"
        >
          <div
            className="absolute inset-0 bg-foreground/40 backdrop-blur-md"
            onClick={onClose}
            aria-hidden="true"
          />
          <motion.div
            initial={
              reduce
                ? { opacity: 0 }
                : { opacity: 0, scale: 0.92, y: 16 }
            }
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={
              reduce
                ? { opacity: 0 }
                : { opacity: 0, scale: 0.96, y: 8 }
            }
            transition={{
              duration: reduce ? 0.15 : 0.32,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="relative w-full max-w-lg max-h-[calc(100dvh-2rem)] overflow-y-auto rounded-3xl border border-primary/25 bg-card shadow-2xl shadow-primary/20"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              ref={closeRef}
              type="button"
              onClick={onClose}
              aria-label="Close"
              className="absolute top-4 right-4 z-10 inline-flex h-9 w-9 items-center justify-center rounded-full text-foreground/70 hover:text-foreground hover:bg-secondary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-card"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="px-8 pt-12 pb-8 sm:px-10 sm:pt-14 sm:pb-10 text-center">
              <MemberAvatar member={member} size="modal" />
              <h2
                id="team-modal-title"
                className="mt-6 font-serif text-2xl sm:text-3xl font-medium tracking-tight"
              >
                {member.name}
              </h2>
              <p className="mt-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-primary">
                {member.role}
              </p>
              <p
                id="team-modal-bio"
                className="mt-5 text-base text-muted-foreground leading-relaxed text-left sm:text-center"
              >
                {member.fullBio}
              </p>

              <div className="mt-7 flex items-center justify-center">
                <MemberSocials member={member} size="md" />
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}
