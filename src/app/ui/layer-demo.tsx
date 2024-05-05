"use client";
import { Button, Upload } from "antd";
import React, { FunctionComponent, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { LayerTypeEnum } from "./preview-module/previewLayers";
import PreviewModule from "./preview-module/views/PreviewModule";
import { RootState } from "@/redux/store";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { initPreviewLayer, selectLayers } from "@/redux/previewModuleSlice";

interface LayerDemoProps {}

const LayerDemo: FunctionComponent<LayerDemoProps> = () => {
  const previewLayersData = useAppSelector(selectLayers);
  const demoData = [
    // 因为要在多个选项页里配置同一个菜单，所以有多个对象，最后会显示全部配置
    {
      name: "debug1",
      data: {
        figureAvatar: {
          layerType: LayerTypeEnum.figureAvatar,
          value:
            "https://img0.baidu.com/it/u=2588759194,769856364&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=786",
          style: {
            top: "124px",
          },
        },
        bgPitcure: {
          layerType: LayerTypeEnum.bgPitcure,
          value:
            "https://img1.baidu.com/it/u=241649533,64972487&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=750",
        },
      },
    },
    {
      name: "debug2",
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
  ];
  const reduxcDispatch = useAppDispatch();
  useEffect(() => {
    reduxcDispatch(
      initPreviewLayer({
        data: demoData,
      } as any)
    );
  }, []);
  // reduxcDispatch(
  //     updateLayersData({
  //         type: "",
  //         value: "",
  //     })
  // );
  return (
    <div>
      <div className="layer">
        <PreviewModule layers={previewLayersData}></PreviewModule>
      </div>
      <div>
        <Upload>
          <Button>Click to Upload</Button>
        </Upload>
      </div>
    </div>
  );
};

export default LayerDemo;
