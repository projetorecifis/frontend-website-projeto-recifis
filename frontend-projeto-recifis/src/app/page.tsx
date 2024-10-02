import { Heading } from "@/components/ui/Heading";
import { Paragraph } from "@/components/ui/Paragraph";
import { Button } from "@/components/ui/button";
import { tv } from "tailwind-variants";

const homePageStyles = tv({
  slots: {
    sectionRecifisProject: "flex flex-col justify-center items-center w-full p-4 bg-recifis-orange tabl:h-96 tabl:flex-row",
    imgRecifis: "h-52 w-64 tabl:w-64 tabl:h-52 desk:w-96 desk:h-80",
    imgHug: "w-60 p-4 ml-0 tabl:w-64 desk:w-80 desk:h-80 desk:ml-8",
    imgTreeWords: "h-64 text-center m-auto desk:h-80",
    h1KnowMoreAboutOurProject: "text-recifis-blue text-4xl",
    divRecifisProject: "flex flex-col items-center gap-4 p-4",
    h1: "uppercase text-white text-center text-2xl tabl:text-3xl",
    sectionKnowMoreAboutOurProject: "flex flex-col justify-center items-center w-full pt-10 tabl:flex-row",
    h1Recifis: "uppercase text-slate-950",
    divKnowMoreAboutOurProject: " flex flex-col items-start gap-6 p-6 desk:p-0 desk:w-1/3",
  },
})

const {
  sectionRecifisProject, imgRecifis, imgHug, imgTreeWords, h1KnowMoreAboutOurProject, h1, divRecifisProject, sectionKnowMoreAboutOurProject,
  h1Recifis, divKnowMoreAboutOurProject
} = homePageStyles()

export default function Home() {
  return (
    <div>

      <main>

        <section className={sectionRecifisProject()}>
          <div>
            <img className={imgRecifis()} src="/img/logoRecifis.png" />
          </div>
          <div className={divRecifisProject()}>
            <Heading className={h1()} variant="h1">Projeto Recifis</Heading>
            <Heading className={h1()} variant="h2">Reprodutores de Cidadania Fiscal</Heading>
          </div>
          <div>
            <img className={imgHug()} src="/img/imgHug.png" />
          </div>
        </section>

        <section className={sectionKnowMoreAboutOurProject()}>
          <div className={divKnowMoreAboutOurProject()}>
            <img className={imgTreeWords()} src="/img/arvorePalavras.png" />
          </div>
          <div className={divKnowMoreAboutOurProject()}>
            <Heading variant="h1" className={h1KnowMoreAboutOurProject()}>Saiba mais sobre nosso projeto</Heading>
            <Heading variant="h1">
              <span className={h1Recifis()}>Recifis</span>
              {" "} - Reprodutores de Cidadania Fiscal
            </Heading>
            <Paragraph>
              Conheça o projeto que abrange os três pilares
              da Universidade, contemplando, portanto, ensino, pesquisa e extensão.
            </Paragraph>
            <Button className="bg-recifis-blue hover:bg-recifis-orange font-bold uppercase">
              <a href="/quem-somos">Saiba mais</a>
            </Button>
          </div>
        </section>

        <section>
          <img className="w-full opacity-55" src="/img/peopleSmiling0.png" />
        </section>
      </main>

    </div>
  );
}
