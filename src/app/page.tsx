import { Heading } from "@/components/created/Heading";
import { Paragraph } from "@/components/created/Paragraph";
import { Button } from "@/components/ui/button";
import { tv } from "tailwind-variants";
import Image from "next/image";
import { Header } from "@/components/created/Header";
import { Footer } from "@/components/created/Footer";

const homePageStyles = tv({
  slots: {
    sectionRecifisProject: "flex flex-col justify-center items-center w-full p-4 bg-recifis-orange tabl:h-96 tabl:flex-row",
    imgRecifis: " duration-300 hover:scale-110",
    imgHug: "duration-300 hover:scale-110 p-4 desk:ml-4 ",
    imgTreeWords: "h-text-center duration-300 hover:scale-110",
    imgPeopleSmiling: "w-full opacity-55 h-auto",
    h1KnowMoreAboutOurProject: "text-recifis-blue text-3xl",
    divRecifisProject: "flex flex-col items-center gap-4 p-4",
    h1: "uppercase text-white font-bold text-center text-2xl drop-shadow-lg shadow-black tabl:text-3xl desk:text-4xl",
    sectionKnowMoreAboutOurProject: "flex flex-col justify-center items-center w-full pt-10 tabl:flex-row",
    h1Recifis: "uppercase text-slate-950",
    divKnowMoreAboutOurProject: " flex flex-col items-start gap-6 p-6 desk:p-0 desk:w-1/3",

  },
})

const {
  sectionRecifisProject, imgRecifis, imgHug, imgTreeWords, imgPeopleSmiling, h1KnowMoreAboutOurProject, h1, divRecifisProject, sectionKnowMoreAboutOurProject,
  h1Recifis, divKnowMoreAboutOurProject
} = homePageStyles()

export default function Home() {
  return (
    <div>
    <Header />
      <main>
        <section className={sectionRecifisProject()}>
          <div>
            <Image
              className={imgRecifis()} 
              width={300}
              height={300}
              alt={"Imagem do logo do projeto Recifis"}
              src="/img/logoRecifis.png"
            />
          </div>
          <div className={divRecifisProject()}>
            <Heading className={h1()} variant="h1">Projeto Recifis</Heading>
            <Heading className={h1()} variant="h2">Reprodutores de Cidadania Fiscal</Heading>
          </div>
          <div>
            <Image
              className={imgHug()}
              width={280}
              height={280}
              alt={"Imagem de desenho de amigos fazendo um círculo se abraçando"}
              src="/img/imgHug.png"
            />
          </div>
        </section>

        <section className={sectionKnowMoreAboutOurProject()}>
          <div className={divKnowMoreAboutOurProject()}>
            <Image
            className={imgTreeWords()}
              width={460}
              height={460}
              alt={""}
              src="/img/arvorePalavras.png"
            />
          </div>
          <div className={divKnowMoreAboutOurProject()}>
            <Heading variant="h1" className={h1KnowMoreAboutOurProject()}>Saiba mais sobre nosso projeto</Heading>
            <Heading variant="h1" >
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
          <Image
            className={imgPeopleSmiling()}
            sizes="100vw"
            height={0}
            width={0}
            alt="Imagem de pessoas sorrindo"
            src="/img/peopleSmiling0.png"
          />
        </section>
      </main>
    <Footer />
    </div>
  );
}
