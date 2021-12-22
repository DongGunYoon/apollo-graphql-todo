class TodoConfig {
    PORT: number = 3000
    MONGO_URI: string = "mongodb+srv://gx810:ehdrjs12@whyscluster.15gd5.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"

    // LogIn
    LOGIN_SECRET: string = "nlfdnmlk1kdsalf12bninjkn3412ikfn"

    // Geolocation API KEY
    GEO_API_KEY: string = "AIzaSyCSlNL9fzlJEpWASL5vQA_w2wN4bPASsKs"
}

const config = new TodoConfig()

export default config