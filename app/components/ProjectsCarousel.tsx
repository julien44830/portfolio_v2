"use client";

import { useEffect, useRef } from "react";
import CardProjet from "./cardProjet";

type CardProjetType = {
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

    // ✅ Verrou : empêche plusieurs sauts pendant qu’on anime vers une carte
    const isAnimatingRef = useRef(false);

    // ✅ Accumule les deltas de molette pour déclencher “1 carte par geste”
    const wheelAccRef = useRef(0);

    useEffect(() => {
        const el = scrollerRef.current;
        if (!el) return;

        /**
         * 🔎 Trouve le parent scrollable verticalement (sans dépendre d’un id)
         * + fallback sur document.scrollingElement.
         */
        const findVerticalScrollParent = (
            node: HTMLElement | null
        ): HTMLElement | null => {
            let current = node?.parentElement ?? null;

            while (current) {
                const style = window.getComputedStyle(current);
                const overflowY = style.overflowY;
                const overflow = style.overflow;

                const canScrollY =
                    overflowY === "auto" ||
                    overflowY === "scroll" ||
                    overflow === "auto" ||
                    overflow === "scroll";

                const hasScrollableContent =
                    current.scrollHeight > current.clientHeight;

                if (canScrollY && hasScrollableContent) return current;

                current = current.parentElement;
            }

            return (document.scrollingElement as HTMLElement | null) ?? null;
        };

        /**
         * 📦 Récupère toutes les cartes (wrappers) du carousel.
         */
        const getItems = () =>
            Array.from(el.querySelectorAll<HTMLElement>("[data-snap-item]"));

        /**
         * 🎯 Trouve l’index de la carte la plus proche de la position actuelle.
         * On le fait en comparant la position réelle de chaque carte avec scrollLeft.
         */
        const findClosestIndex = (items: HTMLElement[]) => {
            const x = el.scrollLeft;

            let bestIndex = 0;
            let bestDist = Infinity;

            for (let i = 0; i < items.length; i += 1) {
                const left = items[i].offsetLeft;
                const dist = Math.abs(left - x);

                if (dist < bestDist) {
                    bestDist = dist;
                    bestIndex = i;
                }
            }

            return bestIndex;
        };

        /**
         * ➡️ Va vers une carte (plus fiable que scrollLeft avec scroll-snap).
         */
        const goToIndex = (items: HTMLElement[], index: number) => {
            const clamped = Math.max(0, Math.min(index, items.length - 1));
            items[clamped].scrollIntoView({
                behavior: "smooth",
                block: "nearest",
                inline: "start",
            });
        };

        /**
         * 🧭 Quand on est aux bords, on redirige la molette vers le scroll vertical du parent.
         */
        const scrollVertical = (deltaY: number) => {
            const parent = findVerticalScrollParent(el);
            if (!parent) return;
            parent.scrollBy({ top: deltaY, behavior: "auto" });
        };

        /**
         * 🖱️ Handler molette (version robuste)
         * - on accumule deltaY jusqu’à dépasser un seuil
         * - on déclenche exactement 1 saut (prev/next)
         * - on détecte les bords via l’index courant (pas via scrollLeft)
         */
        const onWheel = (e: WheelEvent) => {
            // ✅ Si déjà en animation, on bloque (évite double-saut)
            if (isAnimatingRef.current) {
                e.preventDefault();
                return;
            }

            // ✅ Si le geste est plutôt horizontal (trackpad), on ne force pas
            if (Math.abs(e.deltaY) < Math.abs(e.deltaX)) return;

            const items = getItems();
            if (items.length === 0) return;

            // ✅ On calcule l’index “courant”
            const currentIndex = findClosestIndex(items);

            // ✅ Seuil : plus haut = plus “dur”, plus bas = plus sensible
            // Un bon point de départ : 60 à 120 selon souris/trackpad.
            const THRESHOLD = 80;

            // ✅ On accumule
            wheelAccRef.current += e.deltaY;

            // ✅ Tant qu’on n’a pas assez “d’intention” utilisateur, on ne saute pas
            if (Math.abs(wheelAccRef.current) < THRESHOLD) {
                // Ici on ne fait rien : on laisse les petits deltas s’accumuler
                // Important : on ne preventDefault pas, sinon tu “tues” le scroll naturel.
                return;
            }

            // ✅ À partir d’ici : on va déclencher 1 saut => on capture l’évènement
            e.preventDefault();

            // ✅ Sens du saut
            const direction = wheelAccRef.current > 0 ? 1 : -1;

            // ✅ Reset de l’accumulation après décision
            wheelAccRef.current = 0;

            const lastIndex = items.length - 1;

            // ✅ Si on est au début et qu’on veut aller “avant” => scroll vertical
            if (currentIndex === 0 && direction === -1) {
                scrollVertical(-THRESHOLD); // petite impulsion vers le haut
                return;
            }

            // ✅ Si on est à la fin et qu’on veut aller “après” => scroll vertical
            if (currentIndex === lastIndex && direction === 1) {
                scrollVertical(THRESHOLD); // petite impulsion vers le bas
                return;
            }

            // ✅ Sinon : on saute d’une carte
            const nextIndex = currentIndex + direction;

            isAnimatingRef.current = true;
            goToIndex(items, nextIndex);

            // ✅ Déverrouille après un délai (smooth scroll)
            window.setTimeout(() => {
                isAnimatingRef.current = false;
            }, 450);
        };

        el.addEventListener("wheel", onWheel, { passive: false });

        return () => {
            el.removeEventListener("wheel", onWheel as EventListener);
        };
    }, []);

    return (
        <div
            ref={scrollerRef}
            className="
        flex gap-8
        overflow-x-auto overflow-y-hidden
        py-6 pr-6
        snap-x snap-mandatory
        scroll-smooth
        [scrollbar-width:none]
        [-ms-overflow-style:none]
        [&::-webkit-scrollbar]:hidden
      "
            aria-label="Liste de projets (défilement horizontal)"
        >
            {projets.map((p) => (
                <div
                    key={p.title}
                    data-snap-item
                    className="snap-start shrink-0"
                >
                    <CardProjet
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
