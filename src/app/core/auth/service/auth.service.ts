import { inject, Injectable } from "@angular/core";
import { LoginDto, LoginResponse } from "../dto/login.dto";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../../../environments/environment";
import { MeResponse } from "../dto/me.dto";
import { RefreshTokenResponse, TokenDto } from "../dto/refresh.dto";

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private readonly http = inject(HttpClient);
    private readonly apiUrl = `${environment.apiUrl}/auth`;

    login(dto: LoginDto) {
        return this.http.post<LoginResponse>(
            `${this.apiUrl}/login`,
            dto,
        );
    }

    me() {
        return this.http.get<MeResponse>(
            `${this.apiUrl}/me`,
        );
    }

    refreshToken(dto: TokenDto) {
        return this.http.post<RefreshTokenResponse>(
            `${this.apiUrl}/refresh`,
            dto,
        );
    }

    logout(dto: TokenDto) {
        return this.http.post(
            `${this.apiUrl}/logout`,
            dto,
        );
    }
}