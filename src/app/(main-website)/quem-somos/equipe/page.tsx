import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";

export default function KnowMorePage() {
    return (
        <main className="w-full maxl:h-full my-8">
          <section className="max-w-296 mt-0 m-auto">
            <div className="text-center space-y-4 my-8">
                <h1 className="text-recifis-blue text-5xl font-bold">Equipe</h1>
                <p className="text-lg opacity-65">Conheça toda a equipe que engloba o projeto RECIFIS</p>
            </div>
            <Card className="my-2">
                <CardContent>
                <h1 className="font-bold text-3xl my-6">Professora responsável</h1>
                <Separator className="mb-8" />
                <div className="flex flex-col justify-evenly gap-8 phonlg:flex-row">
                    <Image 
                        src={"/img/quem-somos/equipe/professora-maria-angelica.png"} 
                        alt={""}  
                        width={70}  
                        height={70}   
                        className="w-36 h-36 rounded-full object-cover mt-0 m-auto phonlg:m-2"            
                    />
                    <div className="w-full">
                        <div className="w-full space-y-2">
                            <h2 className="text-xl font-bold">Maria Angélica dos Santos</h2>
                            <p className="text-lg font-bold opacity-75 pb-2">Doutora em Direito pela UFMG</p>
                        </div>
                        <p> Professora Adjunta de Direito da UFV/Florestal </p>
                        <p>Pesquisadora de questões envolvendo ensino jurídico, tributação, gênero, classe e raça</p>
                        <p>Escritora e mãe</p>
                        <p>Autora dos livros:</p>
                        <ul>
                            <li>• O lado negro do empreendedorismo - afroempreendedorismo e black monetária</li>
                            <li>• E eu não sou uma jurista? Reflexões de uma jurista negra sobre direito, ensino jurídico e sistema de justiça.</li>
                            <li>• Tributação e Raça </li>
                            <li>• Aláfia. Caminhos Abertos</li>
                        </ul>
                        <div className="flex flex-col gap-2 phonlg:flex-row">
                            <div className="flex gap-2">
                                <Image 
                                    src={"/img/quem-somos/equipe/livro-1.png"} 
                                    alt={""}  
                                    width={70}  
                                    height={70}   
                                    className="w-36 h-36 object-cover"            
                                />
                                <Image 
                                    src={"/img/quem-somos/equipe/livro-2.png"} 
                                    alt={""}  
                                    width={70}  
                                    height={70}   
                                    className="w-36 h-36 object-cover"            
                                />
                            </div>
                            <div className="flex gap-2">
                                <Image 
                                    src={"/img/quem-somos/equipe/livro-3.png"} 
                                    alt={""}  
                                    width={70}  
                                    height={70}   
                                    className="w-36 h-36 object-cover"            
                                />
                                <Image 
                                    src={"/img/quem-somos/equipe/livro-4.png"} 
                                    alt={""}  
                                    width={70}  
                                    height={70}   
                                    className="w-36 h-36 "            
                                />
                            </div>
                        </div>
                        {/* <Instagram /> */}
                    </div>
                </div>
                </CardContent>
            </Card>
            <Card className="my-2">
                <CardContent>
                    <h1 className="font-bold text-3xl my-6">Alunos</h1>
                    <Separator className="mb-8" />
                    <div className="flex justify-evenly gap-8 flex-col phonlg:flex-row">
                        <Image 
                            src={"/img/quem-somos/equipe/aluna-tassia.png"} 
                            alt={""}  
                            width={70}  
                            height={70}   
                            className="w-36 h-36 rounded-full object-cover mt-0 m-auto phonlg:m-2"            
                        />
                        <div className="w-full space-y-2">
                            <h2 className="text-xl font-bold">Tássia Martins Almeida Gomes</h2>
                            <p className="text-lg font-bold opacity-75">Graduanda - Ciência da Computação pela UFV</p>
                            <p className="">
                                Responsável pelo desenvolvimento do site do projeto RECIFIS.
                                Atualmente, trabalha como Consultora e Desenvolvedora Júnior na Via Consulting, além disso, 
                                fez parte da liderança do FullStackMinas centrado no estudo de tecnologias de mercado e, 
                                também, em 2023, foi ganhadora do 
                                programa Campus Mobile na categoria “Games” com o jogo “Emily Is Afterlife”
                            </p>
                            <div>

                            </div>
                        </div>
                    </div>
                    <Separator className="my-8" />
                    <div className="flex justify-evenly gap-8 flex-col phonlg:flex-row">
                        <Image 
                            src={"/img/quem-somos/equipe/isabela-aluna-bolsista.jpg"} 
                            alt={""}  
                            width={70}  
                            height={70}   
                            className="w-36 h-36 rounded-full object-cover mt-0 m-auto phonlg:m-2"            
                        />
                        <div className="w-full space-y-2">
                            <h2 className="text-xl font-bold">Isabela Alves Franco</h2>
                            <p className="text-lg font-bold opacity-75">Ensino médio - Universidade Federal de Viçosa (UFV) Campus Florestal</p>
                            <p className="">
                            Isabela Alves Franco é bolsista de iniciação científica da Fundação de Amparo à Pesquisa do Estado de Minas Gerais
                            (FAPEMIG), vinculada à Secretaria de Estado de Ciência, Tecnologia e Ensino Superior. 
                            É estudante do ensino médio e técnico na Universidade Federal de Viçosa (UFV) campus Florestal 
                            e possui grande interesse ao campo de estudos fiscais e sociais e econômicos.
                            </p>
                            <div>

                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>
          </section>
        </main>
    );
}
