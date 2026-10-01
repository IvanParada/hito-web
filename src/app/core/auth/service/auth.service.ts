import { inject, Injectable } from "@angular/core";
import { LoginDto, LoginResponse } from "../dto/login.dto";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../../../environments/environment";
import { MeResponse } from "../dto/me.dto";

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
}