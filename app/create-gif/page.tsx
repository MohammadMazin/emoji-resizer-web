"use client";

export default function CreateGif() {
  return (
    <main className="overflow-hidden mt-6">
      <div className="flex flex-col min-h-[85vh] lg:flex-row md:h-[85vh] px-4 gap-4 lg:justify-center lg:items-center">
        <section className="h-[30vh] lg:h-full w-full"></section>

        <section className="h-[30vh] lg:h-full w-full flex flex-col justify-start gap-8"></section>
      </div>
    </main>
  );
}
