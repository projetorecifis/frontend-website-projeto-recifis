
import Image from "next/image";
import { tv } from "tailwind-variants";

const homePageStyles = tv({
    slots: {
        section: "bg-recifis-light-blue",
        img: " w-full desk:py-8 desk:px-80 "
    },
})

const { section, img } = homePageStyles()

export default function KnowMore() {
    return (
        <main>
            <section className={section()}>
                <Image
                    src="/img/aboutRecifis.png"
                    width={1920}
                    height={1080}
                    alt={
                        "Quem somos? RECIFIS - Reprodutores de Cidadania Fiscal, é um grupo que pretende desenvolver atividades com o intuito de promover a construção da cidadania fiscal."
                    }
                    className={img()} 
                />
            </section>
        </main>
    );
}
