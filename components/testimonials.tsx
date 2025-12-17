import TestimonialCard from "./testimonial-card";

type TestimonialsText = {
  title: string;
  subtitle: string;
  reviews: readonly {
    id: number;
    profile: string;
    name: string;
    initials: string;
    source: string;
    testimonial: string;
  }[];
};

export default function Testimonials({ t }: { t: TestimonialsText }) {
  return (
    <div className="min-h-svh h-full flex flex-col items-center justify-center py-20 px-4">
      <h2 className="text-3xl md:text-4xl mb-10 font-semibold text-center">{t.title}</h2>
      <div className="relative w-full max-w-8xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 max-h-[800px] overflow-hidden md:max-h-none md:overflow-visible">
          {t.reviews.map(({ id, profile, name, initials, source, testimonial }) => (
            <TestimonialCard
              key={id}
              profile={profile}
              name={name}
              initials={initials}
              source={source}
              testimonials={testimonial}
            />
          ))}
        </div>
        <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-background to-transparent md:hidden" />
      </div>
      <h2 className="text-xl md:text-2xl mt-10 font-semibold text-center">{t.subtitle}</h2>
    </div>
  );
}
