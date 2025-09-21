import { Container } from '~/components/ui/container';

export const PartnerHero = () => {
	return (
		<>
			<section className="bg-primary text-primary-foreground relative top-0 right-0 left-0 isolate z-30">
				{/* Subtle decorative tints */}
				<div className="pointer-events-none absolute inset-0 bg-[radial-gradient(65%_50%_at_0%_0%,rgba(255,255,255,0.08),transparent),radial-gradient(45%_35%_at_100%_20%,rgba(255,255,255,0.08),transparent)]" />

				<Container className="relative py-20 md:py-28 lg:py-36">
					<div className="max-w-4xl">
						<h1 className="text-4xl leading-[0.95] font-extrabold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
							<span className="block">List your</span>
							<span className="text-secondary-light block">property</span>
							<span className="text-secondary-light block">on Tixia Partners</span>
						</h1>

						{/* Optional subcopy - enable if needed */}
						{/* <p className="mt-6 max-w-2xl text-base md:text-lg text-primary-foreground/85">
            List on one of the world’s most downloaded travel platforms to earn more, faster, and expand into new markets.
          </p> */}

						<div className="mt-12 md:mt-16">
							<div className="border-primary-foreground/20 inline-flex items-center rounded-xl border px-6 py-4 shadow-lg backdrop-blur">
								<span className="text-3xl font-black tracking-wide uppercase sm:text-4xl md:text-5xl lg:text-6xl">
									Coming Soon
								</span>
							</div>
						</div>
					</div>
				</Container>
			</section>
		</>
	);
};
