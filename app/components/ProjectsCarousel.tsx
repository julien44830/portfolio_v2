"use client";

import { useEffect, useRef } from "react";
import CardProjet from "./cardProjet";

type CardProjetType = {
    id: number;
    img: string;
    lien: string;
    desc: string;
    title: string;
};

type Props = {
    projets: CardProjetType[];
};

export default function ProjectsCarousel({ projets }: Props) {
    const scrollerRef = useRef<HTMLDivElement | null>(null);

    // 🎯 Index logique courant (source de vérité)
    const activeIndexRef = useRef(0);

    // 🔒 Verrou pendant l’animation smooth
    const isAnimatingRef = useRef(false);

    useEffect(() => {
        const el = scrollerRef.current;
        if (!el) return;

        /* ===========================
           🔎 Scroll vertical parent
        =========================== */
        const findVerticalScrollParent = (
            node: HTMLElement
        ): HTMLElement | null => {
            let current: HTMLElement | null = node.parentElement;

            while (current) {
                const style = window.getComputedStyle(current);
                const canScrollY =
                    style.overflowY === "auto" || style.overflowY === "scroll";

                if (canScrollY && current.scrollHeight > current.clientHeight) {
                    return current;
                }

                current = current.parentElement;
            }

            return document.scrollingElement as HTMLElement | null;
        };

        const scrollVertical = (deltaY: number) => {
            const parent = findVerticalScrollParent(el);
            if (!parent) return;
            parent.scrollBy({ top: deltaY, behavior: "auto" });
        };

        /* ===========================
           🧭 Scroll vers une card
        =========================== */
        const scrollToIndex = (index: number) => {
            const clamped = Math.max(0, Math.min(index, projets.length - 1));

            const target = document.getElementById(
                `project-${projets[clamped].id}`
            );

            if (!target) return;

            activeIndexRef.current = clamped;
            isAnimatingRef.current = true;

            target.scrollIntoView({
                behavior: "smooth",
                block: "nearest",
                inline: "start",
            });

            // 🔓 déverrouille après l’animation
            window.setTimeout(() => {
                isAnimatingRef.current = false;
            }, 500);
        };

        /* ===========================
           🖱️ Gestion molette
        =========================== */
        const onWheel = (e: WheelEvent) => {
            // 👉 si animation en cours → on bloque
            if (isAnimatingRef.current) {
                e.preventDefault();
                return;
            }

            // 👉 trackpad horizontal → on ne force pas
            if (Math.abs(e.deltaY) < Math.abs(e.deltaX)) return;

            // 👉 dead zone (évite micro mouvements)
            if (Math.abs(e.deltaY) < 5) return;

            e.preventDefault();

            const direction = e.deltaY > 0 ? 1 : -1;
            const current = activeIndexRef.current;
            const lastIndex = projets.length - 1;

            // ⬆️ Début + scroll up → scroll vertical page
            if (current === 0 && direction === -1) {
                scrollVertical(e.deltaY);
                return;
            }

            // ⬇️ Fin + scroll down → scroll vertical page
            if (current === lastIndex && direction === 1) {
                scrollVertical(e.deltaY);
                return;
            }

            // ➡️⬅️ Navigation horizontale
            scrollToIndex(current + direction);
        };

        el.addEventListener("wheel", onWheel, { passive: false });

        // 🔁 reset au montage (sécurité)
        requestAnimationFrame(() => {
            activeIndexRef.current = 0;
            el.scrollTo({ left: 0, behavior: "auto" });
        });

        return () => {
            el.removeEventListener("wheel", onWheel as EventListener);
        };
    }, [projets]);

    return (
        <div
            ref={scrollerRef}
            className="
    flex gap-8 justify-start
    overflow-x-auto overflow-y-hidden
    px-6 py-6
    snap-x snap-mandatory scroll-smooth
    [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden
    rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl
    shadow-[0_20px_80px_rgba(0,0,0,0.35)]
    w-full
    md:max-w-11/12 md:mx-auto
  "
        >
            {projets.map((p) => (
                <div
                    key={p.id}
                    id={`project-${p.id}`}
                    className="snap-start shrink-0 "
                >
                    <CardProjet
                        id={p.id}
                        img={p.img}
                        lien={p.lien}
                        desc={p.desc}
                        title={p.title}
                    />
                </div>
            ))}
        </div>
    );
}
