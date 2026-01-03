"use client";

import { useEffect, useMemo, useState } from "react";

type SectionItem = { id: string; label: string };

export default function Menu() {
    const sections = useMemo<SectionItem[]>(
        () => [
            { id: "dev", label: "Le dev" },
            { id: "projets", label: "Projets" },
            { id: "technos", label: "Techno" },
            { id: "contact", label: "Contact" },
        ],
        []
    );

    const [activeId, setActiveId] = useState("dev");

    useEffect(() => {
        const root = document.getElementById("scroll-container");
        if (!root) return;

        const targets = sections
            .map((s) => document.getElementById(s.id))
            .filter(Boolean) as HTMLElement[];

        if (targets.length === 0) return;

        const observer = new IntersectionObserver(
            (entries) => {
                // On choisit la section la plus “présente” dans la viewport
                const best = entries
                    .filter((e) => e.isIntersecting)
                    .sort(
                        (a, b) =>
                            (b.intersectionRatio ?? 0) -
                            (a.intersectionRatio ?? 0)
                    )[0];

                if (best?.target?.id) setActiveId(best.target.id);
            },
            {
                root, // ✅ IMPORTANT : on observe le conteneur scrollable
                // On déclenche quand la section passe au centre (super stable)
                rootMargin: "-45% 0px -45% 0px",
                threshold: 0,
            }
        );

        targets.forEach((t) => observer.observe(t));
        return () => observer.disconnect();
    }, [sections]);

    const goTo = (id: string) => (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        const el = document.getElementById(id);
        if (!el) return;

        el.scrollIntoView({ behavior: "smooth", block: "start" });
        setActiveId(id);
        history.replaceState(null, "", `#${id}`);
    };

    return (
        <nav className="fixed left-10 flex min-h-screen items-center invisible  md:visible">
            <ul className="flex flex-col justify-center gap-7 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-[0_20px_80px_rgba(0,0,0,0.35)] p-8">
                {sections.map((s) => {
                    const isActive = activeId === s.id;

                    return (
                        <li
                            key={s.id}
                            className="flex items-center justify-between gap-10"
                        >
                            <a
                                href={`#${s.id}`}
                                onClick={goTo(s.id)}
                                className={
                                    isActive
                                        ? "text-white"
                                        : "text-white/75 hover:text-white"
                                }
                            >
                                {s.label}
                            </a>

                            <a
                                href={`#${s.id}`}
                                onClick={goTo(s.id)}
                                aria-label={`Aller à ${s.label}`}
                            >
                                <div
                                    className={[
                                        "h-5 w-5 rounded-full transition-all duration-200",
                                        isActive
                                            ? "bg-(--primary) shadow-[0_0_18px_rgba(0,242,123,0.55)] scale-110"
                                            : "bg-white/30 hover:bg-white/50",
                                    ].join(" ")}
                                />
                            </a>
                        </li>
                    );
                })}
            </ul>
        </nav>
    );
}
