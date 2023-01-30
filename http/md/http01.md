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

#### 2.7 http有哪些优点，哪些缺点

优点：

1. 简单、灵活、可扩展。报文部分是灵活，可自定义的，扩展性强。
2. 应用广泛、环境成熟。http可传输各种类型数据，web页面，JSON、XML数据，不受限与某种语言、某个平台。各种编程语言都有HTTP调用库。

双刃剑：

1. 无状态。服务器间无需状态实现，减轻压力，没有状态差异，可以很容易的组成集群，让负载均衡把请求转发到另一台服务器。没有“记忆功能”，无法支持“事务”操作，几个连续操作服务器是不知道的，还好有Cookie。
2. 明文。不适用二进制流传输，为抓包、开发提供很大帮助。但普通文本传输，一些敏感信息直接暴露，还好有https。

缺点：

1. 不安全。没有“身份认证”，无法知道请求方、应答方是谁。不支持数据完整性，内容容易被篡改。https也是为了解决这些问题。
2. 性能。“不算差，不够好”，http基于TCP/IP，TCP/IP性能是很好的，在现在复杂网络环境下，移动、高并发就显得基于TCP/IP的http性能就没那么好，“请求-应答”模式是关键，当一个请求未被及时应答时，后面的请求也就被阻塞，这就是常说的**对头阻塞**。web性能优化便出现，不过终极解决方案还得是HTTP/2、HTTP/3.

#### 3.1 HTTP的实体数据

- 数据类型 MIME type：实体数据是什么，相关字段

    ```sh
        # 请求字段，想要什么样数据格式
        Accept: text/html,application/xml,image/webp,image/png
        # 实体字段，body是什么类型数据格式
        Content-Type: text/html
    ```

- 数据编码：实体数据压缩方式

    ```sh
        # 请求字段，标记客户端支持压缩方式（如果不存在表示客户端不支持压缩数据）
        Accept-Encoding: gzip, deflate, br
        # 响应字段，响应数据使用什么格式压缩（如果不存在表示响应数据没有被压缩）
        Content-Encoding: gzip
    ```

- 语言类型：实体数据的自然语言

    ```sh
        # 请求字段，客户端想要的语言类型
        Accept-Language: zh-CN, zh, en
        # 响应字段，响应数据使用的语言类型
        Content-Language: zh-CN
    ```
- 字符集：实体数据的编码方式

    ```sh
        Accept-Charset: gbk, utf-8
        Content-Type: text/html; charset=utf-8
    ```

- 内容协商：通过Accept-*等一系列字段，商定数据内容

    ```sh
        # q代表权重，0-1，0:不接受, 用分号隔开。在http中逗号比分号层级大
        Accept: text/html,application/xml;q=0.9,*/*;q=0.8
        # 响应字段，服务器最终返回内容格式，参考这些字段得出结果，可看作响应数据的一个“版本标记”，Accept变化，这个字段也会跟着变化
        Vary: Accept-Encoding,User-Agent,Accept
    ```

#### 3.2 HTTP传输大文件的方法

1. 数据压缩
对文本有显著提升，对于视频、音频本身就压缩过就没什么效果。
    ```sh
        Accept-Encoding: gzip,deflate,br
        Content-Encoding: gzip
    ```
2. 分块传输
    ```sh
        Transfer-Encoding: chunked
    ```
