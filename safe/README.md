## 跨站脚本攻击xss

有两种类型：

1. 持久型

        将恶意代码被服务端写入到数据库中

        例子：评论功能，输入恶意脚本，被保存到数据库，用户访问时展示执行
    
2. 非持久型
    
        针对个人，一般将代码写入到页面中

        例子：页面中会获取链接上query，query中带有恶意脚本，就会被执行

防范：

        转义字符

## 跨站请求伪造csrf

利用用户cookie访问后台服务

防范：

        主要针对请求接口做防范。
        1. 设置referer，判断请求是否是第三发网站发起；
        2. 请求带上随机token
        3. cookie上加上httpOnly，不让读取cookie
        4. 数据提交使用post

## 点击劫持

一种视觉欺骗攻击，将网站通过iframe嵌入到自己网站中，透明化iframe背景，在网页中暴露一个诱导按钮，点击执行恶意脚本。

防范：

    1. http响应头设置X-FRAME-OPTIONS；
    2. js判断top和self窗口是否一致；

## 中间人攻击

同时连接上客户端和服务端，并让对方认为通信是安全的，实质监控这全过程。

防范：

        https密文传输

## opener

a使用一下方式打开页面b，页面b中window.opener可以访问a页面

1. &lt;a target="_blank" href=""/ &gt;
2. window.open()

例子：

        a: window.open('https://b.html')
        b: window.opener.location = 'www.bilibili.com'
