import { MicVocal } from "lucide-react";
import ShowPodcasts from "./(components)/show-podcasts";

export default function Content() {
    return (
        <main className="max:h-full bg-slate-200 dark:bg-slate-950">
            <div className=" text-slate-900 flex items-center justify-center gap-4 pt-10 pb-16">
                <MicVocal className="h-8 w-8" />
                <h1 className="uppercase text-center text-3xl font-bold">
                    Podcasts 
                </h1>
            </div>
            <ShowPodcasts />
        </main>
    );
}

