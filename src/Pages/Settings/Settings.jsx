import { useState } from "react";
import {
  Card, CardBody, Switch, Button, Avatar, Divider,
  Select, SelectItem, Input, Chip,
} from "@heroui/react";
import {
  Setting2, Notification, Lock, Eye, Moon, Global,
  Trash, Logout, Shield, MessageText1, ColorSwatch,
} from "iconsax-reactjs";
import toast from "react-hot-toast";
import { useTheme } from "../../Context/ThemeContext";
import { currentUser } from "../../data/mockData";
import { useNavigate } from "react-router";

const Section = ({ title, icon, children }) => (
  <Card className="border-none shadow-sm dark:bg-[#242526] w-full">
    <CardBody className="p-0">
      <div className="flex items-center gap-3 px-5 py-4 border-b border-gray-100 dark:border-gray-700">
        {icon}
        <h2 className="font-bold text-base dark:text-white">{title}</h2>
      </div>
      <div className="flex flex-col divide-y divide-gray-50 dark:divide-gray-700/50">
        {children}
      </div>
    </CardBody>
  </Card>
);

const Row = ({ label, desc, children }) => (
  <div className="flex items-center justify-between px-5 py-4 gap-4">
    <div className="flex-1">
      <p className="text-sm font-semibold dark:text-white">{label}</p>
      {desc && <p className="text-xs text-gray-400 mt-0.5">{desc}</p>}
    </div>
    <div className="flex-shrink-0">{children}</div>
  </div>
);

