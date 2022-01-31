import { CloseSquare } from "react-iconly";

const navigation = [
    {
        id: "dashboard",
        title: "Dashboard",
        icon: <CloseSquare set="curved" className="remix-icon" />,
        uri: '/',
        permissionKey: 'always',
    },
    {
        id: "userManagement",
        title: "User & Role",
        uri: '/user-management',
        permissionKey: 'hasChildren',
        children: [
            {
                id: "users",
                title: "Users",
                uri: "/users",
                permissionKey: 'users_index',
            },
            {
                id: "roles",
                title: "Roles",
                uri: "/roles",
                permissionKey: 'roles_index',
            },
        ]
    },
    {
        id: "common",
        title: "Commons",
        uri: '/common',
        permissionKey: 'hasChildren',
        children: [
            {
                id: "locations",
                title: "Locations",
                uri: "/locations",
                permissionKey: 'locations_index',
            },
            {
                id: "contacts",
                title: "Contacts",
                uri: "/contacts",
                permissionKey: 'contacts_index',
            },
            {
                id: "brands",
                title: "Brands",
                uri: "/brands",
                permissionKey: 'brands_index',
            },
        ]
    },
    {
        id: "documentManagement",
        title: "Documents",
        uri: 'document-management/documents',
        permissionKey: 'document_index',
    },
];

export default navigation
