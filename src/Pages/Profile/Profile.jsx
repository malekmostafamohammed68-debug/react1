import {
  Avatar, Button, Card, CardBody, CardHeader,
  CardFooter, Image, Divider, Chip,
} from "@heroui/react";
import { Camera, Edit2, UserAdd, Heart, MessageText1, Share, More } from "iconsax-reactjs";
import { useState, useCallback } from "react";
import { useParams } from "react-router";
import { currentUser as me, getUserById, getPostsByUserId, toggleLike } from "../../data/mockData";
import toast from "react-hot-toast";

function timeAgo(dateStr) {
  const diff = (Date.now() - new Date(dateStr)) / 1000;
  if (diff < 60) return "Just now";
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  return `${Math.floor(diff / 86400)}d ago`;
}

export default function Profile() {
  const { id } = useParams();
  const user = getUserById(id);
  const isMe = !id || id === "me" || id === me._id;

  const [posts, setPosts] = useState(() => getPostsByUserId(id));
  const refresh = useCallback(() => setPosts(getPostsByUserId(id)), [id]);

  const handleLike = (postId) => {
    toggleLike(postId);
    refresh();
  };

  if (!user) {
    return <div className="p-20 text-center font-bold text-2xl">User not found</div>;
  }

  return (
    <div className="min-h-screen bg-[#F0F2F5] dark:bg-[#18191A] transition-colors">

      {/* ── Cover + Avatar ── */}
      <div className="max-w-[940px] mx-auto">
        <div className="relative">
          {/* Cover Photo */}
          <div className="relative overflow-hidden rounded-b-2xl" style={{ height: 340 }}>
            <img
              src={user.coverPhoto || "https://picsum.photos/seed/cover/1200/400"}
              alt="Cover"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
            {isMe && (
              <Button
                size="sm"
                className="absolute bottom-4 right-4 bg-white/90 dark:bg-gray-800/90 font-semibold text-sm"
                startContent={<Camera size="16" />}
              >
                Edit cover photo
              </Button>
            )}
          </div>

          {/* Avatar */}
          <div className="absolute -bottom-16 left-8">
            <div className="relative">
              <Avatar
                src={user.photo}
                className="w-36 h-36 text-large border-4 border-white dark:border-[#18191A]"
                isBordered
                color="primary"
              />
              {isMe && (
                <button className="absolute bottom-2 right-2 bg-gray-200 dark:bg-gray-700 rounded-full p-1.5 hover:bg-gray-300 transition-colors">
                  <Camera size="16" />
                </button>
              )}
            </div>
          </div>
        </div>

        {/* ── Profile Info Row ── */}
        <div className="bg-white dark:bg-[#242526] px-8 pb-4 rounded-b-2xl shadow-sm transition-colors">
          <div className="flex flex-col md:flex-row md:items-end justify-between pt-20 gap-4">
            <div>
              <h1 className="text-3xl font-bold dark:text-white capitalize items-start flex">{user.name}</h1>
              <p className="text-gray-500 dark:text-gray-400 text-sm mt-1 text-start">{user.bio}</p>
              <div className="flex gap-4 mt-2 text-sm text-gray-600 dark:text-gray-300 font-semibold">
                <span>{user.friends || 0} Friends</span>
                <span>{posts.length} Posts</span>
                <Chip size="sm" variant="flat" color="primary">Joined {user.joined || "2024"}</Chip>
              </div>
            </div>
            <div className="flex gap-2 flex-shrink-0">
              {!isMe && (
                <Button color="primary" startContent={<UserAdd size="18" variant="Bold" />} className="font-bold">
                  Add Friend
                </Button>
              )}
              {isMe && (
                <Button variant="flat" startContent={<Edit2 size="18" />} className="font-bold dark:text-white">
                  Edit Profile
                </Button>
              )}
            </div>
          </div>
          <Divider className="mt-4 dark:bg-gray-700" />

          {/* Tabs */}
          <div className="flex gap-2 mt-1 overflow-x-auto">
            {["Posts", "About", "Friends", "Photos", "Videos"].map((tab, i) => (
              <button
                key={tab}
                className={`px-4 py-2 text-sm font-semibold rounded-lg transition-colors whitespace-nowrap ${i === 0 ? "text-[#1877F2] border-b-4 border-[#1877F2]" : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"}`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* ── Content Grid ── */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mt-4 pb-10">

          {/* Left column — about widget */}
          <div className="md:col-span-2 flex flex-col gap-4">
            <Card className="border-none shadow-sm dark:bg-[#242526]">
              <CardBody className="gap-3 p-4">
                <h3 className="font-bold text-lg dark:text-white text-start">Intro</h3>
                <p className="text-gray-700 dark:text-gray-300 text-sm">{user.bio}</p>
                {isMe && <Button variant="flat" className="w-full font-semibold">Edit bio</Button>}
                <Divider className="dark:bg-gray-700" />
                <div className="text-sm text-gray-600 dark:text-gray-300 flex flex-col gap-2 items-start">
                  <span>📍 Cairo, Egypt</span>
                  <span>🎓 Cairo University</span>
                  <span>💼 Software Engineer</span>
                  <span>🗓 Joined {user.joined || "2024"}</span>
                </div>
              </CardBody>
            </Card>

            {/* Photos widget */}
            <Card className="border-none shadow-sm dark:bg-[#242526]">
              <CardHeader className="px-4 pb-0 flex justify-between">
                <h3 className="font-bold dark:text-white">Photos</h3>
                <Button variant="light" size="sm" color="primary" className="font-semibold">See all</Button>
              </CardHeader>
              <CardBody className="p-3">
                <div className="grid grid-cols-3 gap-1">
                  {[21, 22, 23, 24, 25, 26].map(seed => (
                    <div key={seed} className="aspect-square overflow-hidden rounded-lg cursor-pointer hover:opacity-90 transition-opacity">
                      <img
                        src={`https://picsum.photos/seed/${seed}/200/200`}
                        alt=""
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </div>
              </CardBody>
            </Card>
          </div>

          {/* Right column — posts */}
          <div className="md:col-span-3 flex flex-col gap-4">
            {posts.length === 0 && (
              <Card className="border-none shadow-sm dark:bg-[#242526]">
                <CardBody className="py-10 text-center text-gray-400">
                  <p className="text-4xl mb-3">📭</p>
                  <p className="font-semibold">No posts yet.</p>
                </CardBody>
              </Card>
            )}

            {posts.map(post => (
              <Card key={post._id} className="border-none shadow-sm bg-white dark:bg-[#242526] hover:shadow-md transition-all">
                <CardHeader className="justify-between px-4 pt-4">
                  <div className="flex gap-3 text-start">
                    <Avatar isBordered radius="full" size="md" src={user.photo} />
                    <div>
                      <h4 className="text-sm font-bold dark:text-white capitalize text-start">{user.name}</h4>
                      <h5 className="text-xs text-default-500 text-start">{timeAgo(post.createdAt)}</h5>
                    </div>
                  </div>
                  <Button isIconOnly size="sm" variant="light" className="dark:text-white">
                    <More size="20" variant="Outline" />
                  </Button>
                </CardHeader>

                <CardBody className="px-4 py-2 text-sm dark:text-gray-200">
                  <p className="whitespace-pre-wrap mb-3 text-start">{post.body}</p>
                  {post.image && (
                    <div className="overflow-hidden rounded-xl border border-gray-100 dark:border-gray-800">
                      <Image
                        alt="Post"
                        className="object-cover w-full hover:scale-105 transition-transform duration-500"
                        src={post.image}
                        width="100%"
                      />
                    </div>
                  )}
                </CardBody>

                <Divider className="dark:bg-gray-700" />
                <div className="flex justify-between px-4 py-2 text-xs text-gray-500 dark:text-gray-400">
                  <div className="flex items-center gap-1">
                    <div className="bg-blue-500 rounded-full p-1"><Heart size="10" color="white" variant="Bold" /></div>
                    {post.likes} Likes
                  </div>
                  <span>{post.comments?.length || 0} Comments</span>
                </div>

                <Divider className="dark:bg-gray-700" />
                <CardFooter className="p-2">
                  <Button
                    variant="light"
                    className={`flex-1 font-semibold hover:bg-gray-100 dark:hover:bg-gray-800 ${post.liked ? "text-[#1877F2]" : "text-gray-600 dark:text-gray-400"}`}
                    startContent={<Heart size="20" variant={post.liked ? "Bold" : "Outline"} color={post.liked ? "#1877F2" : undefined} />}
                    onPress={() => handleLike(post._id)}
                  >Like</Button>
                  <Button variant="light" className="flex-1 font-semibold text-gray-600 dark:text-gray-400" startContent={<MessageText1 size="20" />}>Comment</Button>
                  <Button variant="light" className="flex-1 font-semibold text-gray-600 dark:text-gray-400" startContent={<Share size="20" />}>Share</Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
