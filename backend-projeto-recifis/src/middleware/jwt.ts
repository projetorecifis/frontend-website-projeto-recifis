import jwt from 'jsonwebtoken'

class JWT{
    private tokenKEY = process.env.JWT_KEY

    public generateToken(data: any){
        const token = jwt.sign({
            name: data.name,
            email: data.email,
            id: data._id
            },"JWT_KEY-SECRET-KEY-07022002",{
            expiresIn: "1800000" // 30 minutos
        })

        return token
    }
}

export default new JWT()