export default function Home() {
    return (
        <main
            id="scroll-container"
            className="h-screen overflow-y-auto scroll-smooth snap-y snap-mandatory"
        >
            <section
                id="dev"
                className="h-screen snap-start pt-1.5"
            >
                <h1 className="text-4xl uppercase tracking-[1rem]">
                    developpeur full stack
                </h1>
            </section>

            <section
                id="projets"
                className="h-screen snap-start pt-1.5"
            >
                <h2 className="text-2xl uppercase tracking-[1rem]">
                    mes projets
                </h2>
            </section>

            <section
                id="technos"
                className="h-screen snap-start pt-1.5"
            >
                <h2 className="text-2xl uppercase tracking-[1rem]">
                    les technos
                </h2>
            </section>

            <section
                id="contact"
                className="h-screen snap-start pt-1.5"
            >
                <h2 className="text-2xl uppercase tracking-[1rem]">contact</h2>
            </section>
        </main>
    );
}
