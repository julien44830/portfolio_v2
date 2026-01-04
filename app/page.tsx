import Header from "./components/header";
import ProjectsCarousel from "./components/ProjectsCarousel";
import { projets } from "./src/data/data";

export default function Home() {
    return (
        <main
            id="scroll-container"
            className="h-screen overflow-y-auto scroll-smooth snap-y snap-mandatory md:ml-70 [scrollbar-width:none]"
        >
            <section
                id="dev"
                className="h-screen snap-start pt-1.5"
            >
                <h1 className="md:text-4xl uppercase tracking-[1rem] md:-ml-70 ">
                    developpeur full stack
                </h1>
                <Header />
            </section>

            <section
                id="projets"
                className="h-screen snap-start pt-1.5"
            >
                <h2 className="md:text-2xl uppercase tracking-[1rem]">
                    mes projets
                </h2>
                <article className="h-11/12 flex items-center ">
                    <ProjectsCarousel projets={projets} />{" "}
                </article>
            </section>

            <section
                id="technos"
                className="h-screen snap-start pt-1.5"
            >
                <h2 className="md:text-2xl uppercase tracking-[1rem]">
                    les technos
                </h2>
            </section>

            <section
                id="contact"
                className="h-screen snap-start pt-1.5"
            >
                <h2 className="md:text-2xl uppercase tracking-[1rem]">
                    contact
                </h2>{" "}
                <footer className="b-0">
                    <p className="text-center text-sm py-5">
                        © 2024 Julien Deniau. Tous droits réservés.
                    </p>
                </footer>
            </section>
        </main>
    );
}
