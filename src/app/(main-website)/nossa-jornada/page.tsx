
import { Heading } from "@/components/created/Heading";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";

const ourStory = {
    cards: [
        [{
            number: "2023",
            title: "Setembro",
            description: "Descrição do projeto RECIFIS",
            image1: "/img/imgHug.png",
             content: `texto aqui para teste testando o texto para ver como fica 
            na pagina texto aqui para teste testando o texto para ver como fica na pagina 
            texto aqui para teste testando o texto para ver como fica na pagina texto aqui 
            para teste testando o texto para ver como fica na pagina`
        },
        {
            number: "2025",
            title: "Setembro",
            description: "O dashboard pode ser utilizado para gerenciar as informações do site do projeto RECIFIS, como as notícias, podcasts e palestras.",
            image1: "/img/imgHug.png",
            image2: "/img/imgHug.png",
             content: `texto aqui para teste testando o texto para ver como fica 
            na pagina texto aqui para teste testando o texto para ver como fica na pagina 
            texto aqui para teste testando o texto para ver como fica na pagina texto aqui 
            para teste testando o texto para ver como fica na pagina`
        },
        {
            number: 5,
            title: "Setembro",
            description: "O dashboard pode ser utilizado para gerenciar as informações do site do projeto RECIFIS, como as notícias, podcasts e palestras.",
            image1: "/img/imgHug.png",
            image2: "/img/imgHug.png",
             content: `texto aqui para teste testando o texto para ver como fica 
            na pagina texto aqui para teste testando o texto para ver como fica na pagina 
            texto aqui para teste testando o texto para ver como fica na pagina texto aqui 
            para teste testando o texto para ver como fica na pagina`
        },]
        ,
        [{
            number: "2024",
            title: "Setembro",
            description: "O dashboard pode ser utilizado para gerenciar as informações do site do projeto RECIFIS, como as notícias, podcasts e palestras.",
            image1: "/img/imgHug.png",
            image2: "/img/imgHug.png",
             content: `texto aqui para teste testando o texto para ver como fica 
            na pagina texto aqui para teste testando o texto para ver como fica na pagina 
            texto aqui para teste testando o texto para ver como fica na pagina texto aqui 
            para teste testando o texto para ver como fica na pagina`
        },
        {
            number: 4,
            title: "Setembro",
            description: "O dashboard pode ser utilizado para gerenciar as informações do site do projeto RECIFIS, como as notícias, podcasts e palestras.",
            image1: "/img/imgHug.png",
            image2: "/img/imgHug.png",
             content: `texto aqui para teste testando o texto para ver como fica 
            na pagina texto aqui para teste testando o texto para ver como fica na pagina 
            texto aqui para teste testando o texto para ver como fica na pagina texto aqui 
            para teste testando o texto para ver como fica na pagina`
        },
        {
            number: 6,
            title: "Setembro",
            description: "O dashboard pode ser utilizado para gerenciar as informações do site do projeto RECIFIS, como as notícias, podcasts e palestras.",
            image1: "/img/imgHug.png",
            image2: "/img/imgHug.png",
            content: `texto aqui para teste testando o texto para ver como fica 
            na pagina texto aqui para teste testando o texto para ver como fica na pagina 
            texto aqui para teste testando o texto para ver como fica na pagina texto aqui 
            para teste testando o texto para ver como fica na pagina`
        },],
    ]
}



export default function OurStoryPage() {
    // const newCards = ourStory.cards.filter((_, index) => index  ourStory.totalCards);
    return (
        <main className=" w-full bg-slate-100 ">
            <Heading 
                className={
                    "py-14 uppercase text-recifis-blue font-bold text-center text-2xl drop-shadow-lg shadow-black tabl:text-4xl"
                } 
                variant="h1"
            >
                ★ Um pouco sobre nós ... ★
            </Heading>
            <section className="w-full flex mb-2  justify-center items-center ">
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
                                    <Card className={`max-w-2xl rounded-b-lg  ${index % 2 === 0 && index !== 1 ? "" : "mt-4"}`} key={indexCard} >
                                        <CardHeader className="rounded-t-lg m-0 bg-recifis-blue text-white flex flex-row items-center gap-4 p-4">
                                            <CardTitle className="bg-blue-950 text-recifis-orange h-14 rounded-xl opacity-90 p-4">{item.title}</CardTitle>
                                            <CardDescription className="text-white font-mono text-xl">{item.description}</CardDescription>
                                        </CardHeader>
                                        <CardContent className="pt-4">
                                            <p>{item.content} {index}</p>
                                            <div className="flex items-center justify-between w-full">
                                                {item?.image1 && (
                                                    <Image
                                                    src={item?.image1}
                                                    width={200}
                                                    height={200}
                                                    alt="Imagem do projeto RECIFIS"
                                                    className="rounded-lg mt-4 m-auto"
                                                />
                                                )}
                                                {item?.image2 && (
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
