import Image from "next/image";

type CardProjetProps = {
    id: number;
    img: string;
    lien: string;
    desc: string;
    title: string;
};

export default function CardProjet({
    id,
    img,
    lien,
    desc,
    title,
}: CardProjetProps) {
    return (
        <div
            className={`
            flex flex-col
            shrink-0
            w-[85vw] max-w-90
            md:w-95
            rounded-2xl bg-white/5 p-6
            backdrop-blur-xl
            shadow-[0_20px_80px_rgba(0,0,0,0.35)]
            ml-6
            `}
        >
            {/* Header */}
            <div>
                <h3 className="mb-4 text-xl font-bold">{title}</h3>

                <Image
                    src={img}
                    alt={`Aperçu du projet ${title}`}
                    width={800}
                    height={500}
                    className="w-full rounded-lg object-cover"
                />
            </div>

            {/* Description */}
            <p className="mt-4 line-clamp-4 text-white/80">{desc}</p>

            {/* CTA toujours en bas */}
            <a
                href={lien}
                className="mt-auto text-(--primary) hover:underline"
                target="_blank"
                rel="noopener noreferrer"
            >
                Voir le projet
            </a>
        </div>
    );
}
