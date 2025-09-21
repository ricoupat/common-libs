export default class ApiKeys {
    keys: Record<string, string | undefined>;

    constructor() {
        this.keys = {};
    }

    public loadKeys() {
        this.keys = {
            authService: process.env.AUTH_SERVICE,
            apiGateway: process.env.API_GATEWAY,

            mangaBackEnd: process.env.MANGA_BACKEND_KEY,
            mangaService: process.env.MANGA_SERVICE_KEY,

            movieBackEnd: process.env.MOVIE_BACKEND,
            movieService: process.env.MOVIE_SERVICE
        }

        for (const [name, key] of Object.entries(this.keys)) {
            if (!key) {
                throw new Error(`Missing API key for ${name}`);
            }
        }

        return this.keys;
    }
}