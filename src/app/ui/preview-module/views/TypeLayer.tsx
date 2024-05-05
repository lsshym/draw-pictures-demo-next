import React, { FunctionComponent } from "react";
import { RenderUnit, LayerTypeEnum } from "../previewLayers";

interface TypeLayerProps {
    layer: { data: RenderUnit };
}

const TypeLayer: FunctionComponent<TypeLayerProps> = ({ layer }) => {
    let el = null;
    const data = layer.data;
    switch (layer.data.layerType) {
        case LayerTypeEnum.bgPitcure: {
            el = (
                <div
                    className="layer_bg"
                    style={{
                        backgroundImage: `url(${data.value})`,
                    }}
                ></div>
            )
            break
        }
        case LayerTypeEnum.topIcon: {
            el = (
                <img
                className="topIcon"
                    src={data.value as string}
                ></img>
            );
            break;
        }
        case LayerTypeEnum.figureAvatar: {
            el = (
                <img
                    className="avatar"
                    src={data.value as string}
                    style={data.style}
                ></img>
            );
            break;
        }
    }
    return el;
};

export default TypeLayer;
