import path from "path";
import config from "./next.config.js";

export default function myImageLoader({ src, width }) {
  const basePath = config.basePath
  if(basePath && path.isAbsolute(src)) return `${basePath}${src}?width=${width}`
  return `${src}?width=${width}`
}