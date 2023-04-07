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

## 3.使用 antd 中的 message 组件时,遇到的问题

### (1)不触发的问题

_在 antd 中的 model 组件中,点击 ok 后不会触发 message 组件_

## 4.在获取输入框的值时,使用 ref+useState 获取值会有延迟

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
