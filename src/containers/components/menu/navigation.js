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
        id: "thirdparty",
        title: "Third Party",
        uri: '/third-party',
        permissionKey: 'hasChildren',
        children: [
            {
                id: "customers",
                title: "Customers",
                uri: "/customers",
                permissionKey: 'customers_index',
            },
            {
                id: "manufacturers",
                title: "Manufacturers",
                uri: "/manufacturers",
                permissionKey: 'manufacturerss_index',
            },
            {
                id: "laboratories",
                title: "Laboratories",
                uri: "/laboratories",
                permissionKey: 'laboratories_index',
            },
            {
                id: "facilities",
                title: "Facilities",
                uri: "/facilities",
                permissionKey: 'facilities_index',
            },
            {
                id: "agents",
                title: "Agents",
                uri: "/agents",
                permissionKey: 'agents_index',
            },
            {
                id: "allparties",
                title: "All Third Parties",
                uri: "/all-third-parties",
                permissionKey: 'allparties_index',
            }
        ]
    },
    {
        id: "componentManagement",
        title: "Components",
        uri: '/component-management',
        permissionKey: 'hasChildren',
        children: [
            {
                id: "substance",
                title: "Chemical substances",
                uri: "/substances",
                permissionKey: 'substances_index',
            }
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
