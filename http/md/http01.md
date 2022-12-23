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

TODO

#### 2.1 键入网址再按回车，后面发生了什么

抓包分析 TODO

```flow
  st=>start: ip地址
  ip=>condition: 是否是ip地址
  link=>operation: 建立连接（三次握手）
  res=>operation: 资源请求
  req=>operation: 响应资源
  matchIp=>operation: DNS解析域名（参考1.6）
  e=>end

  st->ip
  ip(yes)->link->res->req
  ip(no)->matchIp->link->res->req
```

#### 2.2 http报文是什么样子的

![](https://static001.geekbang.org/resource/image/62/3c/62e061618977565c22c2cf09930e1d3c.png?wh=3000*1681)
![](https://static001.geekbang.org/resource/image/1f/ea/1fe4c1121c50abcf571cebd677a8bdea.png?wh=3000*1314)
![](https://static001.geekbang.org/resource/image/cb/75/cb0d1d2c56400fe9c9988ee32842b175.png?wh=3000*1344)

头字段使用注意点：
1. 字段名不区分大小写，一般首字母大写，可读性更高；
2. 字段名里不允许空格、下划线，可以使用短横线；
3. 字段名冒号前不能有空格，冒号后允许有多个空格；
4. 字段的顺序没有意义；
5. 字段原则上不能重复，除非这个字段本身语义允许，例如：Set-Cookie；

头部字段分类：
1. 通用字段：在请求头和响应头里都可以出现；
2. 请求字段：仅出现在请求头，进一步说明请求信息或者额外的附加条件；
3. 响应字段：仅出现在响应头，补充说明响应报文的信息；
4. 实体字段：它实际上属于通用字段，但专门描述body的额外信息；

常见的字段说明：

- Host: 请求字段，HTTP1.1规范中**必须出现**字段，一个域名可能对应多个ip，它会告诉服务器该请求由哪个主机处理。
- User-Agent: 请求字段，服务器可以通过它来区分请求方的客户端，不过现在被混淆，容易“伪装”，变得毫无意义。
- Date: 通用字段，请求创建时间。
- Server: 响应字段，它告诉客户端提供Web服务的软件名和版本号。
- Content-Length: 实体字段，报文body长度，服务器看到这个字段就知道有多少数据，可直接接收，没有该字段，就需要分段chunk拼接接收。

#### 2.3 应该如何理解请求方法

目前http1.1规定八种方法，单词都**必须是大写形式**
1. GET: 获取资源。
2. HEAD: 获取资源的元信息。和GET区别在于，只返回响应头信息，不返回实体信息。
3. POST: 向资源提交数据。
4. PUT: 类似POST。和POST区别在于，语义上是修改update，而POST属于创建create。
5. DELETE: 删除资源。
6. CONNECT: 建立特殊的连接隧道。要求服务器为客户端与另一台远程服务器建立一条特殊的连接隧道。
7. OPTIONS: 列出可对资源实行的操作方法，在**响应头的Allow字段中返回**。
8. TRACE: 追踪请求-响应的传输路径。多用于对http链路的测试或诊断，会存在漏洞，会泄露网站信息。

![](https://static001.geekbang.org/resource/image/3c/6d/3cdc8ac71b80929f4a94dfeb9ffe4b6d.jpg?wh=2254*1222)

安全与幂等

安全：请求方法不会“破坏”服务器上资源，不会有实质性修改，比如GET、POST。

幂等：多次执行相同操作，结果都是相同的。比如GET、POST、DELETE多次删除一个资源，结果都一样。

#### 2.4 你能写出正确的网址吗

![](https://static001.geekbang.org/resource/image/ff/38/ff41d020c7a27d1e8191057f0e658b38.png?wh=2023*383)

#### 2.5 响应状态码改怎么用

状态码种类：

- 1xx: 提示信息，表示目前是协议处理的中间状态，还需要后续处理。
- 2xx: 成功，报文已经收到并被正确处理。
- 3xx: 重定向，资源位置发生变动，需要客户端重新发送请求。
- 4xx: 客户端错误，请求报文有误，服务端无法处理。
- 5xx: 服务端错误，服务器在处理请求时内部发生错误。

常见状态码：

- 101: Switching Protocols，客户端使用 Upgrade 头字段，要求**切换协议**继续通信，比如 WebSocket。
- 200: Ok, 请求成功。
- 204: No Content，与200类似，但是body里**没有数据返回**。
- 206: Partial Content, 与200类似，但是**返回的只是部分数据**，分段下载或断点续传数据，常与Content-Range使用。
- 301: Moved Permanently, 永久重定向。
- 302: Found, 临时重定向。
- 304: Not Modified, 缓存重定向。
- 400: Bad Request, 请求报文有误。
- 403: Forbidden, 禁止资源访问。
- 404: Not Found, 资源未找到。
- 500: Internal Server Error, 服务出错。
- 501: Not Implemented, 功能暂未支持。
- 502: Bad Gateway, 服务器正常，走网关、代理时发生错误。
- 503: Service Unavailable, 服务繁忙，暂时无法响应请求。

#### 2.6 http有哪些特点

1. http是灵活可扩展的，可以任意添加头字段实现任意功能。
2. http是可靠传输协议，基于TCP/IP协议“尽量”保证数据的送达。
3. http是应用层协议，比FTP、SSH等通用功能更多，能够传输任意数据。
4. http使用了请求-应答模式，客户端主动发起请求，服务器别动响应数据。
5. http本质是无状态的，每个请求都是互相独立、毫无关联的，协议不要求客户端或服务端记录请求相关信息。

#### 2.7 http有哪些有点，哪些缺点
