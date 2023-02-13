import {
  useState,
  createContext,
  ReactNode,
  Dispatch,
  SetStateAction,
  useContext,
} from "react";

interface UserContextI {
  setBackgroundImage: Dispatch<SetStateAction<string | null>>;
  backgroundImage: string | null;
}

const Context = createContext<UserContextI>({
  setBackgroundImage: () => {},
  backgroundImage: null,
});

export default function UserContext({ children }: { children: ReactNode }) {
  const [backgroundImage, setBackgroundImage] = useState<string | null>(null);
  const exposed = { setBackgroundImage, backgroundImage };
  return <Context.Provider value={exposed}>{children}</Context.Provider>;
}

export const useUserContext = () => useContext(Context);
