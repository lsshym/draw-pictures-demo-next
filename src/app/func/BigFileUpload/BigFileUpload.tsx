import { Button, Upload } from "antd";
import { FunctionComponent, useState } from "react";
import { currentFileChunk } from "./tools";

interface BigFileUploadProps {}

const BigFileUpload: FunctionComponent<BigFileUploadProps> = () => {
  const [uploading, setUploading] = useState(false);
  // https://juejin.cn/post/7353106546827624463?searchId=20240813221652305F94C1D652E9262A00
  const fileHashWorker = async (fileChunkList) => {
    return new Promise((resolve, reject) => {
      const worker = new Worker(
        new URL("./worker/hash-worker.ts", import.meta.url),
        {
          type: "module",
        }
      );
      worker.postMessage({ fileChunkList });
      worker.onmessage = (e) => {
        const { fileHash } = e.data;
        console.log(fileHash);
        if (fileHash) {
          resolve({
            fileHash,
          });
        }
      };
    });
  };

  const uploadCustomRequest = async (info) => {
    const { file, onSuccess, onError, onProgress } = info;

    const fileChunkList = currentFileChunk(file);

    const fileHash = await fileHashWorker(fileChunkList);
    console.log(fileHash);
    // chunkRequest(fileChunkList, fileHash, file.name);
    // 用循环计算时间差的方式测试有没有卡顿
  };

  return (
    <div className="">
      <Upload customRequest={uploadCustomRequest}>
        <Button loading={uploading}>点击上传</Button>
      </Upload>
    </div>
  );
};

export default BigFileUpload;
