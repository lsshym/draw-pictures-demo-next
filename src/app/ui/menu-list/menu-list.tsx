"use client";
import "./menu-list.scss";
import { FunctionComponent } from "react";

interface MenuListProps {
  list: any;
  menuListActiveId: string;
  onClick: Function;
}

const MenuList: FunctionComponent<MenuListProps> = (props) => {
  const { list, menuListActiveId } = props;
  return (
    <div className="menu-list">
      {list.map((i) => (
        <p
          className={`${menuListActiveId === i.id ? "active" : ""} list-item`}
          onClick={() => {
            props.onClick(i.id);
          }}
        >
          {i.name}
        </p>
      ))}
    </div>
  );
};

export default MenuList;
