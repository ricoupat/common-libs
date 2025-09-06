import ApiKeys from "../src/config/ApiKeys";

describe("ApiKeys", () => {

    afterEach(() => {
        delete process.env.MANGA_SERVICE_KEY;
        delete process.env.MANGA_BACKEND_KEY;
    });

    it("should load keys from environment variables", () => {
        process.env.MANGA_SERVICE_KEY = "test-service";
        process.env.MANGA_BACKEND_KEY = "test-backend";

        const keys = new ApiKeys().loadKeys();

        expect(keys.mangaService).toBe("test-service");
        expect(keys.mangaBackEnd).toBe("test-backend");
    });

    it("should return 'ERROR' if env variables are missing", () => {
        const keys = new ApiKeys().loadKeys();

        expect(keys.mangaService).toBe("ERROR");
        expect(keys.mangaBackEnd).toBe("ERROR");
    });
});