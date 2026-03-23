export class SanitizationUtils {

    public sanitizeInputs(inputs: Map<string, string>): Map<string, string> {
        const sanitized = new Map<string, string>();
        inputs.forEach((value, key) => {
            sanitized.set(key, this.sanitize(value));
        });
        return sanitized;
    }

    public sanitize(input: string): string {
        return input
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/'/g, '&#39;')
            .replace(/"/g, '&#34;')
            .trim();
    }

    public isValidEmail(email: string): boolean {
        const emailRegex: RegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    public isValidUsername(username: string): boolean {
        return /^[a-zA-Z0-9_-]{3,30}$/.test(username);
    }

    public isValidPassword(password: string): boolean {
        return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(password);
    }
}