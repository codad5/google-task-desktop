import Hero from '@/components/ui/hero';
import Features from '@/components/ui/features';
import TechStack from '@/components/ui/techstack';
import Footer from '@/components/ui/footer';

export default function Home() {
  return (
    <main className="flex flex-col pt-16">
      <Hero />
      <Features />
      <TechStack />
      <Footer />
    </main>
  );
}
