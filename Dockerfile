# 基础镜像，使用Ubuntu 22.04
FROM ubuntu:22.04 AS base

# 设置apt源，更新系统并安装常用工具和时区数据
RUN sed -i 's/archive.ubuntu.com/mirrors.ustc.edu.cn\/ubuntu/g' /etc/apt/sources.list && \
    sed -i 's/security.ubuntu.com/mirrors.ustc.edu.cn\/ubuntu/g' /etc/apt/sources.list && \
    apt-get update && \
    apt-get upgrade -y && \
    DEBIAN_FRONTEND=noninteractive apt-get install -y tzdata curl gnupg2 ca-certificates && \
    echo "Asia/Shanghai" > /etc/timezone && \
    ln -sf /usr/share/zoneinfo/Asia/Shanghai /etc/localtime

# 安装Node.js
RUN NODE_VERSION="v18.17.0" && \
    NODE_OS_ARCH="linux-x64" && \
    curl -fsSL https://mirrors.tuna.tsinghua.edu.cn/nodejs-release/${NODE_VERSION}/node-${NODE_VERSION}-${NODE_OS_ARCH}.tar.gz -o node.tar.gz && \
    tar -xzf node.tar.gz -C /usr/local --strip-components=1 && \
    rm node.tar.gz && \
    npm config set registry https://registry.npmmirror.com

# 设置环境变量
ENV PATH=/usr/local/bin:$PATH

# 创建和设置工作目录
WORKDIR /app

# 复制package文件并安装依赖，处理版本号和包锁文件
COPY package.json package-lock.json ./

RUN sed -i 3d /app/package.json && \
    sed -i 9d /app/package-lock.json && \
    sed -i 3d /app/package-lock.json && \
    npm install --legacy-peer-deps

# 复制所有文件并构建项目
COPY . .
RUN npm run build

# 生产镜像，使用nginx:alpine
FROM nginx:alpine

# 设置apk源，更新系统并安装时区数据
RUN sed -i 's/dl-cdn.alpinelinux.org/mirrors.tuna.tsinghua.edu.cn/g' /etc/apk/repositories && \
    apk update && \
    apk add --no-cache tzdata && \
    ln -sf /usr/share/zoneinfo/Asia/Shanghai /etc/localtime && \
    echo "Asia/Shanghai" > /etc/timezone

# 设置工作目录
WORKDIR /usr/share/nginx/html

# 删除默认的nginx内容
RUN rm -rf ./*

# 复制构建后的文件到nginx目录
COPY --from=base /app/out .
# COPY --from=base /app/.next .


# 复制nginx配置文件
COPY nginx.conf /etc/nginx/nginx.conf

# 暴露端口
EXPOSE 80

# 启动nginx
CMD ["nginx", "-g", "daemon off;"]
