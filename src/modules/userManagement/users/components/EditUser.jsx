import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import { TabComponent } from "@comps/components";
import { makeRequest,notify } from "@utils/helpers";
import { getUser } from "../requests";

import BasicInformation from "./edit/BasicInformation";
import Permission from "./edit/Permission";
import { GetSettings } from "@mods/commons/settings/GetSettings";
import SettingsIcon from "../../../../containers/components/menu/icons/SettingsIcon";


const pageConfig = {
  headers: {
    title: "Edit User",
    breadcrumb: [
      {
        name: "Users",
        path: "/user-management/users"
      },
      {
        name: "Edit",
      }
    ]
  }

}

const EditUser = () => {
  const { id } = useParams();
  const [loader, setLoader] = useState(true);

  const [data, setData] = useState({
    object: null,
    dependencies: []
  });



  useEffect(() => {
    getData();
    // eslint-disable-next-line
  }, []);

  const getData = () => {
    makeRequest(setLoader, getUser, id, onSuccess, onError);
  }

  const onSuccess = (res) => {
    setData(res);
  }


  const tabs = [
    {
      title: "Basic Information",
      icon:
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M11.0078 0.272156C9.40799 0.439915 8.10983 0.803755 6.77351 1.46495C3.91871 2.88264 1.74887 5.39736 0.78119 8.41968C0.39815 9.60768 0.23999 10.6805 0.23999 12.0266C0.24479 13.9186 0.60407 15.4944 1.42319 17.1758C2.93207 20.2654 5.73887 22.5598 9.03911 23.4026C10.1839 23.6947 10.5768 23.7379 12.0137 23.7379C13.1489 23.7379 13.3836 23.7235 13.92 23.6278C17.3208 23.0146 20.1708 21.1226 21.9573 18.2774C24.1608 14.7713 24.3571 10.3596 22.4748 6.66192C20.9947 3.74472 18.341 1.57008 15.1701 0.674397C14.1881 0.396477 13.3788 0.281515 12.2292 0.267355C11.664 0.257755 11.1132 0.262556 11.0078 0.272156ZM13.5463 1.2732C18.408 1.99656 22.1539 5.8476 22.7669 10.7573C22.8482 11.3705 22.8338 12.8122 22.7477 13.4158C22.3884 15.9305 21.306 18.0715 19.524 19.7911C17.3688 21.8746 14.6049 22.938 11.6304 22.8374C10.0161 22.7846 8.69423 22.4494 7.22375 21.731C2.68751 19.5036 0.31175 14.5126 1.43279 9.55968C1.60991 8.75976 1.84943 8.1036 2.26631 7.26048C2.97047 5.8332 3.86615 4.674 5.00135 3.73512C6.81191 2.23104 8.83319 1.40256 11.2233 1.182C11.6496 1.14384 13.0291 1.19664 13.5463 1.2732Z" fill="#0093CD" />
          <path d="M11.755 4.94232C10.9695 5.09568 10.4857 5.92896 10.7156 6.73368C10.8354 7.13112 11.233 7.5288 11.6305 7.64856C12.6939 7.95504 13.6758 7.04016 13.4077 5.99136C13.2687 5.44536 12.9286 5.10048 12.3874 4.96152C12.0855 4.88472 12.0615 4.87992 11.755 4.94232Z" fill="#0093CD" />
          <path d="M10.1694 9.12863V9.58367H10.6485H11.1275V13.6073V17.6309H10.6485H10.1694V18.0859V18.541H12.0613H13.9535V18.0859V17.6309H13.4745H12.9954V13.1522V8.67359H11.5823H10.1692V9.12863H10.1694Z" fill="#0093CD" />
        </svg>,
      content: <BasicInformation data={data.object} dependencies={data.dependencies} />
    },
    {
      title: "Permission",
      icon:
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M18.6649 23.7576L17.6209 22.1016C17.3137 22.1304 17.0017 22.1304 16.6873 22.1016L15.6217 23.7384L13.5385 22.884L13.9945 20.9904C13.7497 20.7888 13.5289 20.568 13.3345 20.3304L11.4289 20.7504L10.5697 18.684L12.2257 17.652C12.1993 17.3472 12.1993 17.0376 12.2257 16.7256L10.5841 15.6744L11.4649 13.6104L13.3561 14.0496C13.5625 13.8048 13.7881 13.5864 14.0305 13.3968L13.6081 11.4912L15.6937 10.656L16.7233 12.3072C17.0281 12.2784 17.3377 12.2784 17.6497 12.3072L18.6793 10.668L20.7673 11.5272L20.3281 13.4352C20.5849 13.644 20.8033 13.8624 20.9905 14.0928L22.8937 13.6392L23.7553 15.7128L22.0825 16.7568C22.1113 17.0664 22.1113 17.3736 22.0825 17.6808L23.7601 18.7128L22.8745 20.7792L20.9569 20.3424C20.7601 20.5824 20.5465 20.796 20.3113 20.988L20.7481 22.896L18.6649 23.7576ZM18.0265 21.2304L18.9865 22.7496L19.8097 22.4112L19.4065 20.6592L19.6225 20.5032C19.9465 20.2656 20.2249 19.9896 20.4721 19.6536L20.6281 19.44L22.3969 19.8432L22.7425 19.0368L21.2137 18.096L21.2521 17.8344C21.3097 17.4216 21.3097 17.0208 21.2521 16.6056L21.2161 16.344L22.7473 15.3888L22.4137 14.5848L20.6545 15.0024L20.4961 14.7768C20.2825 14.4696 20.0017 14.1888 19.6345 13.9176L19.4233 13.7592L19.8241 12.0144L19.0009 11.676L18.0601 13.1784L17.8009 13.1424C17.3857 13.0824 16.9753 13.0824 16.5769 13.1424L16.3153 13.1808L15.3673 11.6616L14.5489 11.988L14.9377 13.7448L14.7121 13.896C14.3881 14.1216 14.0929 14.4072 13.8337 14.7456L13.6753 14.952L11.9425 14.5512L11.5969 15.36L13.0921 16.3176L13.0561 16.5744C12.9985 16.9896 12.9985 17.4024 13.0561 17.8008L13.0945 18.0624L11.5801 19.0056L11.9161 19.812L13.6705 19.4256L13.8265 19.6392C14.0617 19.9632 14.3521 20.2536 14.6905 20.5032L14.9065 20.6616L14.4913 22.3944L15.3121 22.7328L16.2889 21.228L16.5457 21.2664C16.9585 21.3264 17.3689 21.3264 17.7673 21.2664L18.0265 21.2304ZM3.1105 21.528L1.1569 21.5016C0.840102 21.504 0.736902 21.1944 0.691302 21.06C0.660102 20.964 0.621702 20.8296 0.576102 20.664C0.504102 20.388 0.439302 20.1024 0.429702 20.0592L0.261702 19.2648C0.182502 18.7968 0.331302 18.12 0.602502 17.7264L0.604902 17.724L6.3121 9.5544C5.9233 8.724 5.6281 7.7232 5.5105 7.0968V7.092C5.3641 6.2472 5.4169 5.4216 5.6737 4.6344C5.9113 3.9 6.3169 3.2184 6.8785 2.6088C7.9417 1.452 9.4777 0.648002 11.2009 0.345602C12.8617 0.0480017 14.5369 0.415202 15.9217 1.38C17.3137 2.352 18.2401 3.8088 18.5329 5.484C18.7897 6.972 18.6481 8.496 18.1369 9.7728L18.0361 10.0272H17.4577C16.4785 10.0272 15.5209 10.2216 14.6113 10.6056H14.6089C13.7761 10.9512 13.0009 11.4696 12.3049 12.1488C12.0313 12.4368 11.7841 12.7296 11.5489 13.044L11.4265 13.2048H11.4145L8.7001 17.4264L6.6721 17.2632L4.4785 20.6712C4.2433 21.0624 3.7369 21.4776 3.1297 21.528H3.1105ZM1.4233 20.6952L3.0793 20.7168C3.3769 20.6856 3.6625 20.4552 3.7849 20.2488L3.7921 20.2368L6.1225 16.6176L6.3193 16.4208L8.2801 16.5792L10.9681 12.3984H11.0233C11.2417 12.12 11.4721 11.8536 11.7193 11.592L11.7313 11.58C12.5017 10.8264 13.3633 10.248 14.2945 9.8616C15.3049 9.4344 16.3681 9.2184 17.4553 9.2184H17.4817C17.8609 8.1336 17.9521 6.8664 17.7361 5.6232C17.4793 4.1616 16.6705 2.8896 15.4585 2.0424C14.2513 1.2 12.7897 0.880802 11.3425 1.14C8.4961 1.6416 5.7649 3.8472 6.3049 6.9504C6.4273 7.596 6.7513 8.6472 7.1401 9.4056L7.2505 9.6216L1.2673 18.1872C1.1161 18.408 1.0153 18.8592 1.0585 19.1232L1.2217 19.8912C1.2649 20.0904 1.3561 20.4648 1.4233 20.6952ZM17.1577 19.7832C16.8241 19.7832 16.4905 19.7184 16.1713 19.5912L16.1665 19.5888C15.5257 19.32 15.0313 18.8184 14.7697 18.1776C14.5129 17.5416 14.5177 16.8456 14.7865 16.2168C15.0433 15.5832 15.5377 15.0912 16.1737 14.8272C16.8169 14.5608 17.5225 14.5632 18.1609 14.8344C18.7993 15.1032 19.2961 15.6 19.5577 16.2312C19.8241 16.8672 19.8217 17.568 19.5553 18.2064V18.2088C19.2865 18.84 18.7849 19.3296 18.1489 19.5888C17.8273 19.7184 17.4937 19.7832 17.1577 19.7832ZM16.4785 18.8424C17.3857 19.2072 18.4297 18.7824 18.8113 17.8944C19.1905 16.9872 18.7681 15.972 17.8465 15.5832C17.4097 15.3984 16.9273 15.396 16.4833 15.5784C16.0465 15.7584 15.7105 16.0944 15.5353 16.5264L15.5329 16.5336C15.3481 16.9656 15.3457 17.4408 15.5209 17.8776C15.6985 18.312 16.0393 18.6576 16.4785 18.8424ZM2.5249 19.0776L1.8673 18.6072L7.5505 10.644L8.2081 11.1144L2.5249 19.0776ZM14.3089 8.2392C13.6897 8.2392 13.0945 7.8096 12.4177 7.3224C12.2785 7.224 12.1369 7.1208 11.9905 7.0176L11.9881 7.0152C11.8441 6.9144 11.7001 6.816 11.5609 6.7224C10.7953 6.2016 10.1353 5.7504 10.0057 5.0496C9.9313 4.6416 10.0513 4.2192 10.3729 3.7584V3.756C10.8649 3.0576 11.5993 2.5896 12.4369 2.4384C13.2817 2.2848 14.1289 2.472 14.8273 2.964L14.8297 2.9664C15.5257 3.4656 15.9913 4.2048 16.1377 5.0448C16.2841 5.8872 16.0969 6.7368 15.6049 7.4328C15.2905 7.8912 14.9401 8.1504 14.5345 8.22C14.4601 8.232 14.3833 8.2392 14.3089 8.2392ZM12.4537 6.3552C12.6049 6.4608 12.7513 6.5664 12.8905 6.6672C13.5025 7.1088 14.0281 7.488 14.3977 7.4232C14.5777 7.392 14.7553 7.2456 14.9401 6.9744L14.9425 6.9696C15.6985 5.8968 15.4369 4.3968 14.3593 3.624C13.8409 3.2592 13.2097 3.12 12.5809 3.2352C11.9521 3.348 11.4025 3.6984 11.0329 4.2216C10.8409 4.4952 10.7641 4.7184 10.7977 4.9032C10.8649 5.2728 11.3977 5.6352 12.0121 6.0552C12.1585 6.1512 12.3049 6.2496 12.4537 6.3552Z" fill="#0093CD" />
        </svg>,
      content: <Permission data={data.object} />
    },
    {
      title: "Setting",
      icon: <SettingsIcon />,
      content: <GetSettings group="users" />
    }
  ]

  const onError = (error, msg) => {
    notify(msg.message);
  };


  if (data.length === 0) {
    return "";
  }
  return <TabComponent headers={pageConfig.headers} tabs={tabs} loader={loader}></TabComponent>;
}

export default EditUser;
