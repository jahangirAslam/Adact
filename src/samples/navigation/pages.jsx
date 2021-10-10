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

const pages = [
    {
        header: "PAGES",
    },
    {
        id: "errors",
        title: "Error Pages",
        icon: <CloseSquare set="curved" className="remix-icon" />,
        children: [
            {
                id: "error-404",
                title: "404",
                navLink: "/pages/error-404",
            },
            {
                id: "error-403",
                title: "403",
                navLink: "/pages/error-403",
            },
            {
                id: "error-500",
                title: "500",
                navLink: "/pages/error-500",
            },
            {
                id: "error-503",
                title: "503",
                navLink: "/pages/error-503",
            },
            {
                id: "error-502",
                title: "502",
                navLink: "/pages/error-502",
            },
            {
                id: "maintenance",
                title: "Maintenance",
                navLink: "/pages/maintenance",
            },
            {
                id: "comming-soon",
                title: "Coming Soon",
                navLink: "/pages/coming-soon",
            },
        ],
    },
    {
        id: "pricing",
        title: "Pricing",
        icon: <Discount set="curved" className="remix-icon" />,
        navLink: "/pages/pricing",
    },
    {
        id: "profile",
        title: "Profile",
        icon: <User set="curved" className="remix-icon" />,
        navLink: "/pages/profile/personel-information",
    },
    {
        id: "invoice",
        title: "Invoice",
        icon: <Paper set="curved" className="remix-icon" />,
        navLink: "/pages/invoice",
    },

    {
        id: "faq",
        title: "FAQ",
        icon: <InfoSquare set="curved" className="remix-icon" />,
        navLink: "/pages/faq",
    },
    {
        id: "knowledge-base",
        title: "Knowledge Base",
        icon: <Bookmark set="curved" className="remix-icon" />,
        children: [
            {
                id: "knowledge-base-1",
                title: "Knowledge Base 1",
                navLink: "/pages/knowledge-base/knowledge-base-1",
            },
            {
                id: "knowledge-base-2",
                title: "Knowledge Base 2",
                navLink: "/pages/knowledge-base/knowledge-base-2",
            },
        ],
    },
    {
        id: "blank-page",
        title: "Blank Page",
        icon: <PaperPlus set="curved" className="remix-icon" />,
        navLink: "/pages/blank-page",
    },
    {
        id: "authentication",
        title: "Authentication",
        icon: <Unlock set="curved" className="remix-icon" />,
        children: [
            {
                id: "login-page",
                title: "Login Page",
                navLink: "/pages/authentication/login",
            },
            {
                id: "register-page",
                title: "Register Page",
                navLink: "/pages/authentication/register",
            },
            {
                id: "recover-password",
                title: "Receover Password",
                navLink: "/pages/authentication/recover-password",
            },
            {
                id: "reset-password",
                title: "Reset Password",
                navLink: "/pages/authentication/reset-password",
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
                navLink: "/pages/welcome",
            },
            {
                id: "password-is-changed",
                title: "Password Is Changed",
                navLink: "/pages/password-is-changed",
            },
            {
                id: "deactivated",
                title: "Deactivated",
                navLink: "/pages/deactivated",
            },
            {
                id: "lock",
                title: "Lock",
                navLink: "/pages/lock",
            },
        ],
    },
];

export default pages