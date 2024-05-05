import { LayerDemoModule } from "@/app/ui/preview-module/previewDataReducer";
import { createAppSlice } from "./createAppSlice";

export const previewModuleSlice = createAppSlice({
  name: "previewModule",
  initialState: {
    layersData: {
      layers: [],
    },
  },
  reducers: (create) => ({
    initPreviewLayer: create.reducer((state: any, action: any) => {
      const { data } = action.payload;
      const obj = {};
      data.forEach((item) => {
        const d = item.data;
        for (let key in d) {
          // 带layerType数据摘出来
          if (d[key]?.layerType) {
            obj[d[key]?.layerType] = d[key];
          }
        }
      });
      state.layersData.layers = new LayerDemoModule(obj).data.layers;
    }),
    updateLayersData: create.reducer((state, { payload }: any) => {
      const index = state.layersData.layers.findIndex(
        (i) => i.data.layerType === payload.type
      );
      const draft = JSON.parse(JSON.stringify(state));
      draft.layersData.layers[index].data.value = payload.value;
      return draft;
    }),
  }),
  selectors: {
    selectLayers: (state) => state.layersData.layers,
  },
});
// 每个 case reducer 函数会生成对应的 Action creators
export const { updateLayersData, initPreviewLayer } =
  previewModuleSlice.actions;
export const { selectLayers } = previewModuleSlice.selectors;

export default previewModuleSlice;
// Redux Toolkit 允许我们在 reducers 写 "可变" 逻辑。它
// 并不是真正的改变状态值，因为它使用了 Immer 库
// 可以检测到“草稿状态“ 的变化并且基于这些变化生产全新的
// 不可变的状态
