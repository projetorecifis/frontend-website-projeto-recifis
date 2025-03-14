//Importaremos para realizar o Upload
import multer from "multer"; 

//Ajudará no caminho para guardar nossa imagem
import path from "path"; 

//Criara nossa pasta para armazenar nossos arquivos caso não exista
import fs from "fs";
import mime from "mime";

const MAX_MEGABYTES = 1;

class UploadAvatar {
    //Pasta para onde será feito o Upload
    private URL: string = path.basename('upload'); 

    constructor() {}

    //Methodo onde armazenaremos nossos arquivos
    private storage(): multer.StorageEngine {
        return multer.diskStorage({
            destination: (req, file, cb) => {
                const uploadPath = path.resolve(__dirname, '..', '..', this.URL);
                if (!fs.existsSync(uploadPath)) {
                    fs.mkdirSync(uploadPath, { recursive: true });
                }
                cb(null, uploadPath);
            },
            filename: (req, file, cb) => {
                const fileName = `${Date.now()}-${file.originalname}`;
                cb(null, fileName);
            },
        });
    }

    private fileFilter() {
        /*
          Essa configuração vai nos ajudar com 
          1 - A validação do arquivo
        */
        return (
          req: Request,
          file: Express.Multer.File,
          cb: multer.FileFilterCallback
        ) => {
          //Utilizaremos a Lib mime-types para identificar o tipo do arquivo
          const type = mime.extension(file.mimetype);
    
          /* 
            Este array será montado a conditions de validação
            No caso aceitará apenas imagens como "png", "jpg", "jpeg"
          */
          const conditions = ["png", "jpg", "jpeg"];
    
          //Perguntamos se existe algum desses valores no type
          if (conditions.includes(`${type}`)) {
            //Caso exista, teremos nossa imagem linda maravilhosa
            cb(null, true);
          }
    
          //Caso não de certo a validação não efetuaremos o upload
          cb(null, false);
        };
    }

       //Configuração que usaremos em nossas rotas como Middleware
       get getConfig(): any {
        /*
          Essa configuração vai nos ajudar com 
          1 - A compor as configs do Multer como Middleware em nossas rotas
          2 - Não será um middleware global e sim para usos unicos e comportamentais
        */
        return {
          //Storage serve para compor a config do multer destination e filename
          storage: this.storage(),
          //FileFilter serve para validar o filtro de arquivos
          fileFilter: this.fileFilter(),
          limits: { fileSize: 1024 * 1024 * MAX_MEGABYTES},
        };
      }
            
    }


export const uploadAvatar = new UploadAvatar();