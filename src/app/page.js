import Hero from "@/components/layout/Hero";
import HomeMenu from "@/components/layout/HomeMenu";
import SectionHeader from "@/components/layout/SectionHeaders";

export default function Home() {
  return (
    <>
      <Hero/>
      <HomeMenu/>
      <section className="text-center my-16">
        <SectionHeader
          subHeader={'Our Story'}
          mainHeader={'About Us'}/>
        <div className="text-gray-500 max-w-md-auto mt-4 flex-col gap-4">
          <p>
            Officia sint ad dolore et in irure eiusmod laborum deserunt consequat. Aliquip officia voluptate anim do aliquip deserunt. Minim ullamco in ex cillum est nulla reprehenderit fugiat laboris nulla. Sint non laborum in ex dolor consequat deserunt labore do fugiat. Minim irure officia anim voluptate irure qui mollit sint dolor enim commodo ad ipsum commodo.
          </p>
          <p>
            Officia sint ad dolore et in irure eiusmod laborum deserunt consequat. Aliquip officia voluptate anim do aliquip deserunt. Minim ullamco in ex cillum est nulla reprehenderit fugiat laboris nulla. Sint non laborum in ex dolor consequat deserunt labore do fugiat. Minim irure officia anim voluptate irure qui mollit sint dolor enim commodo ad ipsum commodo.
          </p>
        </div>
      </section>
      <section className="text-center my-8">
        <SectionHeader
          subHeader={'Don\'t Hesitate'}
          mainHeader={'Contact us'}
        />
        <div className="text-4xl mt-8">
        <a className="underline text-gray-500 hover:text-blue-500" href="tel:+234 8165 877 870">
          +234 8165 877 870
        </a>
        </div>
      </section>
        </>
  );
}
