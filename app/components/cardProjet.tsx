import Image from "next/image";

type CardProjetProps = {
    img: string;
    lien: string;
    desc: string;
    title: string;
};

export default function CardProjet({
    img,
    lien,
    desc,
    title,
}: CardProjetProps) {
    return (
        <div
            className="
        flex h-130 max-w-sm flex-col
        rounded-2xl bg-white/5 p-6
        backdrop-blur-xl
        shadow-[0_20px_80px_rgba(0,0,0,0.35)]
      "
        >
            {/* Header */}
            <div>
                <h3 className="mb-4 text-xl font-bold">{title}</h3>

                <Image
                    src={img}
                    alt={`Aperçu du projet ${title}`}
                    width={400}
                    height={250}
                    className="rounded-lg object-cover"
                />
            </div>

            {/* Description */}
            <p className="mt-4 text-white/80 line-clamp-4">{desc}</p>

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
