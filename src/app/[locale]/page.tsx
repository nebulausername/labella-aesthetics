import { Hero } from '@/components/marketing/hero';
import { TrustBar } from '@/components/marketing/trust-bar';
import { Services } from '@/components/marketing/services';
import { AboutTeaser } from '@/components/marketing/about-teaser';
import { Testimonials } from '@/components/marketing/testimonials';
import { BookingCta } from '@/components/marketing/booking-cta';
import { Faq } from '@/components/marketing/faq';

export default function HomePage() {
  return (
    <>
      <Hero />
      <TrustBar />
      <Services />
      <AboutTeaser />
      <Testimonials />
      <BookingCta />
      <Faq />
    </>
  );
}
