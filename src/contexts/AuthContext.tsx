import { destroyCookie, setCookie } from "nookies";
import {
  createContext,
  FC,
  ReactNode,
  useCallback,
  useContext,
  useState,
} from "react";

interface LoginParams {
  username: string;
  token: string;
  userId: string;
}

interface AuthContextType {
  username: string | null;
  token: string | null;
  login: (p: LoginParams) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: FC<AuthProviderProps> = ({ children }) => {
  const [username, setUsername] = useState<string | null>(null);
  const [token, setToken] = useState<string | null>(null);

  const login = useCallback((p: LoginParams) => {
    setCookie(null, "@whoiswho.token", p.token, {
      path: "/",
      maxAge: 1 * 24 * 60 * 60,
    });

    setCookie(null, "@whoiswho.userId", p.userId, {
      path: "/",
      maxAge: 1 * 24 * 60 * 60,
    });

    setToken(p.token);
    setUsername(p.username);
  }, []);

  const logout = useCallback(() => {
    destroyCookie(null, "@whoiswho.token");
    destroyCookie(null, "@whoiswho.userId");
    setToken(null);
    setUsername(null);
  }, []);

  return (
    <AuthContext.Provider value={{ username, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("");
  }
  return context;
};
