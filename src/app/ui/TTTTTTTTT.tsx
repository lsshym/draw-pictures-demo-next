"use client";
import { Button, Upload } from "antd";
import axios from "axios";
import {
  createFileChunks,
  generateFileHash,
  UploadHelper,
} from "large-file-upload";

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
    const buf = {};
    for (let i in obj) {
      if (typeof obj[i] === "object") {
        if (objMap.has(obj[i])) {
          return objMap.get(obj[i]);
        }
        objMap.set(obj[i], obj[i]);
        buf[i] = deepCopy(obj[i], objMap);
      } else {
        buf[i] = obj[i];
      }
    }
    return buf;
  };
  useEffect(() => {}, []);
  const [test, setTest] = useState(1);

  const handleClick = () => {
    setTest((prev) => {
      return prev + 1;
    });
  };
  const onChange = async ({ file }) => {
    const { fileChunks, chunkSize } = createFileChunks(file);
    // startTimer(generateFileHash, file);
    const hashId = await generateFileHash(file);
    console.log(hashId);
    return
    const arr = fileChunks.map((chunk, index) => {
      return {
        chunk,
        index,
      };
    });
    console.log("arr", arr.length);

    console.time("testPool");
    const testPool = new UploadHelper(arr);
    testPool.onProgressChange((value) => {
      console.log(value);
    });
    testPool
      .run(async ({ data, signal }) => {
        const { chunk, index } = data;
        const fd = new FormData();
        fd.append("fileHash", hashId);
        fd.append("chunkHash", `${hashId}-${index}`);
        fd.append("fileName", file.name);
        fd.append("chunkFile", chunk);
        const value = await axios({
          url: `/upload`,
          method: "post",
          headers: {
            "Content-Type": "multipart/form-data",
          },
          data: fd, // 确保上传的内容正确传递
          signal,
        }).catch((error) => {
          console.log(error);
        });
        return value;
      })
      .then(({ results, errorTasks }) => {
        console.log(results, errorTasks);
        console.timeEnd("testPool");
        axios({
          url: `api/merge`,
          method: "post",
          data: {
            chunkSize: chunkSize * 1024 * 1024,
            fileName: file.name,
            fileHash: hashId,
          },
        });
      });
  };
  return (
    <div>
      <Upload customRequest={onChange}>
        <Button>测试</Button>
      </Upload>
    </div>
  );
}
