import { httpService } from "../http/http.services";
import { Login, Token } from "../../lib/types"

class LoginService {
    private endpoint: string = "/auth";
    private pendingTokenRequest: Promise<Token> | null = null;

    public generateToken(login: Login | null): Promise<Token> {
        if (this.pendingTokenRequest) {
            return this.pendingTokenRequest;
        }

        this.pendingTokenRequest = httpService.post<Token>(`${this.endpoint}/token`, login)
            .finally(() => {
                this.pendingTokenRequest = null;
            });

        return this.pendingTokenRequest;
    }
}

export const loginService = new LoginService();