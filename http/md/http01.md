#### 1.1 http前世今生

1989年确认三项关键技术：

uri：统一资源标识符，作为互联网上资源的唯一身份。

html：超文本标记语言，描述超文本文档。

http：文本传输协议，用来传输超文本.

    http0.9（原型）
        计算机处理能力低，存储容量小，网速慢。只允许 GET 请求读取文档，并且在响应后立即关闭。
    http1.0（备忘录）
        1. 增加 HEAD、POST等方法。
        2. 增加响应状态码，标记可能的错误原因。
        3. 引入协议版本号概念。
        4. 引入 http header 概念，让http处理请求和响应更加灵活。
        5. 传输数据不在局限于普通文本。
    http1.1（发布正式标准）
        1. 增加PUT、DELETE 等新方法。
        2. 增加缓存管理和控制。
        3. 明确了连接管理，允许持久连接。
        4. 允许响应数据分块，便于传输大文件。
        5. 强制要求Host头，让互联网主机托管成为可能。
    http2.0（提升性能）
        1. 二进制协议，不再是纯文本。
        2. 可发起多个请求，废弃1.1里的管道。
        3. 使用专用算法压缩头部，减少数据传输量。
        4. 允许服务器主动向客户端推送数据。
        5. 增强了安全性，“事实上”要求加密通信。
    http3.0（标准化制定阶段）

#### 1.2 http是什么，http又不是什么

http（HyperTextTransferProtocol）超文本 传输 协议, 是一个**协议**。

协议：http是计算机世界里的协议。它使用计算机能够理解的语言确立了计算机之间交流通信的规范，以及相关的各种控制和错误处理方式。

传输：http是一个在计算机世界里专门用来在两点之间传输数据的约束和规范。

超文本：http是一个在计算机世界里专门在两点之间传输文字、图片、音频、视频等超文本数据的约束和规范。

#### 1.3 http世界全览（上）

![](https://static001.geekbang.org/resource/image/51/64/5102fc33d04b59b36971a5e487779864.png?wh=1142*1081)

#### 1.4 http世界全览（下）

![](https://static001.geekbang.org/resource/image/1e/81/1e7533f765d2ede0abfab73cf6b57781.png?wh=1863*2271)

#### 1.5 四层、七层

四层：TCP/IP网络分层模型

![](https://static001.geekbang.org/resource/image/2b/03/2b8fee82b58cc8da88c74a33f2146703.png?wh=3000*1681)

七层：OSI网络分层模型

![](https://static001.geekbang.org/resource/image/3a/dc/3abcf1462621ff86758a8d9571c07cdc.png?wh=3000*1681)

#### 1.6 域名里有哪些门道

DNS解析流程

浏览器DNS服务器 ==> 操作系统DNS服务器 ==> hosts文件 ==> 非权威域名服务器 ==> 根域名服务器 ==> 顶级域名服务器 ==> 二级域名服务器 ==> 权威域名服务器

    操作系统DNS服务器：在任务管理器中可以看到 DNS Client.
    hosts文件：C:\Windows\System32\drivers\etc\hosts
    非权威域名服务器：大公司自己建设DNS服务器，谷歌：8.8.8.8，微软：4.2.2.1，cloudFlare：1.1.1.1
    根域名服务器：管理顶级域名服务器，返回com、net、cn...
    顶级域名服务器：管理二级域名服务器，以www.bilibili.com为例，返回bilibili.com
    二级域名服务器：返回主机名，以www.bilibili.com为例，返回www.bilibili.com
    权威域名服务器：注册域名的DNS服务器

![](https://static001.geekbang.org/resource/image/e5/ac/e51df3245609880641043af65bba94ac.png?wh=3000*1681)

#### 1.7 实验环境

#### 1.8 键入网址再按回车，后面发生了什么

抓包分析 TODO

```flow
  st=>start: ip地址
  ip=>condition: 是否是ip地址
  link=>operation: 建立连接（三次握手）
  res=>operation: 资源请求
  req=>operation: 响应资源
  matchIp=>operation: DNS解析域名
  e=>end

  st->ip
  ip(yes)->link->res->req
  ip(no)->matchIp->link->res->req
```