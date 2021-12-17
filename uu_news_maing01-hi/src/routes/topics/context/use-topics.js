//@@viewOn:imports
import { useContext } from "uu5g04-hooks";
import Context from "./topics-context";
//@@viewOff:imports

export function useTopics() {
  return useContext(Context);
}

export default useTopics;
