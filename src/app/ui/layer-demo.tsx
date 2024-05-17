"use client";
import "./layer-demo.scss";
import React, {
  FunctionComponent,
  useCallback,
  useEffect,
  useMemo,
  useReducer,
  useState,
} from "react";
import PreviewModule from "./preview-module/views/PreviewModule";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  initPreviewLayer,
  selectLayers,
  updateLayersData,
} from "@/redux/previewModuleSlice";
import {
  bgPitcureListData,
  demoData,
  figureAvatarListData,
  topIconListData,
} from "./menu-list/layerDemoData";
import MenuList from "./menu-list/menu-list";
import IconList from "./IconList/IconList";
import { produce } from "immer";
import { LayerTypeEnum } from "./preview-module/previewLayers";

interface LayerDemoProps {}

enum DataOperate {
  EDIT_BYNAME = "EDIT_BYNAME",
  INIT_DATA = "INIT_DATA",
}

const LayerDemo: FunctionComponent<LayerDemoProps> = () => {
  const previewLayersData = useAppSelector(selectLayers);
  console.log("previewLayersData", previewLayersData);
  const reduxcDispatch = useAppDispatch();
  const layerDataReducer = useCallback((state, action) => {
    const { name = "", value, index } = action;
    switch (action.type) {
      case DataOperate.EDIT_BYNAME:
        return produce(state, (draft) => {
          if (Object.prototype.toString.call(value) === "[object Object]") {
            for (let key in value) {
              draft[index].data[name][key] = value[key];
            }
          } else {
            draft[index].data[name] = value;
          }
        });
      case DataOperate.INIT_DATA:
        return (state = value);
      default:
        return state;
    }
  }, []);
  const [layerData, layerDataDispatch] = useReducer(layerDataReducer, demoData);
  const menuListData = useMemo(
    () =>
      layerData.map((i) => {
        return { name: i.name, id: i.id };
      }),
    [layerData]
  );
  const [menuListActiveId, setMenuListActiveId] = useState(layerData[0].id);
  const currentMenu = useMemo(
    () => layerData.find((item) => item.id === menuListActiveId),
    [menuListActiveId, layerData]
  );
  useEffect(() => {
    reduxcDispatch(
      initPreviewLayer({
        data: demoData,
      } as any)
    );
  }, []);
  const topIconOnClick = (value) => {
    layerDataDispatch({
      type: DataOperate.EDIT_BYNAME,
      index: currentMenu.id,
      name: "topIcon",
      value: {
        value: value.url,
      },
    });
    reduxcDispatch(
      updateLayersData({
        type: LayerTypeEnum.topIcon,
        value: value.url,
      } as any)
    );
  };
  const bgOnClick = (value) => {
    layerDataDispatch({
      type: DataOperate.EDIT_BYNAME,
      index: currentMenu.id,
      name: "bgPitcure",
      value: {
        value: value.url,
      },
    });
    reduxcDispatch(
      updateLayersData({
        type: LayerTypeEnum.bgPitcure,
        value: value.url,
      } as any)
    );
  };

  const figureOnClick = (value) => {
    layerDataDispatch({
      type: DataOperate.EDIT_BYNAME,
      index: currentMenu.id,
      name: "figureAvatar",
      value: {
        value: value.url,
      },
    });
    reduxcDispatch(
      updateLayersData({
        type: LayerTypeEnum.figureAvatar,
        value: value.url,
      } as any)
    );
  };
  const menuListView = (name) => {
    console.log(name);
    let el;
    switch (name) {
      case "背景":
        el = (
          <IconList dataList={bgPitcureListData} onClick={bgOnClick}></IconList>
        );
        break;
      case "顶部图":
        el = (
          <IconList
            dataList={topIconListData}
            onClick={topIconOnClick}
          ></IconList>
        );
        break;
      case "人物":
        el = (
          <IconList
            dataList={figureAvatarListData}
            onClick={figureOnClick}
          ></IconList>
        );
        break;
      default:
        break;
    }
    return el;
  };
  return (
    <div className="layer-demo">
      <div className="layer">
        <PreviewModule layers={previewLayersData}></PreviewModule>
      </div>
      <div className="data-view">
        <MenuList
          list={menuListData}
          menuListActiveId={menuListActiveId}
          onClick={setMenuListActiveId}
        ></MenuList>
        <div className="">{menuListView(currentMenu.name)}</div>
      </div>
    </div>
  );
};

export default LayerDemo;
