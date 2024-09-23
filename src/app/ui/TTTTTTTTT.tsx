"use client";
import React, { useState, useCallback, useEffect } from "react";

function strMapToObj(strMap) {
  let obj = Object.create(null);
  for (let [k, v] of strMap) {
    obj[k] = v;
  }
  return obj;
}

export default function App() {
  const deepCopy = (obj, objMap = new WeakMap()) => {
    const buf = {}
    for (let i in obj) {
      if (typeof obj[i] === "object") {
        // if (objMap.has(obj[i])) {
        //   return objMap.get(obj[i]);
        // }
        // objMap.set(obj[i],obj[i]);

        // buf[i] = deepCopy(obj[i], objMap);
      } else {
        buf[i] = obj[i]
      }
    }
    return buf;
  };
  useEffect(() => {
    let t1, t2;
    t1 = {
      tt1: "11",
    };
    t2 = {
      tt2: "22",
      tt22: {
        tt33: "3333",
      },
    };

    // 然后设置它们的引用
    t1.test1 = t2;
    t2.yyy = t1;

    // console.log(t1);
    // console.log(t2);
    const value = deepCopy(t2);
    t2.tt22.tt33 = 66666;
    console.log(value,t2);
  }, []);
  return <div></div>;
}
