import { INewsDataResponse } from "@/services/interfaces/news.interface";
import { setCookies } from "@/utils/cookies";

export async function setNewsAtCookies(news :INewsDataResponse) {
    const body = {
        title: news.title,
        subtitle: news.subtitle,
        text: news.text,
        image: news.image.path,
        publicId: news.image.publicId,
    }
    await setCookies("news", JSON.stringify(body));
    return body;
}
