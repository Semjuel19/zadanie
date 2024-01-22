import { createContext, useContext } from "react";

export type LibraryContextProps = {
  refetch: number;
  triggerRefetch: () => void;
};

export const LibraryContext = createContext<LibraryContextProps>({
  refetch: 0,
  triggerRefetch: () => {},
});

export const useLibraryContext = () => useContext(LibraryContext);
