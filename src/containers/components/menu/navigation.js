import ComponentsIcon from "./icons/ComponentsIcon";
import DashboardIcon from "./icons/DashboardIcon";
import DocumentsIcon from "./icons/DocumentsIcon";
import LaboratoryIcon from "./icons/LaboratoryIcon";
import ProductsIcon from "./icons/ProductsIcon";
import MembershipIcon from "./icons/ProductsIcon";
import SettingsIcon from "./icons/SettingsIcon";
import ThirdPartyIcon from "./icons/ThirdPartyIcon";
import UsersIcon from "./icons/UsersIcon";


const navigation = [{
        id: "dashboard",
        title: "Dashboard",
        icon: < DashboardIcon / > ,
        uri: "",
        permissionKey: "always",
    },
    {
        id: "products",
        title: "Products",
        icon: < ProductsIcon / > ,
        uri: "/products",
        permissionKey: "hasChildren",
        children: [{
                id: "e-liquid",
                title: "eLiquid products",
                uri: "/e-liquid",
                permissionKey: "eDevice_index",
            },
            {
                id: "e-Device",
                title: "eDevice products",
                uri: "/e-device",
                permissionKey: "e-liquid_index",
            },
            {
                id: "all_products",
                title: "All Products",
                uri: "/all_products",
                permissionKey: "customers_index",
            }

        ],
    }, {
        id: "thirdparty",
        title: "Third Party",
        icon: < ThirdPartyIcon / > ,
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
        icon: < ComponentsIcon / > ,
        uri: "/component-management",
        permissionKey: "hasChildren",
        children: [{
                id: "substance",
                title: "Chemical substances",
                uri: "/substances",
                permissionKey: "substances_index",
            },
            {
                id: "compound",
                title: "Chemical compound",
                uri: "/chemical-compound",
                permissionKey: "compound_index",
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
        id: "laboratory",
        title: "Laboratory",
        icon: < LaboratoryIcon / > ,
        uri: "/laboratory",
        permissionKey: "hasChildren",
        children: [{
                id: "test",
                title: "Tests",
                uri: "/test",
                permissionKey: "test_index",
            },

        ],
    },
    {
        id: "settings",
        title: "Settings",
        icon: < SettingsIcon / > ,
        uri: "/settings",
        permissionKey: "hasChildren",
        children: [{
            id: "business",
            title: "Your business",
            uri: "/business",
            permissionKey: "business_index",
        }, ],
    },
    {
        id: "userManagement",
        title: "User & Role",
        icon: < UsersIcon / > ,
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
        icon: < DocumentsIcon / > ,
        uri: "document-management/documents",
        permissionKey: "document_index",
    },

];

export default navigation;