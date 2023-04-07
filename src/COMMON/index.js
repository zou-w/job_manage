import {
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";

const personRouter = [
  {
    path: "home",
    name: "首页",
    icon: <UserOutlined />,
  },
  {
    path: "deliveryRecord",
    name: "投递记录",
    icon: <UserOutlined />,
  },
  {
    path: "personUser",
    name: "个人中心",
    icon: <UserOutlined />,
  },
];
const companyRouter = [
  {
    path: "talentPool",
    name: "人才库",
    icon: <UserOutlined />,
  },
  {
    path: "jobHunter",
    name: "求职者",
    icon: <UserOutlined />,
  },
  {
    path: "jobs",
    name: "职位",
    icon: <UserOutlined />,
  },
  {
    path: "user",
    name: "个人中心",
    icon: <UserOutlined />,
  },
];

export { personRouter, companyRouter };
