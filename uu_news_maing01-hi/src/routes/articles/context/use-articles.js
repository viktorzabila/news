//@@viewOn:imports
import { useContext } from "uu5g04-hooks";
import Context from "./articles-context";
//@@viewOff:imports

export function useArticles() {
  return useContext(Context);
}

export default useArticles;
