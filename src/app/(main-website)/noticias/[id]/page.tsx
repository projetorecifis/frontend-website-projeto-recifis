"use client"
import Image from "next/image";
import { useEffect, useState } from "react";
import { INewsDataResponse } from "@/services/interfaces/news.interface";

export default function SeeOneNewsPage() {
    const [news, setNews] = useState<INewsDataResponse | undefined>(undefined);
    const getNews = () => {
        const news = localStorage.getItem("news") || undefined;
        const newsParsed = news !== undefined ? JSON.parse(news) as INewsDataResponse : undefined;

        setNews(newsParsed);
    }
    useEffect(() => {
        getNews();
    }, [])
    return (
        <main className="bg-recifis-salmonLight">
            <section className="max-w-200 mt-0 m-auto pt-12 font-bold px-8 phonlg:w-160 tabl:px-0">
                <div className="text-justify ">
                    <h1 className={"text-4xl"} >{news?.title}</h1>
                    <h2 className={"text-sm opacity-40 py-4"}>{news?.subtitle}</h2>
                    <p className="opacity-60">{news?.createdAt.replace(/T.*/,'').split('-').reverse().join('/')}</p>
                </div>
                {news?.image !== undefined && (
                    <Image 
                        src={news?.image.path}
                        width={320}
                        height={320}
                        alt="Imagem da notícia"
                        className="w-full h-auto opacity-90 rounded-lg"
                    />
                )}
                <p className="py-8 text-justify font-normal break-words">{news?.text}</p>
            </section>
        </main>

    );
    }
