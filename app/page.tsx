import Preview from "@/components/ui/Preview";
import OnboardingModal from "@/components/OnboardingModal";
import PlatformTabs from "@/components/PlatformTabs";

export default function Home() {
  return (
    <main className="overflow-hidden">
      <OnboardingModal />
      <div className="flex flex-col min-h-[85vh] lg:flex-row lg:h-[85vh] px-4 gap-4 lg:justify-center lg:items-center">
        <section className="lg:h-full w-full lg:flex-1">
          <Preview />
        </section>

        <section className="lg:h-full w-[100%] lg:w-[50%] lg:flex-1">
          <PlatformTabs />
        </section>
      </div>
    </main>
  );
}
