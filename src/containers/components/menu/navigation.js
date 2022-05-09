import { CloseSquare } from "react-iconly";

import DashboardIcon from "./icons/DashboardIcon";
import MembershipIcon from "./icons/MembershipIcon";

const navigation = [{
    id: "dashboard",
    title: "Dashboard",
    icon: < DashboardIcon />,
    uri: "/",
    permissionKey: "always",
},
{
    id: "products",
    title: "Products",
    icon: < MembershipIcon />,
    uri: "/products",
    permissionKey: "hasChildren",
    children: [
        {
            id: "e-liquid",
            title: "eLiquid product",
            uri: "/e-liquid",
            permissionKey: "customers_index",
        }, {
            id: "all_products",
            title: "All Products",
            uri: "/all_products",
            permissionKey: "customers_index",
        }

    ],
}, {
    id: "thirdparty",
    title: "Third Party",
    icon: < MembershipIcon />,
    uri: "/third-party",
    permissionKey: "hasChildren",
    children: [{
        id: "customers",
        title: "Customers",
        uri: "/customers",
        permissionKey: "customers_index",
    },
    {
        id: "manufacturers",
        title: "Manufacturers",
        uri: "/manufacturers",
        permissionKey: "manufacturerss_index",
    },
    {
        id: "laboratories",
        title: "Laboratories",
        uri: "/laboratories",
        permissionKey: "laboratories_index",
    },
    {
        id: "facilities",
        title: "Facilities",
        uri: "/facilities",
        permissionKey: "facilities_index",
    },
    {
        id: "agents",
        title: "Agents",
        uri: "/agents",
        permissionKey: "agents_index",
    },
    {
        id: "allparties",
        title: "All Third Parties",
        uri: "/all-third-parties",
        permissionKey: "allparties_index",
    },
    ],
},
{
    id: "componentManagement",
    title: "Components",
    icon: < MembershipIcon />,
    uri: "/component-management",
    permissionKey: "hasChildren",
    children: [{
        id: "substance",
        title: "Chemical substances",
        uri: "/substances",
        permissionKey: "substances_index",
    },
    {
        id: "flavours",
        title: "Flavours",
        uri: "/flavours",
        permissionKey: "substances_index",
    },
    ],
},
{
    id: "userManagement",
    title: "User & Role",
    icon: < MembershipIcon />,
    uri: "/user-management",
    permissionKey: "hasChildren",
    children: [{
        id: "users",
        title: "Users",
        uri: "/users",
        permissionKey: "users_index",
    },
    {
        id: "roles",
        title: "Roles",
        uri: "/roles",
        permissionKey: "roles_index",
    },
    ],
},
{
    id: "documentManagement",
    title: "Documents",
    icon: < MembershipIcon />,
    uri: "document-management/documents",
    permissionKey: "document_index",
},

];

export default navigation;