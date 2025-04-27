FROM node:23-alpine

LABEL authors="Neo Fu"

# 设置工作目录
WORKDIR /data

# 复制 dist 目录到容器 /data
COPY dist /data
COPY package.json /data/package.json

# 将镜像源切换为淘宝源
# Remove this if you are not in China mainland
RUN npm config set registry https://registry.npmmirror.com
RUN npm install -g pnpm@latest-10
# 安装依赖
RUN pnpm install

# 容器启动时运行
CMD ["node" ,"main"]

# 暴露 3000 端口
EXPOSE 3000

