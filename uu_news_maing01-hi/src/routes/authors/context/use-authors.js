//@@viewOn:imports
import { useContext } from "uu5g04-hooks";
import Context from "./authors-context";
//@@viewOff:imports

export function useAuthors() {
  return useContext(Context);
}

export default useAuthors;
