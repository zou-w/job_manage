## 项目介绍
react + antd + axios +scss + redux
分权限路由匹配:个人和企业两个权限,对应不同的路由

## 1.useState 更改值后没有立即变化

1.useState 更新是异步的。也就是说，当我们调用 setState 函数时，React 会将状态更新放入队列中，并在下一次渲染时应用该更新。因此，当我们在调用 setState 之后立即读取状态的值时，读取的值仍然是旧的值。

2.可以使用 es6 语法,将其赋值给其他变量,使用其他变量去改变想要改变的变量

```js
//
const [getData, setGetData] = useState({});
let midVar = { ...getData };
midVar.id = xxx;
```

## 2.使用 BrowserRouter 打包后页面为空白

HashRouter 替换后可以正常显示页面

## 3.在获取输入框的值时,使用 ref+useState 获取值会有延迟

因为 useState 是在组件下一次渲染时才更新,在调用 setState 后不会立即更新,使用 onChange+防抖可以获取新值

```js
const debounce = useCallback((fn, delay = 500) => {
  let timeoutId;
  return function (...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      fn.apply(this, args);
    }, delay);
  };
}, []);
//更新输入消息
const handleInputChange1 = useCallback(
  debounce((event) => {
    setRegisterInfo({
      ...registerInfo,
      account: event.target.value,
    });
  })
);
```
### 演示截图
![QQ%E5%9B%BE%E7%89%8720231008213140.png](https://p.sda1.dev/13/2b89558448af4e6d7929e8e5d8fc8786/QQ图片20231008213140.png)
![QQ%E5%9B%BE%E7%89%8720231008213144.png](https://p.sda1.dev/13/e26ec5e3246e6bcc9ae0f4dbf696fda2/QQ图片20231008213144.png)
![QQ%E5%9B%BE%E7%89%8720231008213341.png](https://p.sda1.dev/13/620e37116f03573751d0e5e57407fd14/QQ图片20231008213341.png)
![QQ%E5%9B%BE%E7%89%8720231008213124.png](https://p.sda1.dev/13/974e63aa56f1654daa0a253de0d8d4ff/QQ图片20231008213124.png)
![QQ%E5%9B%BE%E7%89%8720231008213200.png](https://p.sda1.dev/13/f2f44821e81d479968b94a7e0c240078/QQ图片20231008213200.png)
![QQ%E5%9B%BE%E7%89%8720231008213015.png](https://p.sda1.dev/13/b2e692f497747cf83ff7561f31bb5444/QQ图片20231008213015.png)
![QQ%E5%9B%BE%E7%89%8720231008213239.jpg](https://p.sda1.dev/13/b8e15a4223735ee7e0e2178298538b77/QQ图片20231008213239.jpg)
![QQ%E5%9B%BE%E7%89%8720231008213331.png](https://p.sda1.dev/13/ec573858e831be7ad0ffe0832fece475/QQ图片20231008213331.png)
![QQ%E5%9B%BE%E7%89%8720231008213148.png](https://p.sda1.dev/13/8ed17ff276596cca5155e9310608afc0/QQ图片20231008213148.png)
