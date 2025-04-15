import { MicVocal } from "lucide-react";
import ShowPodcasts from "./(components)/show-podcasts";
import { Separator } from "@/components/ui/separator";

export default function Content() {
    return (
        <main className="max:h-full bg-white dark:bg-slate-950 pb-8 tabl:pb-20">
            <div className=" text-slate-900 flex items-center justify-center gap-4 pt-6 dark:text-slate-100">
                <MicVocal className="h-8 w-8" />
                <h1 className="uppercase text-center text-3xl font-bold ">
                    Podcasts 
                </h1>
            </div>
            <Separator className="my-6 tabl:mb-12 dark:mb-16" />

            <ShowPodcasts />
        </main>
    );
}

