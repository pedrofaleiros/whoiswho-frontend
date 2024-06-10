import { destroyCookie, parseCookies, setCookie } from "nookies";
import {
  createContext,
  FC,
  ReactNode,
  useCallback,
  useContext,
  useState,
} from "react";

interface UserParams {
  userId: string;
  username: string;
}

interface AuthContextType {
  userId: string | null;
  username: string | null;
  session: () => UserParams | null;
  createUser: (p: UserParams) => void;
  updateUsername: (newUsername: string) => void;
  isLoading: boolean;
  setIsLoading: (value: boolean) => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

interface AuthProviderProps {
  children: ReactNode;
}
export const AuthProvider: FC<AuthProviderProps> = ({ children }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [username, setUsername] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);

  const session = useCallback(() => {
    const cookies = parseCookies();
    const _username = cookies["@whoiswho.username"];
    const _userId = cookies["@whoiswho.userId"];

    if (_username === undefined || _userId === undefined) {
      return null;
    }

    setUserId(_userId);
    setUsername(_username);

    return {
      userId: _userId,
      username: _username,
    };
  }, []);

  const createUser = useCallback((p: UserParams) => {
    setCookie(null, "@whoiswho.userId", p.userId, {
      maxAge: 1 * 24 * 60 * 60,
      path: "/",
    });

    setCookie(null, "@whoiswho.username", p.username, {
      maxAge: 1 * 24 * 60 * 60,
      path: "/",
    });

    setUsername(p.username);
    setUserId(p.userId);
  }, []);

  const updateUsername = useCallback((newUsername: string) => {
    setCookie(null, "@whoiswho.username", newUsername, {
      maxAge: 1 * 24 * 60 * 60,
      path: "/",
    });

    setUsername(newUsername);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        userId,
        username,
        session,
        createUser,
        updateUsername,
        isLoading,
        setIsLoading,
      }}
    >
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
