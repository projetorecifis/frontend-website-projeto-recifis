
import Image from "next/image";
import { tv } from "tailwind-variants";

const homePageStyles = tv({
    slots: {
        mainSection: "bg-recifis-light-blue w-full flex flex-col desk:flex-row maxl:h-full",
    },
})

const { mainSection } = homePageStyles()

export default function KnowMore() {
    return (
        <main className="maxl:h-full">
            <section className={mainSection()}>
                <section className="bg-recifis-light-blue flex flex-col items-center justify-between desk:w-1/3 maxl:justify-center">
                    <div className="bg-recifis-greenLight px-16 border-2 border-black rounded-b-full pb-10 text-center flex flex-col items-center justify-center">
                        <Image
                            src="/img/quem-somos/recifis.png"
                            width={350}
                            height={300}
                            alt="Imagem da palavra RECIFIS mostrando cada letra como se fossem recotes de revista"
                            className="py-4"
                            // className={img()} 
                        />
                        <h1 className="py-2 font-bold">Reprodutores de Cidadania Fiscal</h1>
                        <p className="py-2 w-2/3 text-sm">• Grupo de Ensino, Pesquisa e Extensão em Educação Fiscal •</p>
                    </div>
                    <h1 className="font-bold py-4 text-center text-3xl">Quem somos?</h1>
                    <div className="relative inline-block">
                        <Image
                            src="/img/quem-somos/tela.png"
                            width={390}
                            height={390}
                            alt="Imagem da palavra RECIFIS mostrando cada letra como se fossem recotes de revista"
                        />
                        <p className="absolute top-10 indent-8 leading-6 text-justify text-sm px-4 tabl:text-base"> 
                            O RECIFIS - Reprodutores de Cidadania Fiscal, é um grupo que pretende desenvolver 
                            atividades com o intuito de promover a construção da cidadania fiscal, este projeto
                             se dedica a estabelecer um espaço de formação e um ponto de criação e desenvolvimento 
                             de estratégias de educação fiscal para toda a comunidade. 
                        </p>
                    </div>
                    <Image
                        src="/img/quem-somos/maos-forte-para-cima.png"
                        width={200}
                        height={200}
                        alt="Imagem da palavra RECIFIS mostrando cada letra como se fossem recotes de revista"
                        className="pt-2"
                    />
                </section>
                <section className="bg-recifis-salmonLight flex flex-col items-center desk:relative desk:w-1/3 maxl:justify-evenly">
                    <div className="bg-recifis-orangeLight  pb-20 flex flex-col items-center justify-center border-2 border-black rounded-b-full maxl:w-11/12 maxl:rounded-full">
                        <p className="text-justify px-12 pt-8 leading-5 phonlg:w-1/2 desk:w-full max:w-3/5">
                            Nos interessamos tanto pela formação dos reprodutores desta cidadania fiscal, ou seja, 
                            estudantes que terão acesso a ensino direcionado e desenvolverão pesquisas sobre o assunto,
                            quanto pela reprodução externa destes saberes.
                        </p>
                         <Image
                            src="/img/quem-somos/circulo.png"
                            width={40}
                            height={40}
                            alt=""
                            className={"py-4"} 
                        />
                        <h1 className="font-bold text-xl w-1/2 text-center pb-4">O projeto RECIFIS objetiva desenvolver:</h1>
                        <ul className="list-disc">
                            <li>Palestras em escolas;</li>
                            <li>Rodas de conversas;</li>
                            <li>Vídeos e podcasts;</li>
                            <li>Peças teatrais;</li>
                            <li>Jogos e plataformas digitais.</li>
                        </ul>
                    </div>
                    <div className="left-8 top-144 self-start px-4 tabl:ml-32 desk:absolute desk:ml-0 desk:px-0 maxl:top-200">
                        <Image
                            src="/img/quem-somos/computador.png"
                            width={150}
                            height={150}
                            alt=""
                            className={"pb-8 tabl:pb-0 "} 
                        />
                    </div>
                    <Image
                        src="/img/quem-somos/pessoas-sentadas.png"
                        width={250}
                        height={250}
                        alt=""
                        className={"pb-8 right-0 top-144 self-end px-2 tabl:mr-32 desk:mr-0 desk:px-0 desk:absolute maxl:p-2 maxl:top-200"} 
                    />
                </section >
                <section className="bg-recifis-light-blue flex flex-col items-center justify-between desk:w-1/3 maxl:justify-evenly ">
                    <div className="px-8 pb-16 bg-recifis-greenLight border-2 border-black rounded-b-full text-center flex flex-col items-center justify-center maxl:rounded-full">
                        <Image
                            src="/img/quem-somos/nosso-intuito.png"
                            width={250}
                            height={250}
                            alt=""
                            className="py-4"
                        />
                        <p className="text-justify w-4/5 indent-8 leading-5 px-10 phonlg:w-1/2 tabl:text-center tabl:px-16 desk:text-justify desk:w-4/5"> 
                            Contribuir para a produção e reprodução de educação fiscal de qualidade, 
                            promovendo a compreensão da lógica fiscal estabelecida e a formação de uma 
                            perspectiva crítica sobre a pauta, podendo assim, abrir caminhos para a formação 
                            de uma geração de novos reprodutores de cidadania fiscal.
                        </p>
                    </div>
                    <div className="mt-2 pt-16 bg-recifis-orangeLight self-end flex flex-col items-center justify-center border-2 border-black rounded-t-full maxl:pt-8 maxl:rounded-full ">
                        <p className="text-justify w-3/5 px-16 leading-5 phonlg:w-1/2 tabl:px-24 desk:w-10/12">
                            Proporcionando através da promoção de cidadania fiscal, a formação de uma sociedade 
                            mais consciente das possibilidades de melhoria social, que pode ocorrer através de um
                            uso sensível a demandas de minorias no sistema tributário nacional.
                        </p>  
                        <Image
                            src="/img/quem-somos/maos-unidas.png"
                            width={125}
                            height={125}
                            alt=""
                            className="py-4"
                        />
                    </div>
                </section>
                   
                {/* <Image
                    src="/img/aboutRecifis.png"
                    width={1920}
                    height={1080}
                    alt={
                        "Quem somos? RECIFIS - Reprodutores de Cidadania Fiscal, é um grupo que pretende desenvolver atividades com o intuito de promover a construção da cidadania fiscal."
                    }
                    className={img()} 
                /> */}
            </section>
        </main>
    );
}
