import { useState } from "react";
import { useNavigate } from "react-router";
import {
  Card, CardBody, Avatar, Button, Tabs, Tab, Input, Chip,
} from "@heroui/react";
import { UserAdd, SearchNormal1, People, CloseCircle, Message, UserTick } from "iconsax-reactjs";
import toast from "react-hot-toast";

import { friendRequests, suggestions, myFriendsList as myFriends } from "../../data/mockData";

export default function Friends() {
  const navigate = useNavigate();
  const [requests, setRequests] = useState(friendRequests);
  const [sent, setSent] = useState([]);
  const [search, setSearch] = useState("");

  const accept = (id) => {
    const req = requests.find(r => r._id === id);
    setRequests(prev => prev.filter(r => r._id !== id));
    toast.success(`You and ${req.name} are now friends! 🎉`);
  };
  const decline = (id) => {
    setRequests(prev => prev.filter(r => r._id !== id));
    toast("Request declined");
  };
  const addFriend = (id, name) => {
    if (sent.includes(id)) return;
    setSent(prev => [...prev, id]);
    toast.success(`Friend request sent to ${name}!`);
  };

  const filteredFriends = search.trim()
    ? myFriends.filter(f => f.name.toLowerCase().includes(search.toLowerCase()))
    : myFriends;

  return (
    <div className="max-w-[900px] mx-auto px-4 py-6 flex flex-col gap-6">
      <h1 className="text-2xl font-bold dark:text-white flex items-center gap-2">
        <People size="28" color="#1877F2" variant="Bold" /> Friends
      </h1>

      <Tabs variant="underlined" color="primary" classNames={{ tabList: "gap-6" }}>
        {/* ── Friend Requests ── */}
        <Tab
          key="requests"
          title={
            <div className="flex items-center gap-2">
              Friend Requests
              {requests.length > 0 && <Chip size="sm" color="danger" variant="solid">{requests.length}</Chip>}
            </div>
          }
        >
          {requests.length === 0 ? (
            <Card className="border-none shadow-sm dark:bg-[#242526]">
              <CardBody className="py-14 text-center text-gray-400 flex flex-col items-center gap-3">
                <UserTick size="48" color="#9ca3af" />
                <p className="font-semibold text-lg">No pending friend requests</p>
              </CardBody>
            </Card>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {requests.map(req => (
                <Card key={req._id} className="border-none shadow-sm dark:bg-[#242526] hover:shadow-md transition-all">
                  <CardBody className="flex flex-row gap-4 items-center p-4">
                    <Avatar 
                      src={req.photo} 
                      className="w-16 h-16 flex-shrink-0 cursor-pointer" 
                      isBordered 
                      color="primary" 
                      onClick={() => navigate(`/profile/${req._id}`)}
                    />
                    <div className="flex-1 min-w-0">
                      <p 
                        className="font-bold dark:text-white truncate cursor-pointer hover:underline"
                        onClick={() => navigate(`/profile/${req._id}`)}
                      >
                        {req.name}
                      </p>
                      <p className="text-xs text-gray-500">{req.mutual} mutual friends</p>
                      <p className="text-xs text-gray-400">{req.since}</p>
                      <div className="flex gap-2 mt-3">
                        <Button size="sm" color="primary" className="flex-1 font-bold" onPress={() => accept(req._id)}>Confirm</Button>
                        <Button size="sm" variant="flat" className="flex-1 font-bold dark:text-white" onPress={() => decline(req._id)}>Delete</Button>
                      </div>
                    </div>
                  </CardBody>
                </Card>
              ))}
            </div>
          )}
        </Tab>

        {/* ── Suggestions ── */}
        <Tab key="suggestions" title="People You May Know">
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {suggestions.map(s => (
              <Card key={s._id} className="border-none shadow-sm dark:bg-[#242526] hover:shadow-md transition-all">
                <CardBody className="flex flex-col items-center gap-3 p-4">
                  <div className="flex flex-col items-center gap-3 cursor-pointer" onClick={() => navigate(`/profile/${s._id}`)}>
                    <Avatar src={s.photo} className="w-20 h-20" isBordered color="default" />
                    <div className="text-center">
                      <p className="font-bold dark:text-white text-sm hover:underline">{s.name}</p>
                      <p className="text-xs text-gray-500">{s.mutual} mutual friends</p>
                      <p className="text-xs text-gray-400">{s.city}</p>
                    </div>
                  </div>
                  <Button
                    size="sm"
                    color={sent.includes(s._id) ? "default" : "primary"}
                    variant={sent.includes(s._id) ? "flat" : "solid"}
                    className="w-full font-bold"
                    startContent={<UserAdd size="16" variant="Bold" />}
                    onPress={() => addFriend(s._id, s.name)}
                  >
                    {sent.includes(s._id) ? "Request Sent" : "Add Friend"}
                  </Button>
                  {sent.includes(s._id) && (
                    <Button size="sm" variant="light" className="w-full text-gray-500 -mt-2" onPress={() => { setSent(p => p.filter(id => id !== s._id)); toast("Request cancelled"); }}>
                      Cancel
                    </Button>
                  )}
                </CardBody>
              </Card>
            ))}
          </div>
        </Tab>

        {/* ── All Friends ── */}
        <Tab key="all" title={`All Friends (${myFriends.length})`}>
          <div className="mb-4">
            <Input
              placeholder="Search friends..."
              startContent={<SearchNormal1 size="18" />}
              radius="full"
              value={search}
              onValueChange={setSearch}
              classNames={{ inputWrapper: "bg-white dark:bg-[#242526] shadow-sm" }}
            />
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {filteredFriends.map(f => (
              <Card key={f._id} className="border-none shadow-sm dark:bg-[#242526] hover:shadow-md transition-all">
                <CardBody className="flex flex-col items-center gap-3 p-4">
                  <Avatar 
                    src={f.photo} 
                    className="w-20 h-20 cursor-pointer" 
                    isBordered 
                    color="primary" 
                    onClick={() => navigate(`/profile/${f._id}`)}
                  />
                  <div className="text-center cursor-pointer" onClick={() => navigate(`/profile/${f._id}`)}>
                    <p className="font-bold dark:text-white text-sm hover:underline">{f.name}</p>
                    <p className="text-xs text-gray-500">{f.mutual} mutual friends</p>
                    <p className="text-xs text-gray-400">{f.city}</p>
                  </div>
                  <div className="flex gap-2 w-full">
                    <Button size="sm" color="primary" variant="flat" className="flex-1 font-semibold" startContent={<Message size="14" />}>Message</Button>
                    <Button isIconOnly size="sm" variant="flat" className="dark:text-white" onPress={() => toast("Options opened")}><CloseCircle size="16" /></Button>
                  </div>
                </CardBody>
              </Card>
            ))}
          </div>
        </Tab>
      </Tabs>
    </div>
  );
}
