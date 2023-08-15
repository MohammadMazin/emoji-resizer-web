import Options from "@/components/ui/Options";
import Preview from "@/components/ui/Preview";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <main>
      <div className="flex h-[95vh]">
        <Preview />
        <Options />
      </div>
    </main>
  );
}
