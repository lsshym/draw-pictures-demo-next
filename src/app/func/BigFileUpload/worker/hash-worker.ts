// hash-worker.js
import SparkMD5 from "./spark-md5.min.js";

async function calculateChunksHash(fileChunkList) {
  // 初始化脚本
  const spark = new SparkMD5.ArrayBuffer();
  // 计算切片进度（拓展功能，可自行添加）
  let percentage = 0;
  // 计算切片次数
  let count = 0;

  // 递归函数，用于处理文件切片
  async function loadNext(index) {
    if (index >= fileChunkList.length) {
      // 所有切片都已处理完毕
      return spark.end(); // 返回最终的MD5值
    }

    // 使用Promise封装FileReader
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsArrayBuffer(fileChunkList[index]);

      reader.onload = (e) => {
        count++;
        spark.append(e.target.result);

        // 计算切片进度，非上传进度
        percentage += 100 / fileChunkList.length;
        self.postMessage({ percentage }); // 发送进度到主线程

        // 递归调用，处理下一个切片
        resolve(loadNext(index + 1));
      };

      reader.onerror = (err) => {
        reject(err); // 如果读取错误，则拒绝Promise
      };
    });
  }

  try {
    // 开始计算切片
    const lasttime = new Date().getTime();
    const fileHash = await loadNext(0); // 等待所有切片处理完毕
    const time = new Date().getTime() - lasttime;
    const seconds = Math.floor(time / 1000);
    console.log("计算切片MD5耗时:", seconds);

    self.postMessage({ percentage: 100, fileHash }); // 发送最终结果到主线程
  } catch (err) {
    self.postMessage({ name: "error", data: err }); // 发送错误到主线程
  } finally {
    self.close(); // 无论成功还是失败，都关闭Worker
  }
}

self.addEventListener(
  "message",
  async (e) => {
    try {
      const { fileChunkList } = e.data;
      // const fileChunkList = await createFileChunk(file, chunkSize) // 创建文件切片
      await calculateChunksHash(fileChunkList); // 等待计算完成
    } catch (err) {
      // 这里实际上不会捕获到calculateChunksHash中的错误，因为错误已经在Worker内部处理了
      // 但如果未来有其他的异步操作，这里可以捕获到它们
      console.error("worker监听发生错误:", err);
    }
  },
  false
);
self.addEventListener("error", function (event) {
  console.log("Worker触发主线程的error事件：", event);
  self.close(); // 关闭Worker
});
