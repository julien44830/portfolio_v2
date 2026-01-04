type CardProjetType = {
  id: number,
  img: string;
  lien: string;
  desc: string;
  title: string;
};

export const projets: CardProjetType[] = [
  {
    id: 1,
    title: "Portfolio v2",
    desc: "Mon portfolio personnel développé avec Next.js, Tailwind CSS et un design glassmorphism.",
    img: "/images/projets/color-pop.png",
    lien: "https://github.com/ton-compte/medical-agenda",
  },
  {
    id: 2,
    title: "Medical Agenda",
    desc: "Application de gestion de rendez-vous médicaux avec authentification, GraphQL et PostgreSQL.",
    img: "/images/projets/color-pop.png",
    lien: "https://github.com/ton-compte/medical-agenda",
  },
  {
    id: 3,
    title: "Pictevent",
    desc: "Plateforme de partage de photos avec gestion des albums, permissions et upload d’images.",
    img: "/images/projets/color-pop.png",
    lien: "https://github.com/ton-compte/pictevent",
  },
  {
    id: 4,
    title: "Convertisseur YouTube MP3",
    desc: "Interface web pour convertir des vidéos YouTube en MP3 via un backend Node.js.",
    img: "/images/projets/color-pop.png",
    lien: "https://github.com/ton-compte/youtube-mp3",
  },
  {
    id: 5,
    title: "Portfolio scscv2",
    desc: "Mon portfolio personnel développé avec Next.js, Tailwind CSS et un design glassmorphism.",
    img: "/images/projets/color-pop.png",
    lien: "https://ton-site.com",
  },
  {
    id: 6,
    title: "Medical scscsAgenda",
    desc: "Application de gestion de rendez-vous médicaux avec authentification, GraphQL et PostgreSQL.",
    img: "/images/projets/color-pop.png",
    lien: "https://github.com/ton-compte/medical-agenda",
  },
  {
    id: 7,
    title: "Pictevenscscst",
    desc: "Plateforme de partage de photos avec gestion des albums, permissions et upload d’images.",
    img: "/images/projets/color-pop.png",
    lien: "https://github.com/ton-compte/pictevent",
  },
  {
    id: 8,
    title: "Convertisscscseur YouTube MP3",
    desc: "Interface web pour convertir des vidéos YouTube en MP3 via un backend Node.js.",
    img: "/images/projets/color-pop.png",
    lien: "https://github.com/ton-compte/youtube-mp3",
  },
];
