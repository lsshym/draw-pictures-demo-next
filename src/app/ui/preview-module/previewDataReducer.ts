import { AvatarLayer, BackgroundLayer, NoRepeatId, TopIconLayer } from "./previewLayers";
// 需要渲染的部分
type LayersType = AvatarLayer | TopIconLayer;
export class LayerDemoModule extends NoRepeatId {
  constructor(initData = {} as any) {
    super();
    const avatar = new AvatarLayer(initData.figureAvatar);
    const topIcon = new TopIconLayer(initData.topIcon);
    const bgPitcure = new BackgroundLayer(initData.bgPitcure);
    this.data.layers.push(avatar, topIcon, bgPitcure);
  }
  data: { layers: LayersType[] } = { layers: [] };
}
