"use client";

const colors = [
    {
        name: "Primaire",
        hex: "#00F27B",
        oklch: "oklch(86% 0.20 150)",
        varHex: "--primary",
        varOklch: "--primary-oklch",
    },
    {
        name: "Secondaire",
        hex: "#005F3F",
        oklch: "oklch(39% 0.09 165)",
        varHex: "--secondary",
        varOklch: "--secondary-oklch",
    },
    {
        name: "Fond 0",
        hex: "#001510",
        oklch: "oklch(17% 0.03 180)",
        varHex: "--bg-0",
        varOklch: "--bg-0-oklch",
    },
    {
        name: "Fond 1",
        hex: "#002924",
        oklch: "oklch(22% 0.04 178)",
        varHex: "--bg-1",
        varOklch: "--bg-1-oklch",
    },
    {
        name: "Texte",
        hex: "#E5FFF2",
        oklch: "oklch(97% 0.03 160)",
        varHex: "--text",
        varOklch: "--text-oklch",
    },
];

const typeScale = [
    {
        label: "Title",
        className:
            "text-3xl font-normal tracking-[0.08em] [font-family:var(--font-cyform),var(--font-sans)]",
        value: "Cyform / text-3xl / tracking 0.08em",
    },
    {
        label: "Heading",
        className: "text-xl font-semibold",
        value: "text-xl / semibold",
    },
    {
        label: "Body",
        className: "text-base text-white/80",
        value: "text-base",
    },
    {
        label: "Small",
        className: "text-sm text-white/70",
        value: "text-sm",
    },
    {
        label: "Mono",
        className: "font-mono text-sm text-white/80",
        value: "font-mono text-sm",
    },
];

function Swatch({
    name,
    hex,
    oklch,
    cssVar,
}: {
    name: string;
    hex: string;
    oklch: string;
    cssVar: string;
}) {
    return (
        <div className="rounded-xl border border-white/10 bg-white/5 backdrop-blur-xl p-4">
            <div className="flex items-center gap-4">
                <div
                    className="h-10 w-10 rounded-lg border border-white/10"
                    style={{ background: `var(${cssVar})` }}
                    aria-hidden="true"
                />
                <div className="min-w-0">
                    <div className="font-medium">{name}</div>
                    <div className="mt-1 flex flex-wrap gap-2 text-xs text-white/70">
                        <span className="rounded-md border border-white/10 bg-black/20 px-2 py-1">
                            HEX:{" "}
                            <span className="font-mono text-white/80">
                                {hex}
                            </span>
                        </span>
                        <span className="rounded-md border border-white/10 bg-black/20 px-2 py-1">
                            OKLCH:{" "}
                            <span className="font-mono text-white/80">
                                {oklch}
                            </span>
                        </span>
                    </div>
                    <div className="mt-2 text-xs text-white/60">
                        Variables: <span className="font-mono">{cssVar}</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function DesignSystemCard() {
    return (
        <main className="relative min-h-screen text-(--text)">
            {/* Fond couleur simple  */}
            <div
                aria-hidden="true"
                className="
          pointer-events-none fixed inset-0 -z-10
          bg-[linear-gradient(135deg,var(--bg-0),var(--bg-1)_45%,#001d18_70%,var(--bg-0))]
        "
            >
                <div className="absolute inset-0 bg-[var(--bg-0)/40]" />
            </div>

            <div className="mx-auto max-w-6xl px-6 py-14">
                {/* Carte Design System */}
                <section
                    className="
            rounded-3xl border border-white/10
            bg-white/5 backdrop-blur-xl
            shadow-[0_20px_80px_rgba(0,0,0,0.35)]
            p-8
          "
                >
                    <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
                        <div>
                            <h1 className="text-4xl ">Charte graphique</h1>
                            <p className="mt-2 text-white/75">
                                Palette, variables CSS, OKLCH, et règles
                                typographiques.
                            </p>
                        </div>

                        <div className="flex flex-wrap gap-2">
                            <span className="rounded-xl border border-white/10 bg-black/20 px-3 py-2 text-sm">
                                Police :{" "}
                                <span className="font-mono">
                                    var(--font-sans)
                                </span>
                            </span>
                            <span className="rounded-xl border border-white/10 bg-black/20 px-3 py-2 text-sm">
                                Fond : <span className="font-mono">--bg-0</span>
                            </span>
                        </div>
                    </div>

                    {/* Couleurs */}
                    <div className="mt-8">
                        <h2 className="text-xl font-semibold">Couleurs</h2>
                        <p className="mt-2 text-white/70">
                            Primaire, secondaire, fonds et texte avec codes
                            hexadécimaux et OKLCH.
                        </p>

                        <div className="mt-4 grid gap-4 md:grid-cols-2">
                            <Swatch
                                name="Primaire"
                                hex="#00F27B"
                                oklch="oklch(86% 0.20 150)"
                                cssVar="--primary"
                            />
                            <Swatch
                                name="Secondaire"
                                hex="#005F3F"
                                oklch="oklch(39% 0.09 165)"
                                cssVar="--secondary"
                            />
                            <Swatch
                                name="Fond 0"
                                hex="#001510"
                                oklch="oklch(17% 0.03 180)"
                                cssVar="--bg-0"
                            />
                            <Swatch
                                name="Fond 1"
                                hex="#002924"
                                oklch="oklch(22% 0.04 178)"
                                cssVar="--bg-1"
                            />
                            <Swatch
                                name="Texte"
                                hex="#E5FFF2"
                                oklch="oklch(97% 0.03 160)"
                                cssVar="--text"
                            />
                        </div>
                    </div>

                    {/* Typo */}
                    <div className="mt-10">
                        <h2 className="text-xl font-semibold">Typographie</h2>

                        <div className="mt-4 grid gap-4 md:grid-cols-2">
                            {typeScale.map((t) => (
                                <div
                                    key={t.label}
                                    className="rounded-xl border border-white/10 bg-black/20 p-4 "
                                >
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm text-white/70">
                                            {t.label}
                                        </span>
                                        <span className="font-mono text-xs text-white/60">
                                            {t.value}
                                        </span>
                                    </div>
                                    <div className={`mt-3 ${t.className}`}>
                                        Exemple de texte
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Composants */}
                    <div className="mt-10">
                        <h2 className="text-xl font-semibold">Composants</h2>
                        <p className="mt-2 text-white/70">
                            Exemples rapides basés sur la palette.
                        </p>

                        <div className="mt-4 flex flex-wrap items-center gap-3">
                            <button
                                className="
                                hover:border-(--primary)
                                hover:shadow-[0_0_28px--primairy]
                                hover:scale-105
                                hover:text-(--primary)
                                  rounded-xl px-4 py-2 font-medium
                                  border border-[var(--primary)/30]
                                  bg-[var(--primary)/12]
                                  shadow-[0_0_28px_rgba(0,242,123,0.18)]
                                  hover:bg-[var(--primary)/18]
                                  transition
                                "
                            >
                                Bouton primaire
                            </button>

                            <span className="rounded-xl border border-white/10 bg-black/20 px-3 py-2 text-sm">
                                Badge{" "}
                                <span className="text-(--primary)">accent</span>
                            </span>

                            <span className="rounded-xl border border-white/10 bg-black/20 px-3 py-2 font-mono text-sm text-white/80">
                                #00F27B / oklch(86% 0.20 150)
                            </span>
                        </div>
                    </div>
                </section>
            </div>
        </main>
    );
}
