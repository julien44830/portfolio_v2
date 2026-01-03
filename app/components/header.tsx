import Image from "next/image";

export default function Header() {
    return (
        <header
            className="mt-10 flex flex-col md:flex-row items-center gap-5
         md:gap-20 p-5 h-100"
        >
            <div className="relative aspect-square w-50 md:w-200 md:ml-10">
                <Image
                    src="/images/profile.jpg"
                    alt="Julien développeur full stack"
                    fill
                    className="rounded-full object-cover"
                    priority
                />
            </div>

            <div
                className="flex flex-col justify-center gap-7 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl 
            shadow-[0_20px_80px_rgba(0,0,0,0.35)] p-8 max-h-96"
            >
                <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Delectus possimus quaerat quae ab facilis quibusdam itaque
                    aperiam distinctio velit, a similique consectetur,
                    exercitationem temporibus, ad placeat tenetur sit ipsa hic?
                    Quasi voluptatem nobis, tenetur reiciendis vitae ex, enim,
                    dolorum nulla quibusdam amet cum inventore illum quos id
                    fugit similique aliquam! Similique iure ad officia
                    perspiciatis quia alias quod est pariatur.
                </p>
            </div>
        </header>
    );
}
