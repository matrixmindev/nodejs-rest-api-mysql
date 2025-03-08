import { app } from "./app.js"
import { PORT } from "../config.js"



app.listen(PORT, () => {
    console.log(`Server is runningg on port http://localhost:${PORT}`)
})

