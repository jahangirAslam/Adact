import {
    CloseSquare,
    Discount,
    User,
    Paper,
    InfoSquare,
    Password,
    PaperPlus,
    Unlock,
    Bookmark,
} from "react-iconly";

const navigation = [
    {
        id: "errors",
        title: "Error Pages",
        icon: <CloseSquare set="curved" className="remix-icon" />,
        children: [
            {
                id: "error-404",
                title: "404",
                uri: "/error-404",
            },
            {
                id: "error-403",
                title: "403",
                uri: "/error-403",
            },
            {
                id: "error-500",
                title: "500",
                uri: "/error-500",
            },
            {
                id: "error-503",
                title: "503",
                uri: "/error-503",
            },
            {
                id: "error-502",
                title: "502",
                uri: "/error-502",
            },
            {
                id: "maintenance",
                title: "Maintenance",
                uri: "/maintenance",
            },
            {
                id: "comming-soon",
                title: "Coming Soon",
                uri: "/coming-soon",
            },
        ],
    },
    {
        id: "pricing",
        title: "Pricing",
        icon: <Discount set="curved" className="remix-icon" />,
        uri: "/pricing",
    },
    {
        id: "profile",
        title: "Profile",
        icon: <User set="curved" className="remix-icon" />,
        uri: "/profile/personel-information",
    },
    {
        id: "invoice",
        title: "Invoice",
        icon: <Paper set="curved" className="remix-icon" />,
        uri: "/invoice",
    },

    {
        id: "faq",
        title: "FAQ",
        icon: <InfoSquare set="curved" className="remix-icon" />,
        uri: "/faq",
    },
    {
        id: "knowledge-base",
        title: "Knowledge Base",
        icon: <Bookmark set="curved" className="remix-icon" />,
        children: [
            {
                id: "knowledge-base-1",
                title: "Knowledge Base 1",
                uri: "/knowledge-base/knowledge-base-1",
            },
            {
                id: "knowledge-base-2",
                title: "Knowledge Base 2",
                uri: "/knowledge-base/knowledge-base-2",
            },
        ],
    },
    {
        id: "blank-page",
        title: "Blank Page",
        icon: <PaperPlus set="curved" className="remix-icon" />,
        uri: "/blank-page",
    },
    {
        id: "authentication",
        title: "Authentication",
        icon: <Unlock set="curved" className="remix-icon" />,
        children: [
            {
                id: "login-page",
                title: "Login Page",
                uri: "/authentication/login",
            },
            {
                id: "register-page",
                title: "Register Page",
                uri: "/authentication/register",
            },
            {
                id: "recover-password",
                title: "Receover Password",
                uri: "/authentication/recover-password",
            },
            {
                id: "reset-password",
                title: "Reset Password",
                uri: "/authentication/reset-password",
            },
        ],
    },
    {
        id: "lock-page",
        title: "Lock Screen",
        icon: <Password set="curved" className="remix-icon" />,
        children: [
            {
                id: "welcome",
                title: "Welcome",
                uri: "/welcome",
            },
            {
                id: "password-is-changed",
                title: "Password Is Changed",
                uri: "/password-is-changed",
            },
            {
                id: "deactivated",
                title: "Deactivated",
                uri: "/deactivated",
            },
            {
                id: "lock",
                title: "Lock",
                uri: "/lock",
            },
        ],
    },
];

export default navigation