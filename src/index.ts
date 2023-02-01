import express, { Request, Response } from 'express'
import cors from 'cors'
import { TVideoDB } from './types'
import { Video } from './models/Video'
import { VideoDatabase } from './database/VideoDatabase'

const app = express()

app.use(cors())
app.use(express.json())

app.listen(3003, () => {
    console.log(`Servidor rodando na porta ${3003}`)
})

app.get("/ping", async (req: Request, res: Response) => {
    try {
        res.status(200).send({ message: "Pong!" })
    } catch (error) {
        console.log(error)

        if (req.statusCode === 200) {
            res.status(500)
        }

        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.send("Erro inesperado")
        }
    }
})

// Exercício 2 - Método GET com classe

app.get("/videos", async (req: Request, res: Response) => {
    try {
        const q = req.query.q as string | undefined

        const videoDatabase = new VideoDatabase()
        const videosDB = await videoDatabase.findVideos(q)

        const videos = videosDB.map((videoDB) => new Video(
            videoDB.id,
            videoDB.title,
            videoDB.duration,
            videoDB.created_at
        ))

        res.status(200).send(videos)
    } catch (error) {
        console.log(error)

        if (req.statusCode === 200) {
            res.status(500)
        }

        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.send("Erro inesperado")
        }
    }
})

// Exercício 2 - Método POST com classe

app.post("/videos", async (req: Request, res: Response) => {
    try {
        const { id, title, duration } = req.body

        if(id[0] !== "v") {
            res.status(400)
            throw new Error("'id' deve começar com a letra 'v'.")            
        }
        if(typeof id !== "string") {
            res.status(400)
            throw new Error("'id' deve ser string")
        }
        if(id.length < 4) {
            res.status(400)
            throw new Error("'id' deve possuir pelo menos 4 caracteres.")
        }
                
        if (typeof title !== "string") {
            res.status(400)
            throw new Error("'title' deve ser string")
        }

        if(title.length < 4) {
            res.status(400)
            throw new Error("'id' deve possuir pelo menos 4 caracteres.")
        }

        if (typeof duration !== "number") {
            res.status(400)
            throw new Error("'duration' deve ser number")
        }

        const videoDatabase = new VideoDatabase()
        const videoDBExists = await videoDatabase.findVideoById(id)

        if (videoDBExists) {
            res.status(400)
            throw new Error("'id' já existe")
        }
        
        //Instanciar os dados vindos do body
        const newVideo = new Video(
            id,
            title,
            duration,
            new Date().toISOString()
        )

        //Objeto simples para modelar as informações para o banco de dados
        const newVideoDB = {
            id: newVideo.getId(),
            title: newVideo.getTitle(),
            duration: newVideo.getDuration(),
            created_at: newVideo.getCreatedAt()
        }

        videoDatabase.insertVideo(newVideoDB)

        // const [ videoDB ]: TVideoDB[] = await db("videos").where({ id })

        // const result = new Video(
        //     videoDB.id,
        //     videoDB.title,
        //     videoDB.duration,
        //     videoDB.created_at
        // )

        res.status(201).send(newVideoDB)
    } catch (error) {
        console.log(error)

        if (req.statusCode === 200) {
            res.status(500)
        }

        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.send("Erro inesperado")
        }
    }
})

// // Exercício 3 - Método Put com classe

// app.put("/videos/:id", async (req:Request, res: Response) => {
//     try {

//         const idToEdit = req.params.id

//         const id = req.body.id
//         const title = req.body.title
//         const duration = req.body.duration        

//         if(id !== undefined) {
//             if(id[0] !== "v") {
//                 res.status(400)
//                 throw new Error("'id' deve começar com a letra 'v'.")            
//             }
//             if(typeof id !== "string") {
//                 res.status(400)
//                 throw new Error("'id' deve ser string")
//             }
//             if(id.length < 4) {
//                 res.status(400)
//                 throw new Error("'id' deve possuir pelo menos 4 caracteres.")
//             }
//         }
        
//         if(title !== undefined) {
//             if(typeof title !== "string") {
//                 res.status(400)
//                 throw new Error("'title' deve ser string")
//             }
//             if(title.length < 2) {
//                 res.status(400)
//                 throw new Error("'title' deve possuir pelo menos 2 caracteres.")
//             }
            
//         }

//         if(duration !== undefined) {
//             if(typeof duration !== "number") {
//                 res.status(400)
//                 throw new Error("'duration' deve ser number")
//             }
//         }

//         const [ videoDB ]: TVideoDB[] | undefined = await db("videos").where({ id: idToEdit })

//         if(!videoDB) {
//             res.status(404)
//             throw new Error("'id' de video não encontrado.")            
//         }
        
//         const videoToEdit = new Video(
//             videoDB.id,
//             videoDB.title,
//             videoDB.duration,
//             videoDB.created_at
//         )

//         const newId = id || videoToEdit.getId()
//         const newTitle = title || videoToEdit.getTitle()
//         const newduration = duration || videoToEdit.getDuration()
        
//         videoToEdit.setId(newId)
//         videoToEdit.setTitle(newTitle)
//         videoToEdit.setDuration(newduration)
        

//         await db("videos").update({ id: newId }).where({ id: idToEdit })
//         await db("videos").update({ title: newTitle }).where({ id: idToEdit })
//         await db("videos").update({ duration: newduration }).where({ id: idToEdit })
                
//         // await db("videos").update(videoToEdit).where({ id: idToEdit })

//         res.status(201).send({
//             message: "Video editada com sucesso.",
//             video: idToEdit
//         })


//     } catch (error) {
//         console.log(error)

//         if (req.statusCode === 200) {
//             res.status(500)
//         }

//         if (error instanceof Error) {
//             res.send(error.message)
//         } else {
//             res.send("Erro inesperado")
//         }
    
//     }
// })

// app.delete("/videos/:id", async (req: Request, res: Response) => {
//     try {

//         const idToDelete = req.params.id

        
//         if(idToDelete[0] !== "v") {
//             res.status(400)
//             throw new Error("'id' deve começar com a letra 'v'.")            
//         }

//         const [ videoIdExists ]: TVideoDB[] | undefined = await db("videos").where({ id: idToDelete })
        
//         if(!videoIdExists) {
//             res.status(404)
//             throw new Error("'id' da video não encontrado.")            
//         }

        
//         await db("videos").del().where({ id: idToDelete })

//         res.status(200).send({ message: "Video apagado com sucesso." })

//     } catch (error) {
//         console.log(error)

//         if (req.statusCode === 200) {
//             res.status(500)
//         }

//         if (error instanceof Error) {
//             res.send(error.message)
//         } else {
//             res.send("Erro inesperado")
//         }
//     }
// })