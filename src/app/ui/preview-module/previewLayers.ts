import { CSSProperties } from "react";

export enum LayerTypeEnum {
  "topIcon" = "topIcon",
  "figureAvatar" = "figureAvatar",
  "bgPitcure" = "bgPitcure",
}

export class NoRepeatId {
  id = `${Date.now()}-${Math.floor(Math.random() * 10000)}`;
}
export interface RenderUnit {
  layerType: string;
  value: string | any[];
  style?: CSSProperties;
}
// 这段代码chatgpt优化，建议删除ts
export class AvatarLayer extends NoRepeatId {
  constructor(initData: Record<string, unknown> = {}) {
    super();
    for (let key in initData as any) {
      // 有的话忽略
      if (!(key in this.data)) continue;
      this.data[key] = initData[key];
    }
  }
  data = {
    layerType: LayerTypeEnum.figureAvatar,
    value: "",
    style: {},
  } as any;
}

export class TopIconLayer extends NoRepeatId {
  constructor(initData = {} as any) {
    super();
    for (let key in initData) {
      // 有的话忽略
      if (!(key in this.data)) continue;
      this.data[key] = initData[key];
    }
  }
  data = {
    layerType: LayerTypeEnum.topIcon,
    value: "",
    width: "150",
    zIndex: 2,
  } as any;
}
export class BackgroundLayer extends NoRepeatId {
  constructor(initData = {}) {
    super();
    for (let key in initData) {
      if (!(key in this.data)) continue;
      this.data[key] = initData[key];
    }
  }
  data = {
    layerType: LayerTypeEnum.bgPitcure,
    value: "",
    preview: "",
    width: "",
    height: "",
  };
}
