import Image from "next/image";

type SneakPeakText = {
  title: string;
  description: string;
  items: readonly {
    id: number;
    src: string;
    alt: string;
  }[];
};

export default function SneakPeak({ t }: { t: SneakPeakText }) {
  return (
    <section className="w-full py-20">
      <div className="flex flex-col gap-10">
        <div className="flex flex-col items-center justify-center text-center space-y-2 px-4">
          <h2 className="text-3xl md:text-5xl font-semibold tracking-tight">
            {t.title}
          </h2>
          <p className="text-muted-foreground font-light text-sm md:text-base">
            {t.description}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 w-full">
          {t.items.map((item) => (
            <div
              key={item.id}
              className="group relative w-full overflow-hidden bg-muted"
            >
              <Image
                src={item.src}
                alt={item.alt}
                width={500}
                height={600}
                className="w-full h-auto object-cover transition-transform duration-700 ease-in-out group-hover:scale-110"
              />

              {/* Overlay for better marker visibility if needed, keeps it subtle */}
              <div className="absolute inset-0 bg-black/0 transition-colors duration-500 group-hover:bg-black/10" />

              {/* Corner Markers */}
              {/* Top Left */}
              <div className="absolute top-4 left-4 w-4 h-4 border-t-2 border-l-2 border-white opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:top-6 group-hover:left-6" />
              {/* Top Right */}
              <div className="absolute top-4 right-4 w-4 h-4 border-t-2 border-r-2 border-white opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:top-6 group-hover:right-6" />
              {/* Bottom Left */}
              <div className="absolute bottom-4 left-4 w-4 h-4 border-b-2 border-l-2 border-white opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:bottom-6 group-hover:left-6" />
              {/* Bottom Right */}
              <div className="absolute bottom-4 right-4 w-4 h-4 border-b-2 border-r-2 border-white opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:bottom-6 group-hover:right-6" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
