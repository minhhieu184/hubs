import { create360ImageMesh, createImageMesh } from "../utils/create-image-mesh";
import { addComponent } from "bitecs";
import { addObject3DComponent } from "../utils/jsx-entity";
import { MediaVideo } from "../bit-components";

export function inflateVideo(world, eid, { texture, textureSrc, textureVersion, ratio, projection, autoPlay }) {
  const mesh =
    projection === "360-equirectangular" ? create360ImageMesh({ texture, ratio }) : createImageMesh({ texture, ratio });
  addObject3DComponent(world, eid, mesh);
  addComponent(world, MediaVideo, eid);
  MediaVideo.textureSrc[eid] = APP.getSid(textureSrc);
  MediaVideo.textureVersion[eid] = textureVersion;
  console.log(autoPlay);
  MediaVideo.autoPlay[eid] = autoPlay ? 1 : 0;
  return eid;
}