export default function Settings() {
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();

  const [notifications, setNotifications] = useState({ posts: true, comments: true, friendReqs: true, messages: false, marketing: false });
  const [privacy, setPrivacy] = useState({ publicProfile: true, showEmail: false, showPhone: false, allowSearch: true });
  const [language, setLanguage] = useState("en");
  const [fontSize, setFontSize] = useState("medium");

  const toggle = (obj, setObj, key) => setObj(prev => ({ ...prev, [key]: !prev[key] }));

  const handleSave = () => toast.success("Settings saved! ✅");
  const handleLogout = () => {
    localStorage.removeItem("userToken");
    navigate("/login");
  };
  const handleDeleteAccount = () => toast.error("Account deletion requires email confirmation.");

  return (
    <div className="max-w-[720px] mx-auto px-4 py-6 flex flex-col gap-5">
      <h1 className="text-2xl font-bold dark:text-white flex items-center gap-2">
        <Setting2 size="28" color="#1877F2" variant="Bold" /> Settings
      </h1>

      {/* ── Profile ── */}
      <Section title="Account" icon={<Avatar src={currentUser.photo} size="sm" />}>
        <div className="px-5 py-4 flex items-center gap-4">
          <div className="relative">
            <Avatar src={currentUser.photo} className="w-16 h-16" isBordered color="primary" />
          </div>
          <div className="flex-1">
            <p className="font-bold dark:text-white">{currentUser.name}</p>
            <p className="text-sm text-gray-400">{currentUser.email}</p>
            <Chip size="sm" color="primary" variant="flat" className="mt-1">Active</Chip>
          </div>
          <Button size="sm" variant="flat" className="font-semibold" onPress={() => navigate("/profile")}>Edit Profile</Button>
        </div>
        <Divider className="dark:bg-gray-700" />
        <div className="px-5 py-4 flex flex-col gap-3">
          <Input label="Full Name" defaultValue={currentUser.name} variant="bordered" size="sm" />
          <Input label="Email" defaultValue={currentUser.email} type="email" variant="bordered" size="sm" />
          <Input label="Phone" placeholder="+20 ..." variant="bordered" size="sm" />
          <Input label="Bio" defaultValue={currentUser.bio} variant="bordered" size="sm" />
          <Button color="primary" size="sm" className="self-end font-bold px-6" onPress={handleSave}>Save Changes</Button>
        </div>
      </Section>

      {/* ── Appearance ── */}
      <Section title="Appearance" icon={<ColorSwatch size="20" color="#1877F2" variant="Bold" />}>
        <Row label="Dark Mode" desc="Switch between light and dark theme">
          <Switch isSelected={theme === "dark"} onValueChange={toggleTheme} color="primary" />
        </Row>
        <Row label="Language" desc="Choose your preferred language">
          <Select size="sm" selectedKeys={[language]} onChange={e => setLanguage(e.target.value)} className="w-36" variant="bordered">
            <SelectItem key="en">English</SelectItem>
            <SelectItem key="ar">العربية</SelectItem>
            <SelectItem key="fr">Français</SelectItem>
          </Select>
        </Row>
        <Row label="Font Size" desc="Adjust text size across the app">
          <Select size="sm" selectedKeys={[fontSize]} onChange={e => setFontSize(e.target.value)} className="w-36" variant="bordered">
            <SelectItem key="small">Small</SelectItem>
            <SelectItem key="medium">Medium</SelectItem>
            <SelectItem key="large">Large</SelectItem>
          </Select>
        </Row>
      </Section>

      {/* ── Notifications ── */}
      <Section title="Notifications" icon={<Notification size="20" color="#1877F2" variant="Bold" />}>
        <Row label="Post activity" desc="Likes and reactions on your posts">
          <Switch isSelected={notifications.posts} onValueChange={() => toggle(notifications, setNotifications, "posts")} color="primary" />
        </Row>
        <Row label="Comments" desc="New comments on your posts">
          <Switch isSelected={notifications.comments} onValueChange={() => toggle(notifications, setNotifications, "comments")} color="primary" />
        </Row>
        <Row label="Friend Requests" desc="When someone sends you a request">
          <Switch isSelected={notifications.friendReqs} onValueChange={() => toggle(notifications, setNotifications, "friendReqs")} color="primary" />
        </Row>
        <Row label="Messages" desc="New direct messages">
          <Switch isSelected={notifications.messages} onValueChange={() => toggle(notifications, setNotifications, "messages")} color="primary" />
        </Row>
        <Row label="Marketing emails" desc="Promotions and news from us">
          <Switch isSelected={notifications.marketing} onValueChange={() => toggle(notifications, setNotifications, "marketing")} color="primary" />
        </Row>
      </Section>

      {/* ── Privacy ── */}
      <Section title="Privacy & Security" icon={<Shield size="20" color="#1877F2" variant="Bold" />}>
        <Row label="Public Profile" desc="Allow everyone to view your profile">
          <Switch isSelected={privacy.publicProfile} onValueChange={() => toggle(privacy, setPrivacy, "publicProfile")} color="primary" />
        </Row>
        <Row label="Show Email" desc="Display your email on your profile">
          <Switch isSelected={privacy.showEmail} onValueChange={() => toggle(privacy, setPrivacy, "showEmail")} color="primary" />
        </Row>
        <Row label="Show Phone" desc="Display your phone number on your profile">
          <Switch isSelected={privacy.showPhone} onValueChange={() => toggle(privacy, setPrivacy, "showPhone")} color="primary" />
        </Row>
        <Row label="Allow Search" desc="Let people find you by name">
          <Switch isSelected={privacy.allowSearch} onValueChange={() => toggle(privacy, setPrivacy, "allowSearch")} color="primary" />
        </Row>
        <div className="px-5 py-3">
          <Button size="sm" variant="flat" color="warning" className="font-semibold" onPress={() => toast("Password reset email sent!")}>
            Change Password
          </Button>
        </div>
      </Section>

      {/* ── Danger Zone ── */}
      <Section title="Account Actions" icon={<Trash size="20" color="#ef4444" variant="Bold" />}>
        <Row label="Log Out" desc="Sign out from your account">
          <Button size="sm" color="primary" variant="flat" className="font-bold" startContent={<Logout size="16" />} onPress={handleLogout}>
            Log Out
          </Button>
        </Row>
        <Row label="Delete Account" desc="Permanently delete your account and all data">
          <Button size="sm" color="danger" variant="flat" className="font-bold" startContent={<Trash size="16" />} onPress={handleDeleteAccount}>
            Delete
          </Button>
        </Row>
      </Section>
    </div>
  );
}
