
import { Heading } from "@/components/created/Heading";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";

const leftCards =  [
    {
        number: "2023",
        title: "Maio",
        description: "Surgimento do projeto RECIFIS ",
        image1: "/img/initial-projeto-recifis.png",
        image2: undefined,
        content: `O projeto contempla atividades de ensino, pesquisa e extensão
        e pretende desenvolver atividades que vão desde a apresentação de palestras
        em escolas públicas da região, produção de podcasts, desenvolvimento de plataformas
        digitais, desenvolvimento de jogos digitais, produção de peças teatrais e cartilhas educativas`
    }
]

const rightCards = [
    {
        number: "2025",
        title: "Maio",
        description: "Publicação da primeira plataforma digital",
        image1: "/img/computador.jpg",
        image2: undefined,
        content: `Nosso website é a primeira plataforma digital do projeto RECIFIS. 
        Aqui, serão publicados todos os materiais públicos e acessíveis do projeto, criados
        pelos alunos e pela professora Maria Angélica dos Santos`
    }
]

const ourStory = {
    cards: [
        leftCards,
        rightCards
    ]
}



export default function OurStoryPage() {
    // const newCards = ourStory.cards.filter((_, index) => index  ourStory.totalCards);
    return (
        <main className=" w-full bg-slate-100 p-14">
            <Heading 
                className={
                    "pb-14 uppercase text-recifis-blue font-bold text-center text-2xl drop-shadow-lg shadow-black tabl:text-4xl"
                } 
                variant="h1"
            >
                ★ Um pouco sobre nós ... ★
            </Heading>
            <section className="w-full flex flex-col mb-2 justify-center items-center desk:flex-row">
                {ourStory?.cards.map((card, index) => (
                    <div key={index} className={`mt-8 mx-0 m-auto ${index % 2 === 0 ? "" : "mt-40"} `}> 
                        <div  className="px-2 space-y-28 mt-0 m-auto  ">     
                            {card.map((item, indexCard) => (     
                                <div key={indexCard} className="flex flex-row-reverse">
                                    {index % 2 === 0 && (
                                        <div className="h-8 mt-2 flex text-center justify-center items-center"> 
                                            {/* <ChevronsRight className="text-black opacity-25 ml-2 w-10 h-10" />  */}
                                            <div className="border-t-4 border-slate-300 w-24"> </div>
                                            <p className={`
                                                w-24 h-24 text-white rounded-full border-2 
                                                bg-recifis-orange flex justify-center items-center font-sans font-bold text-2xl`
                                            }>
                                                {item.number}
                                            </p>
                                        </div>
                                    )} 
                                    <Card className={`max-w-2xl rounded-b-lg dark:bg-zinc-100 dark:border-zinc-200 dark:text-black ${index % 2 === 0 && index !== 1 ? "" : "mt-4"}`} key={indexCard} >
                                        <CardHeader className="rounded-t-lg m-0 bg-recifis-blue text-white flex flex-row items-center gap-4 p-4">
                                            <CardTitle className="bg-blue-950 font-mono uppercase text-recifis-orange h-14 rounded-xl opacity-90 p-4">{item.title}</CardTitle>
                                            <CardDescription className="text-white font-black-marker text-2xl">{item.description}</CardDescription>
                                        </CardHeader>
                                        <CardContent className="pt-4">
                                            <p>{item.content}</p>
                                            <div className="flex flex-col items-center justify-between w-full phonlg:flex-row">
                                                {item?.image1 && (
                                                    <Image
                                                    src={item?.image1}
                                                    width={220}
                                                    height={220}
                                                    alt="Imagem do projeto RECIFIS"
                                                    className="rounded-lg mt-4 m-auto"
                                                />
                                                )}
                                                {item?.image2 !== undefined && item?.image2 && (
                                                    <Image
                                                    src={item?.image2}
                                                    width={200}
                                                    height={200}
                                                    alt="Imagem do projeto RECIFIS"
                                                    className="rounded-lg mt-4 m-auto"
                                                />
                                                )}
                                            </div>
                                        </CardContent>
                                    </Card> 
                                    {index % 2 !== 0 && (
                                            <div className="h-8 flex flex-row-reverse text-center justify-center items-center mt-24 mr-2"> 
                                            {/* <ChevronsLeft className="text-black opacity-25 ml-2 w-10 h-10" />  */}
                                            <div className="border-t-4 border-slate-300 w-24"> </div>
                                            <p 
                                                className={
                                                    `w-24 h-24 text-white rounded-full border-2 bg-recifis-orange flex 
                                                    justify-center items-center font-sans font-bold text-2xl`
                                                }>
                                                {item.number}
                                            </p>
                                        </div>
                                    )} 
                                </div>    
                            ))}
                        </div>
                    </div>
                ))}
            </section>
            {/* <section className="w-full bg-zinc-950 flex ">
                <div className="p-8">
                    <Card>
                        <CardHeader>
                            <CardTitle>Página inicial do dashboard</CardTitle>
                            <CardDescription>
                            O dashboard pode ser utilizado para gerenciar as informações do site do projeto RECIFIS, como as notícias, podcasts e palestras.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <p>texto aqui para teste testando o texto para ver como fica na pagina</p>
                        </CardContent>
                    </Card>
                </div>
                <div className=" mt-10 border-l-2 max: border-recifis-blue">
                    
                </div>
                <div className="p-8">
                    <Card>
                        <CardHeader>
                            <CardTitle>Página inicial do dashboard</CardTitle>
                            <CardDescription>
                            O dashboard pode ser utilizado para gerenciar as informações do site do projeto RECIFIS, como as notícias, podcasts e palestras.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <p>texto aqui para teste testando o texto para ver como fica na pagina</p>
                        </CardContent>
                    </Card>
                </div>
            </section> */}
        </main>
    );
}
