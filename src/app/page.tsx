import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen text-center bg-hero-background">
      <h1 className="text-5xl font-semibold text-center pt-20">
        Level up with 100xDev and Get a Job
      </h1>

      <p className="text-center mt-8 max-w-md mx-auto">
        100xDev is a platform where you can showcase yourself in front of open
        source community.
      </p>

      <Button className="mt-10">
        <Link href="/register">Get Started</Link>
      </Button>
    </main>
  );
}
