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
        id: "thirdparyManagement",
        title: "Third Party",
        uri: '/third-party-management',
        permissionKey: 'hasChildren',
        children: [
            {
                id: "contacts",
                title: "Contacts",
                uri: "/contacts",
                permissionKey: 'contacts_index',
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
