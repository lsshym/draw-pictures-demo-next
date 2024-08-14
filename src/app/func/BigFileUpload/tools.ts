// 传入File文件，返回切片
const BASESIZE = 1024 * 1024;
export const currentFileChunk = (file: File): Blob[] => {
  const { size } = file;
  let CHUNK_SIZE;
  if (size < 100 * BASESIZE) {
    // 文件小于100MB，切片大小为1MB
    CHUNK_SIZE = 1 * BASESIZE;
  } else if (size < 1024 * 1024 * 1024) {
    // 文件在100MB到1GB之间，切片大小为4MB
    CHUNK_SIZE = 4 * BASESIZE;
  } else {
    // 文件大于1GB，切片大小为8MB
    CHUNK_SIZE = 8 * BASESIZE;
  }

  const fileChunks = [];

  let currentChunk = 0;

  while (currentChunk < file.size) {
    fileChunks.push(file.slice(currentChunk, currentChunk + CHUNK_SIZE));
    currentChunk += CHUNK_SIZE;
  }

  return fileChunks;
};

/**
 * 将 Blob 对象数组转换为 ArrayBuffer 对象数组的异步函数
 * 这个函数使用 Promise.all 并发地将每个 Blob 对象转换为 ArrayBuffer
 *
 * @param chunks - 要转换的 Blob 对象数组
 * @return 一个 Promise，当所有的 Blob 对象都转换为 ArrayBuffer 时，它解析为一个 ArrayBuffer 对象的数组
 */
// async function getArrayBufFromBlobsV2(chunks: Blob[]): Promise<ArrayBuffer[]> {
//   return Promise.all(chunks.map((chunk) => chunk.arrayBuffer()));
// }

// export const calculateHash = async (fileChunks: Blob[]) => {
//   // const chunk = new
// };

export const chunkRequest = async (fileChunkList, hash, fileName) => {
  fileChunkList.map((item, index) => {
    const formData = new FormData();
    formData.append("file", item);
    formData.append("chunkName", `${hash}-${fileName}-${index}`);
    formData.append("fileName", fileName);
    // 发送请求
    fetch("URL_ADDRESS", {
      method: "POST",
      body: formData,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  });
  return 666;
};
