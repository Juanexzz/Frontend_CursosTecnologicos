import { http } from "../../common/http";
import { LoginRequest, RegisterRequest, AuthResponse, User } from "../domain/user.types";

export const authService = {
  login: async (credentials: LoginRequest): Promise<AuthResponse> => {
    return http.post<AuthResponse>("/auth/login", credentials);
  },

  register: async (userData: RegisterRequest): Promise<{ user: User }> => {
    return http.post<{ user: User }>("/auth/register", userData);
  }
};
