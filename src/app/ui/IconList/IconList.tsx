import Image from "next/image";
import { FunctionComponent } from "react";

interface IconListProps {
  dataList: any[];
  onClick: Function;
}

const IconList: FunctionComponent<IconListProps> = (props) => {
  const { dataList } = props;
  return (
    <div>
      {dataList.map((item, i) => {
        return (
          item && (
            <img
              key={i}
              width={100}
              height={100}
              src={item.url}
              alt={""}
              onClick={() => {
                props.onClick(item);
              }}
            ></img>
          )
        );
      })}
    </div>
  );
};

export default IconList;