每个分块数据chunk分为两部分，分块长度、分块数据，以分块长度0结束。由于分块传输不知道长度，故与**Content-Type互斥**。
![](https://static001.geekbang.org/resource/image/25/10/25e7b09cf8cb4eaebba42b4598192410.png?wh=3000*1681)
3. 范围请求
    如果我想对一个视频进行快进，拖动进度条，从某部分开始，这时分块传输就不实现不了。“范围请求”允许在请求头里使用专用字段获取某一部分文件。
    ```sh
        Accept-Ranges: bytes
        Range: bytes=0-31
    ```
    服务器在收到Range字段后，需要做四件事。

        1. 检查范围是否在合法，范围越界返回416.
        2. 范围正确，读取文件片段，返回206，表示原数据一部分。
        3. 添加响应头字段**Content-Range**，告诉片段偏移量
            HTTP/1.1 206 Partial Content
            Content-Length: 32
            Accept-Ranges: bytes
            Content-Range: bytes 0-31/96
4. 多段数据
    MIME类型：multipart/byteranges，表示报文body由多段字节序列组成，并且还要用一个参数**boundary=xxx**给出段之间的标记。
![](https://static001.geekbang.org/resource/image/ff/37/fffa3a65e367c496428f3c0c4dac8a37.png?wh=3000*1681)

```sh
# 每一个分段以“--boundary”开始（前面两个-），
# 之后用Content-Type，Content-Range标记数据类型，范围，回车结束，
# 最后以“--boundary--”结束（前后各有两个-）
HTTP/1.1 206 Partial Content
Content-Type: multipart/byteranges; boundary=00000000001
Content-Length: 189
Connection: keep-alive
Accept-Ranges: bytes


--00000000001
Content-Type: text/plain
Content-Range: bytes 0-9/96

// this is
--00000000001
Content-Type: text/plain
Content-Range: bytes 20-29/96

ext json d
--00000000001--
```

#### 3.3 HTTP的连接管理

- 短连接

在早期http0.9/1.0版本，每次请求都需要先建立连接，收到响应后关闭连接。意味着每个请求都需要三次握手，四次挥手。效率低下。
![](https://static001.geekbang.org/resource/image/54/0c/54315ed9ac37fbc6547258040f00a80c.png?wh=1100*1585)

- 长连接

多个请求，只需要建立一次连接。
```sh
# 通用字段，告诉客户端，支持长连接
Connection: keep-alive
# 通用字段，关闭长连接
Connection: close
```
服务端通常不会主动关闭连接，一般设置**keepalive_timeout、keepalive_requests**超时、请求次数，达到设置限制后，服务端就会返回Connection: close。
![](https://static001.geekbang.org/resource/image/57/b4/57b3d80234a1f1b8c538a376aa01d3b4.png?wh=1400*1140)

#### 3.4 HTTP的重定向和跳转

> 重定向是服务器发起的跳转

> 重定向的过程

301永久重定向，302临时重定向。当客户端读取到这类重定向状态码是，会去寻找**Location**字段，如果是站内跳转，提取**URI**，拼接两者，跳转到拼接后地址；站外跳转，需要给出具体的URI（包括协议、域名等）。

```sh
    # 只有code是重定向码时这个字段才有用
    Location: /index.html
```

> 重定向状态码

301：永久重定向，URI已经“永久”性不存在。
302：临时重定向，URI处于“临时维护”状态。
303：See Other，类似302，但是要求重定向后的请求方法改为GET，访问一个结果也，避免POST/PUT等操作方法。
307：Temporary Redirect，类似302，但重定向后请求里的方法和实体不允许更改。
308：Permanent Redirect，类似307，不允许重定向后的请求变动，但它是301“永久重定向”的含义。

> 重定向的应用场景

1. 资源不可用。例如域名变更、服务器变更、网站改版、系统维护，避免出现404，重定向到新的URI。
2. 避免重复。多个网址转到一个URI，增加访问入口的同时还不增加额外的工作。

> 重定向的相关问题

1. 性能损耗。重定向实质是两次请求，虽然重定向报文很小，但大量的跳转对服务器的消耗也是不可忽略的。站外重定向还得需要开启两个连接（客户端需要和两个服务端分别建立连接），网络不好，会严重影响体验。站内重定向可理解为站内router跳转，只需要和一个服务端建立连接。
2. 循环跳转。重定向的策略设置欠缺考虑，出现A => B => C => A。

#### 3.5 HTTP的cookie机制

> 什么是cookie

http是无状态，使得服务器没有记忆能力，cookie机制是服务器给客户端贴小纸条，帮助服务器认出是谁发送请求。

> cookie工作过程

```sh
# 响应字段，服务器可以发送多个Set-Cookie
Set-Cookie: name=xxx
# 请求字段，浏览器会将收到的多个cookie写入到Cookie中
Cookie: name=xxx
```
![](https://static001.geekbang.org/resource/image/9f/a4/9f6cca61802d65d063e24aa9ca7c38a4.png?wh=2100*921)

> cookie属性

Expires: 过期时间，用的是绝对时间点，截止日期。
Max-Age: 用的是相对时间，单位是**秒**，过期时间 = 浏览器收到报文时间 + Max-Age，优先级大于Expires。
Domain: cookie所属域名。
Path: cookie所属路径。浏览器在发送cookie前会取URI中host、path与Domain、Path对比。
HttpOnly: 只允许cookie传输，不允许其它操作，比如document.cookie读出，避免XSS跨站脚本攻击。
SameSite: 可以防范跨站请求伪造。值为**Strict**，严格限定Cookie不能随着跳转链接跨站发送；值为**Lax**，允许GET/HEAD等安全方法，但禁止POST跨站发送；值为**Secure**，只允许HTTPS协议加密传输，HTTP协议会禁止发送。

> cookie应用

身份识别：登录信息等。
广告跟踪：广告商在浏览该平台时服务器给客户端贴上标签，再次访问该广告商其它平台时，会识别之前保存的cookie信息，定向推送广告。这种cookie别叫作“第三方Cookie”。

#### 3.6 HTTP缓存机制

> 服务器的缓存控制

1. 浏览器发现本地无缓存，于是向服务器发送请求获取资源。
2. 服务器成功响应请求返回需要资源，同时**标记过期时间**。
3. 浏览器缓存资源，等待下次重用。
![](https://static001.geekbang.org/resource/image/a1/5b/a1968821f214df4a3ae16c9b30f99a5b.png?wh=1876*1062)

Cache-Control: （通用字段）
1. max-age: **生存时间**,告诉浏览器资源能够缓存多久，单位是**秒**，该时间是从**报文创建时间算起**，也就是服务端返回开始计时。
2. no-store: **不允许缓存**，用于某些频繁变化的数据，比如秒杀页面。
3. no-Cache: **可以缓存**，但在使用之前会先去服务端确认是否过期，是否是最新资源。
4. must-revalidate: 如果缓存没过期就继续使用缓存，否则去服务端获取最新的资源。

![](https://static001.geekbang.org/resource/image/1b/99/1b4f48bc0d8fb9a08b45d1f0deac8a99.png?wh=1100*1425)

> 客户端的缓存控制

**Ctrl + F5 === Cache-Control: no-Cache**

前进、后退按钮会发现状态码后面有“from disk cache”字样，意思是读取磁盘缓存。

> 条件请求

![](https://static001.geekbang.org/resource/image/b2/37/b239d0804be630ce182e24ea9e4ab237.png?wh=1764*879)

Etag: 资源唯一标识，主要解决**修改时间无法区分文件变化**的问题。Etag也分强弱，强Etag要求资源在**字节级别必须完全符合**，弱Etag在值前有个“**W/**”标记，只要求资源**语义上**没有变化，但内部可能会有部分发生了变化。

```sh
    # 修改时间上区分资源是否是最新
    if-Modified-Since
    Last-modified

    # 文件内容语义上区分资源是否是最新
    If-None-Match
    Etag: （弱）W/xxx

    # 文件字节上区分资源是否是最新
    If-None-Match
    Etag: （强）xxx
```

#### 3.7 HTTP代理服务

> 代理的作用

- 负载均衡：http是无状态，服务器对请求都会去处理，在大流量下，可以通过代理服务器将流量分流到空闲服务器去处理。
- 健康检查：使用“心跳”等机制监控后端服务器，发现有故障就及时“踢出”集群，保证服务高可用。
- 安全防护：保护被代理的后端服务器，限制 IP 地址或流量，抵御网络攻击和过载；
- 加密卸载：对外网使用 SSL/TLS 加密通信认证，而在安全的内网不加密，消除加解密成本；
- 数据过滤：拦截上下行的数据，任意指定策略修改请求或者响应；
- 内容缓存：暂存、复用服务器响应。

> 代理相关头字段

```sh
    # 通用字段，每当报文经过一个代理节点，代理服务器就会把自身信息追加到末尾
    # 只解决客户端和服务端是否存在代理问题，不知道对方真实信息
    Via: proxy1,proxy2
```
![](https://static001.geekbang.org/resource/image/52/d7/52a3bd760584972011f6be1a5258e2d7.png?wh=2000*687)

```sh
    # 非标准字段
    X-Forward-For: 与Via只追加代理服务器不用，它追加记录请求方地址，所以第一个是客户端地址
    X-Real-IP: 客户端真实 IP
    X-Forward-Host: 客户端域名
    X-Forward-Proto: 客户端协议名
```
![](https://static001.geekbang.org/resource/image/c5/e7/c5aa6d5f82e8cc1a35772293972446e7.png?wh=1227*1120)

> 代理协议

```sh
    # PROXY TCP版本号 客户端ip 服务器ip 客户端端口号 服务端端口号
    PROXY TCP4 1.1.1.1 2.2.2.2 55555 80\r\n
    GET / HTTP/1.1\r\n
    Host: www.xxx.com\r\n
    \r\n
```

#### 3.8 HTTP缓存代理

> 缓存代理服务

如果没有缓存，代理服务器每次响应都需要去访问源服务器，这样浪费掉许多带宽。

它“既是客户端，也是服务器”，“既不是客户端，也不是服务器”，通过Cache-Control

> 源服务器的缓存控制

```sh
    # 缓存只能在客户端保存
    private
    # 缓存完全开放
    public
    # 代理缓存过期需要向源服务器验证, 客户端不必回源
    proxy-revalidate
    # 限定在代理服务器上存活时间
    s-maxage
    # 代理有时会对资源进行优化，比如把图片生成png、webp格式，该属性会禁用掉这些操作
    no-transform
```
![](https://static001.geekbang.org/resource/image/09/35/09266657fa61d0d1a720ae3360fe9535.png?wh=1076*1778)

> 客户端缓存控制
```sh
    # 缓存过期x后仍然可以使用，单位为秒
    max-stale: x
    # 缓存必须有效，并且在x秒后仍然有效
    min-fresh: x
    # 不接收源服务器资源，只接受代理缓存
    only-if-cached
```
![](https://static001.geekbang.org/resource/image/47/92/47c1a69c800439e478c7a4ed40b8b992.png?wh=1086*1823)

> 其他问题

1. Vary，协商后编码、版本等信息，必须要保存。缓存对比会参考这些字段信息。
2. Purge，缓存清理，过期数据，旧版本数据，无用谣言数据等，通常可通过自定义请求方法“PURGE”，要求代理服务器删除。

#### 4.1 HTTPS是什么，SSL/TLS又是什么

> 什么是安全

通信过程具备4个特性被认为是“安全”的，**机密性、完整性、身份认证、不可否认**。

- 机密性：数据保密，只能由可信人访问。
- 完整性：传输过程中数据不会被篡改。
- 身份认证：确认收信方身份，确保对方可信。
- 不可否认：不能否认已经发生过行为。

> 什么是HTTPS

它为http增加了上面说到的4点。

表面上看除协议名、端口号不同于http外，其余都和http一样。

HTTPS实质是在TCP/IP与HTTP之间加入**SSL/TLS**层，即HTTPS = HTTP + SSL/TLS.

![](https://static001.geekbang.org/resource/image/50/a3/50d57e18813e18270747806d5d73f0a3.png?wh=2057*810)

> SSL/TLS

前生叫做SSL，后来标准化后叫做TLS。目前广泛使用的是TLS1.2，而之前的TLS1.1/1.0、SSL2/3都是不安全的。

浏览器和服务端在使用TLS建立连接时需要选择一组恰当的加密算法来实现安全通信，这些算法被称为”密码套件“。
```sh
    # 密钥交换算法 + 签名算法(非对称加密，保证身份认证、不可否认) + 对称加密算法(保证机密性) + 摘要算法（保证完整性）
    # 例如下面例子：握手时使用ECDHE算法进行密钥交换，用RSA签名和身份认证，
    # 握手后的通信使用AES对称算法，密钥长度为256，分组模式是GCM，摘要算法SHA384用于消息认证和产生随机数。
    ECDHE-RSA-AES256-GCM-SHA384
```

#### 4.2 对称加密和非对称加密

> 对称加密

加密、解密使用同一密钥，是对称的。

![](https://static001.geekbang.org/resource/image/8f/49/8feab67c25a534f8c72077680927ab49.png?wh=1869*838)

常见对称加密算法：AES、ChaCha20.

> 加密分组模式

对称算法分组模式，让算法用**固定长度的密钥**加密**任意长度的明文**。

常用：GCM、CCM、Poly1305.

把上面这些组合起来就有了对称加密算法，比如AES128-GCM，意思是密钥长度为128（即16个字节）的AES算法，使用的分组模式是GCM，明文以16字节为一组加密。

> 非对称加密

对称加密存在一个问题，怎样把密钥安全的交给对方。对称加密只要持有密钥就可以解密，在传输过程中被劫持，那之后的信息就没有安全可言。

非对称加密，它有两把钥匙”公钥“和”私钥“。两个密钥是不同的，一方加密后，只能由另一方解密。

常用非对称加密：RSA、ECC

![](https://static001.geekbang.org/resource/image/89/17/89344c2e493600b486d5349a84318417.png?wh=1938*1212)

> 混合加密

既然非对称加密解决了”密钥交换“问题，是否可以直接使用非对称加密，抛弃对称加密？

虽然非对称加密解决了”密钥交换“问题，但它的算法十分复杂，加密耗时相比对称加密长多了。

```sh
    # 对称加密耗时
    aes_128_cbc enc/dec 1000 times : 0.97ms, 13.11MB/s

    # 非对称加密耗时
    rsa_1024 enc/dec 1000 times : 138.59ms, 93.80KB/s
    rsa_1024/aes ratio = 143.17

    rsa_2048 enc/dec 1000 times : 840.35ms, 15.47KB/s
    rsa_2048/aes ratio = 868.13
```

混合加密：使用非对称加密*公钥*加密对称加密的密钥，非对称加密*私钥*解密对称加密密钥，这样解决”密钥交换“问题，后续使用加密后的对称加密密钥加密明文传输。

![](https://static001.geekbang.org/resource/image/e4/85/e41f87110aeea3e548d58cc35a478e85.png?wh=1410*947)

#### 4.3 数字签名与证书

传输的机密性通过密钥加密得到保证，如果恶意人员通过截取会话，修改、重组后发送给网站。因为没有完整性保证，服务器只能”照单全收“。通过服务器的响应从而进一步获得线索，破解明文。

> 摘要算法

实现**完整性**的手段主要是**摘要算法**，也就是常说的散列函数、哈希函数。

摘要算法可以理解成，将一段信息通过计算生产一段长度固定，独一无二的”摘要“字符串，就好像信息的文件指纹。

常说的摘要算法：MD5、SHA-1、SHA-2，前两者安全强度比较低，现已被TLS禁用。SHA-2总共有6种，常用的有SHA224、SHA256、SHA384。

> 完整性

摘要算法是不具备机密性的，明文传输会和消息一同被修改，所以，真正的完整性需要建立在机密性上，在混合加密系统中可以使用**会话密钥加密消息和摘要**（哈希消息认证码）。

![](https://static001.geekbang.org/resource/image/c2/96/c2e10e9afa1393281b5633b1648f2696.png?wh=2000*695)

> 数字签名

黑客可以伪装成网站窃取信息，也可以伪装成服务端发送支付等信息。为了解决类似这种问题，TLS添加数字签名，就像签名、印章一样。

通过非对称加密里的**私钥加密**，**公钥解密**。由于非对称加密效率太低，所以只加密原文的摘要，这样运算量就小很多。

![](https://static001.geekbang.org/resource/image/84/d2/84a79826588ca35bf6ddcade027597d2.png?wh=1375*1252)

> 数字证书和CA

由于谁都可以发布公钥，公钥可能被伪造，为了解决此问题，建立可信机构CA（证书认证机构）。

小一点的CA可以让大CA签名认证，但链条最后的CA也需要认证，该CA被叫做”自签名证书“或者”根证书“，自己信任自己。

![](https://static001.geekbang.org/resource/image/8f/9c/8f0813e9555ba1a40bd2170734aced9c.png?wh=1300*1292)

#### 4.4 TLS1.2连接过程解析

> TLS协议构成

- 记录协议
    规定了 TLS 收发数据的基本单位：记录（record）。
- 警报协议
    向对方发出警报信息，有点像是 HTTP 协议里的状态码。
- 握手协议
    TLS 里最复杂的子协议，要比 TCP 的 SYN/ACK 复杂的多，浏览器和服务器会在握手过程中协商 TLS 版本号、随机数、密码套件等信息，然后交换证书和密钥参数，最终双方协商得到会话密钥，用于后续的混合加密系统。
- 变更密码规范协议
    一个“通知”，告诉对方，后续的数据都将使用加密保护

![](https://static001.geekbang.org/resource/image/69/6c/69493b53f1b1d540acf886ebf021a26c.png?wh=2093*1865)

> ECDHE握手过程

![](https://static001.geekbang.org/resource/image/9c/1e/9caba6d4b527052bbe7168ed4013011e.png?wh=870*1979)

> RSA握手过程

![](https://static001.geekbang.org/resource/image/cb/d2/cb9a89055eadb452b7835ba8db7c3ad2.png?wh=1000*1651)

> 双向认证

上面握手过程都是**单向认证**，有时为了更加安全采用**双向认证**，比如银行，使用U盾给客户端颁发证书，实现**双向认证**。

#### 4.5 TLS1.3特性解析

> 最大兼容性

在早期实验中，一旦更改记录头字段里面的版本号，TLS1.2 => TLS1.3，许多代理服务器，网关都无法正常处理.

“向后兼容”，握手消息后面必须有“supported_versions”标记TLS版本号。

> 强化安全

对TLS1.2进行瘦身，废除大量不安全的对称加密算法、传统分组模式、摘要算法、密钥交换算法、椭圆曲线。

最后剩下五种加密套件：

|密码套件|代码|
|---|---|
|TLS_AES_128_GCM_SHA256|{0x13,0x01}|
|TLS_AES_256_GCM_SHA384|{0x13,0x02}|
|TLS_CHACHA20_POLY1305_SHA256|{0x13,0x03}|
|TLS_AES_128_CCM_SHA256|{0x13,0x04}|
|TLS_AES_128_CCM_8_SHA256|{0x13,0x05}|

为什么废除RSA？

rsa加密，拿到服务端公钥后，利用该公钥加密客户端生成pre-master随机数，服务端公钥是不变的，如果服务端私钥泄露或则被破解，以往所有截获的消息都会被破解。而ECDHE每次握手都会生成一对零时公钥和私钥，就算被破解也只有此条消息。

> 提升性能

节俭密钥交换步骤。

![](https://static001.geekbang.org/resource/image/4d/b0/4d1df4d07dbb1c2500fc4ea69ecf7ab0.png?wh=2055*1925)

客户端在“Clinet Hello”消息里直接用 **supported_groups**带上支持的曲线， **supported_versions**带上支持的TLS版本， **supported_algorithms**带上签名算法，**key_share**带上曲线对应的客户端公钥参数。
服务端收到后，在这些扩展里选定一个曲线和公钥参数，再用 **key_share** 带上服务端这边的公钥参数返回，这样就实现了双方的密钥交换。

> 握手分析

![](https://static001.geekbang.org/resource/image/7a/db/7a2bc39fdbb421cf72a01e887e9156db.png?wh=900*1840)

#### 4.6 HTTPS的优化

- 硬件优化
- 软件优化
- 协议优化
- 证书优化
- 会话复用
- 会话票据
- 预共享密钥

#### 4.7 我们应该转义移到HTTPS吗

- 迁移必要性

各个平台，应用商店强制使用https才能上架应用。谷歌对http网站打上“不安全”标签，并且搜索引擎优先排https网站。升级到https是必然的。

- 迁移的顾虑

1. 慢。现今的https，经过优化后，访问速度和http已经相差无异。
2. 贵。证书申请和维护成本高。CA证书申请不仅麻烦而且还需要付费。但也有免费办法CA证书的“Let's Encrypt”。
3. 难。学习成本高，不是短期就能精通，但我们只需要使用也无需考虑这些。

- 申请证书

根据相关申请文档操作，这里不作详细说明。

注意事项：
1. 申请证书时应当同时申请 RSA 和 ECDSA 两种证书，在 Nginx 里配置成双证书验证，这样服务器可以自动选择快速的椭圆曲线证书，同时也兼容只支持 RSA 的客户端。
2. 如果申请 RSA 证书，私钥至少要 2048 位，摘要算法应该选用 SHA-2，例如 SHA256、SHA384 等。
3. 出于安全的考虑，“Let’s Encrypt”证书的有效期很短，只有 90 天，时间一到就会过期失效，所以必须要定期更新。你可以在 crontab 里加个每周或每月任务，发送更新请求，不过很多 ACME 客户端会自动添加这样的定期任务，完全不用你操心。

- 配置HTTPS

```sh
listen                443 ssl;

ssl_certificate       xxx_rsa.crt;  #rsa2048 cert
ssl_certificate_key   xxx_rsa.key;  #rsa2048 private key

ssl_certificate       xxx_ecc.crt;  #ecdsa cert
ssl_certificate_key   xxx_ecc.key;  #ecdsa private ke


ssl_protocols               TLSv1.2 TLSv1.3;

ssl_session_timeout         5m;
ssl_session_tickets         on;
ssl_session_ticket_key      ticket.key;


ssl_prefer_server_ciphers   on;

ssl_ciphers   ECDHE-ECDSA-AES256-GCM-SHA384:ECDHE-RSA-AES256-GCM-SHA384:ECDHE-RSA-AES128-GCM-SHA256:ECDHE-RSA-CHACHA20-POLY1305:ECDHE+AES128:!MD5:!SHA1;
```

#### 5.1 HTTP/2特性概览

> 兼容 HTTP/1

> 头部压缩

HTTP/2没有使用传统得压缩算法，专门开发“HPACK”算法。

> 二进制格式

相比HTTP/1，不存在大小写、回车、换行等歧义问题，体积小，速度快。

将数据分成一小块一小块传输。
HEADERS Frame：头部帧，存放头数据。
DATA Frame：主体帧，存放实体数据。

![](https://static001.geekbang.org/resource/image/8f/96/8fe2cbd57410299a1a36d7eb105ea896.png?wh=1236*366)

> 虚拟得“流”

1. HTTP/2传输的是有**顺序的数据帧**，每个帧数据都分配唯一ID，根据这些ID将数据组装起来就是HTTP/1报文。

2. 正是传输的数据帧，然后拼接，HTTP/2就可以在一个TCP连接上**同时发送多个数据帧**，这就是常说的“**多路复用**”。

3. 打破传统的“**请求-应答**”模式，服务器不在完全被动地响应请求，也可以新建“流”主动向客户端发送。

> 强化安全

出于兼容，HTTP/2延续HTTP/1的“明文”特点，可以使用明文传输，不强制使用加密通信，不过格式还是二进制。

但现今主流浏览器Chrome、Firefox都公开宣布**只支持**加密的HTTP2。所以现今互联网所见的HTTP/2都是使用https，且TLS必须是**1.2+**版本。

HTTP/2协议定义了两个字符串标识符：**h2**表示加密的HTTP/2，**h2c**表示明文的HTTP/2.

> 协议栈

![](https://static001.geekbang.org/resource/image/83/1a/83c9f0ecad361ba8ef8f3b73d6872f1a.png?wh=1227*632)

#### HTTP/2内核剖析

> 连接前言

HTTP/2是基于TLS，任然会有TCP握手、TLS握手。在TLS握手成功后，客户端必须发送一个“**连接前言**”，用来确认建立HTTP/2连接。

```sh
    # 请求方法是特别注册的一个关键词“PRI”
    PRI * HTTP/2.0\r\n\r\nSM\r\n\r\n
```

> 头部压缩

语义上兼容HTTP/1，所以报文还是有“Header + Body”组成，但在发送前必须要用“**HPACK**”压缩头部数据。

“HPACK”算法是专门压缩HTTP头部定制的算法，它是一个“有状态”的算法，需要客户端和服务器**各自**维护一份“索引表”，压缩和解压缩就是查表和更新表的操作。

为了方便管理和压缩，HTTP/2废除了起始行概念，把请求方法、URI、状态码等统一转换成头字段的形式（key-value），这类字段被称为**伪头字段**，名字前面加上一个“ **:** ”，对照表信息，每次传输只需要传输表中字段所对应**索引Index**，大大减小传输体积。
![](https://static001.geekbang.org/resource/image/76/0c/769dcf953ddafc4573a0b4c3f0321f0c.png?wh=1142*719)

> 二进制帧

报文头只有9个字节。

![](https://static001.geekbang.org/resource/image/61/e3/615b49f9d13de718a34b9b98359066e3.png?wh=1142*575)
![](https://static001.geekbang.org/resource/image/57/03/57b0d1814567e6317c8de1e3c04b7503.png?wh=1142*585)

- 帧长度（Length）
- 帧类型（TYPE）：可分为数据帧（DATA、HEADERS）、控制帧（SETTINGS、PING、PRIORITY）
- 标志位（Flags）：可以保存8个标志位，携带简单的控制信息。常用的有**END_HEADERS**(头数据结束)，**END_STREAM**（单方向数据发送结束）.
- 流标识符：存放“流”的ID，根据它按顺序组装乱序的帧数据。

> 流与多路复用

一个HTTP/2的流等同于HTTP/1里的“请求-应答”。

流是可并发的，一个HTTP/2连接上可以同时发出多个流传输数据，也就是并发多请求，实现“多路复用”。

> 流状态转换

![](https://static001.geekbang.org/resource/image/d3/b4/d389ac436d8100406a4a488a69563cb4.png?wh=1142*941)

idle => open => half closed => closed
未开启流 => 客户端发送数据 => 服务端响应数据 => 关闭流（未关闭连接）



