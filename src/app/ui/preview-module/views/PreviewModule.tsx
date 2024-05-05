import React, { FunctionComponent } from 'react'
import './PreviewModule.scss'
import TypeLayer from './TypeLayer'
interface PreviewModuleProps {
    layers: any
}

const PreviewModule: FunctionComponent<PreviewModuleProps> = props => {
    return (
        <div className="PreviewModule">
            {props.layers?.map((v, i) => {
                return <TypeLayer layer={v} key={v.id} />
            })}
        </div>
    )
}

export default PreviewModule
