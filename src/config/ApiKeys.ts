export default class ApiKeys {
    keys: Record<string, string>;

    constructor() {
        this.keys = {
            mangaService: process.env.MANGA_SERVICE_KEY || "ERROR",
            mangaBackEnd: process.env.MANGA_BACKEND_KEY || "ERROR"
        }
    }
}