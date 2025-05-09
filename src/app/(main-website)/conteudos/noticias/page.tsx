import { Heading } from "@/components/created/Heading";
import { tv } from "tailwind-variants";
import AllNews from "./(components)/all-news";
import { Suspense } from "react";

const homePageStyles = tv({
  slots: {
    sectionRecifisProject: "flex flex-col justify-center items-center w-full p-4 tabl:flex-row",
    imgRecifis: " duration-300 hover:scale-110",
    imgHug: "duration-300 hover:scale-110 p-4 desk:ml-4 ",
    imgTreeWords: "h-text-center duration-300 hover:scale-110",
    imgPeopleSmiling: "w-full opacity-55 h-auto",
    h1KnowMoreAboutOurProject: "text-recifis-blue text-4xl",
    divRecifisProject: "flex flex-col items-center gap-4 p-4",
    h1: "uppercase text-recifis-blue font-bold text-center text-2xl drop-shadow-lg shadow-black tabl:text-4xl",
    sectionKnowMoreAboutOurProject: "flex flex-col justify-center items-center w-full pt-10 tabl:flex-row",
    h1Recifis: "uppercase text-slate-950",
    divKnowMoreAboutOurProject: " flex flex-col items-start gap-6 p-6 desk:p-0 desk:w-1/3",

  },
})


const {
  sectionRecifisProject, h1, divRecifisProject
} = homePageStyles()


export default function NewsPage() {

  return (
      <main className="bg-recifis-salmonLight">
        <section className={sectionRecifisProject()}>
          <div className={divRecifisProject()}>
            <Heading className={h1()} variant="h1">★ Notícias ★</Heading>
          </div>
        </section>
        <Suspense>
          <AllNews />
        </Suspense>
      </main>

  );
}
