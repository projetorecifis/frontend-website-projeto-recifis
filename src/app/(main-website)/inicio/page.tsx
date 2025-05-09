import { Heading } from "@/components/created/Heading";
import { Paragraph } from "@/components/created/Paragraph";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function Home() {
  return (
    <div>
      <main>
        <section className={"flex flex-col justify-center items-center w-full p-4 bg-recifis-orange tabl:h-96 tabl:flex-row"}>
          <div>
            <Image
              className={"duration-300 hover:scale-110"} 
              width={300}
              height={300}
              alt={"Imagem do logo do projeto Recifis"}
              src="/img/logoRecifis.png"
            />
          </div>
          <div className={"flex flex-col items-center gap-4 p-4"}>
            {/* <Heading className={h1()} variant="h1">Projeto Recifis</Heading>
            <Heading className={h1()} variant="h2">Reprodutores de Cidadania Fiscal</Heading> */}
          </div>
          <div>
            <Image
              className={"duration-300 hover:scale-110 p-4 desk:ml-4 "}
              width={280}
              height={280}
              alt={"Imagem de desenho de amigos fazendo um círculo se abraçando"}
              src="/img/imgHug.png"
            />
          </div>
        </section>

        <section className={"flex flex-col justify-center items-center w-full pt-10 tabl:flex-row"}>
          <div className={" flex flex-col items-start gap-6 p-6 desk:p-0 desk:w-1/3"}>
            <Image
            className={"h-text-center duration-300 hover:scale-110"}
              width={460}
              height={460}
              alt={""}
              src="/img/arvorePalavras.png"
            />
          </div>
          <div className={" flex flex-col items-start gap-6 p-6 desk:p-0 desk:w-1/3"}>
            <Heading variant="h1" className={"text-recifis-blue text-4xl font-teste"}>Saiba mais sobre nosso projeto</Heading>
            <Heading variant="h1">
              <span className={"uppercase text-slate-950"}>Recifis</span>
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
            className={"w-full opacity-55 h-auto"}
            sizes="100vw"
            height={0}
            width={0}
            alt="Imagem de pessoas sorrindo"
            src="/img/peopleSmiling0.png"
          />
        </section>
      </main>

    </div>
  );
}
