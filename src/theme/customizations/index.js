import Link from "./Link";
import Tabs from "./Tabs";

function customizeComponents(theme) {
  return { ...Link(theme), ...Tabs(theme) };
}

export default customizeComponents;
