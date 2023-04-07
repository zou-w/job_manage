import React, { memo } from "react";

//引入路由表
import { useRoutes } from "react-router-dom";
import routes from "@/router/index";

export default memo(function App() {
  return (
    <>
      <div>{useRoutes(routes)}</div>
    </>
  );
});
