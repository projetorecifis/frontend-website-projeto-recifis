"use client"

import TopNews from "./top-news";
import DefaultContentNews from "./default-news";
import { useEffect, useState } from "react";
import { INewsDataResponse, INewsMetaDataResponse } from "../../../../services/interfaces/news.interface";
import { PaginationWithLinks } from "@/components/created/PaginationWithLinks";
import { useSearchParams } from "next/navigation";
import NewsServices from "@/services/news.services";

export default function AllNews() {
    const searchParams = useSearchParams();
    const page = searchParams.get('page') || "1";
    const limit = 10;
    
    const [topNews, setTopNews] = useState<INewsDataResponse[] | undefined>(undefined);
    const [defaultNews, setDefaultNews] = useState<INewsDataResponse[] | undefined>(undefined);
    const [metaData, setMetaData] = useState<INewsMetaDataResponse | undefined>(undefined);
    
    const getAllNews = async () => {
        const response = await NewsServices.getAllNews(page, limit);
        const newsResponse = response?.data?.news;
        const metaDataResponse = response?.data?.metaData;
        
        setTopNews(newsResponse?.filter((news) => news.isInTop === "true"));
        setDefaultNews(newsResponse?.filter((news) => news.isInTop === "false"));
    
        if(metaDataResponse !== undefined){
          setMetaData(metaDataResponse[0]);
        }
    
        console.log(response.message)
        if(response?.message === "No news were found"){
            setTopNews([]);
            setDefaultNews([]);
        }
    
        console.log(response);
        // setCarouselNews(allNews.filter((news) => news.type === "carousel"));
        
    }

    useEffect(() => {
        getAllNews();
    }, [])
    return (
            <section>
                <section >
                    <TopNews news={topNews} />
               
                    <DefaultContentNews defaultNews={defaultNews} />
                </section>
                <section className="py-4">
                    {metaData !== undefined && (
                        <PaginationWithLinks 
                            page={metaData.page}
                            pageSize={limit}
                            totalCount={metaData.totalDocuments}
                        />
                    )}
                </section>
            </section>
    );
}
