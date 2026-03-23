import { SanitizationUtils } from "../src/";

describe("SanitizationUtils", () => {
    let sanitization: SanitizationUtils

    beforeEach(() => {
        sanitization = new SanitizationUtils();
    });

    it('should return true for a valide email format', () => {
        const email: string = "test.test@test.test";

        let isValide: boolean = sanitization.isValidEmail(sanitization.sanitize(email));

        expect(isValide).toBe(true);
    });

    it('should return false for an invalid email format', () => {
        const email = "invalid-email@com";
        expect(sanitization.isValidEmail(sanitization.sanitize(email))).toBe(false);
    });

    it('should trim spaces before validating', () => {
        const email = "   user@example.com  ";
        expect(sanitization.isValidEmail(sanitization.sanitize(email))).toBe(true);
    });

    it('should escape HTML characters but still validate email', () => {
        const email = "<user@example.com>";
        const sanitized = sanitization.sanitize(email);
        expect(sanitization.isValidEmail(sanitized)).toBe(false); // invalid due to < >
    });

    it('should return true for a valid username', () => {
        const username = "Valid_User-123";
        expect(sanitization.isValidUsername(sanitization.sanitize(username))).toBe(true);
    });

    it('should return false for username with invalid characters', () => {
        const username = "User<>!";
        expect(sanitization.isValidUsername(sanitization.sanitize(username))).toBe(false);
    });

    it('should return false for username that is too short', () => {
        const username = "ab";
        expect(sanitization.isValidUsername(sanitization.sanitize(username))).toBe(false);
    });

    it('should return false for username that is too long', () => {
        const username = "a".repeat(31);
        expect(sanitization.isValidUsername(sanitization.sanitize(username))).toBe(false);
    });

    it('should trim leading and trailing spaces', () => {
        const input = "   hello world   ";
        expect(sanitization.sanitize(input)).toBe("hello world");
    });

    it('should escape HTML characters', () => {
        const input = `<div class="test">'Hello'</div>`;
        const expected = "&lt;div class=&quot;test&quot;&gt;&#39;Hello&#39;&lt;/div&gt;";
        expect(sanitization.sanitize(input)).toBe("&lt;div class=&quot;test&quot;&gt;&#39;Hello&#39;&lt;/div&gt;"); // adjusted for your replacements
    });

    it('should return empty string if input is all spaces', () => {
        const input = "      ";
        expect(sanitization.sanitize(input)).toBe("");
    });

    it("should return true for a strong valid password", () => {
        const password = "Abcdef1!";
        expect(sanitization.isValidPassword(password)).toBe(true);
    });

    it("should fail if password is too short", () => {
        const password = "Ab1!";
        expect(sanitization.isValidPassword(password)).toBe(false);
    });

    it("should fail if password has no uppercase letters", () => {
        const password = "abcdef1!";
        expect(sanitization.isValidPassword(password)).toBe(false);
    });

    it("should fail if password has no lowercase letters", () => {
        const password = "ABCDEF1!";
        expect(sanitization.isValidPassword(password)).toBe(false);
    });

    it("should fail if password has no digits", () => {
        const password = "Abcdefg!";
        expect(sanitization.isValidPassword(password)).toBe(false);
    });

    it("should fail if password has no special characters", () => {
        const password = "Abcdef12";
        expect(sanitization.isValidPassword(password)).toBe(false);
    });

    it("should allow multiple special characters", () => {
        const password = "Abc!@#1X";
        expect(sanitization.isValidPassword(password)).toBe(true);
    });

    it("should fail for password with spaces", () => {
        const password = "Abcdef1! ";
        expect(sanitization.isValidPassword(password)).toBe(false);
    });
})