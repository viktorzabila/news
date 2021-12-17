//@@viewOn:imports
import { useContext } from "uu5g04-hooks";
import Context from "./newspapers-context";
//@@viewOff:imports

export function useNewspapers() {
  return useContext(Context);
}

export default useNewspapers;
