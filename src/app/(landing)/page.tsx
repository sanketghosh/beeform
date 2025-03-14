import Header from "@/app/(landing)/_components/header";
import Hero from "@/app/(landing)/_components/hero";
import Specialty from "./_components/specialty";
import Pricing from "./_components/pricing";
import Testimonials from "./_components/testimonials";
import Footer from "./_components/footer";

export default function Preview() {
  return (
    <main>
      <Header />
      <Hero />
      <Specialty />
      <Testimonials />
      <Pricing />
      <Footer />
    </main>
  );
}
