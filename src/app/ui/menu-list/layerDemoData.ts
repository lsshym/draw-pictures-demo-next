import { LayerTypeEnum } from "../preview-module/previewLayers";

const demoData = [
  {
    name: "场景",
    id: 0,
    data: {
      topIcon: {
        layerType: LayerTypeEnum.topIcon,
        value:
          "https://img.iplaysoft.com/wp-content/uploads/2019/free-images/free_stock_photo.jpg",
      },
      bgPitcure: {
        layerType: LayerTypeEnum.bgPitcure,
        value:
          "https://img1.baidu.com/it/u=241649533,64972487&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=750",
      },
    },
  },
  {
    name: "人物",
    id: 1,
    data: {
      figureAvatar: {
        layerType: LayerTypeEnum.figureAvatar,
        value:
          "https://img0.baidu.com/it/u=2588759194,769856364&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=786",
        style: {
          top: "124px",
        },
      },
    },
  },
];
const bgPitcureListData = [{ url: "https://img1.baidu.com/it/u=241649533,64972487&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=750" }, { url: "https://img0.baidu.com/it/u=1033018635,7901815&fm=253&fmt=auto&app=138&f=JPEG?w=750&h=500" }];
const topIconListData = [{ url: "https://img.iplaysoft.com/wp-content/uploads/2019/free-images/free_stock_photo.jpg" }, { url: "https://photokit.com/features/images/image-text-after.webp" }];
const figureAvatarListData = [{ url: "https://img0.baidu.com/it/u=2588759194,769856364&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=786" }, { url: "https://preview.qiantucdn.com/58pic/44/52/69/40W58PICrMm72YYIZV4SH_PIC2018.png!w580_772" }];
export { demoData, bgPitcureListData, topIconListData, figureAvatarListData };
