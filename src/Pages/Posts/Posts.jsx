import { useState, useCallback } from "react";
import {
  Card, CardHeader, CardBody, CardFooter,
  Avatar, Button, Image, Input, Divider,
  Listbox, ListboxItem,
} from "@heroui/react";
import {
  MessageText1, Heart, Share, More, UserAdd,
  Setting2, People, SearchNormal1,
} from "iconsax-reactjs";
import toast from "react-hot-toast";
import CreatePost from "../../Components/CreatePost/CreatePost";
import {
  getPosts, toggleLike, addComment,
  allUsers, suggestedFriends, currentUser,
} from "../../data/mockData";
import { useNavigate } from "react-router";

function timeAgo(dateStr) {
  const diff = (Date.now() - new Date(dateStr)) / 1000;
  if (diff < 60) return "Just now";
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  return `${Math.floor(diff / 86400)}d ago`;
}

export default function Posts() {
  const [posts, setPosts] = useState(getPosts);
  const [searchQuery, setSearchQuery] = useState("");
  const [commentInputs, setCommentInputs] = useState({});
  const navigate = useNavigate();

  const refresh = useCallback(() => setPosts(getPosts()), []);

  const filteredUsers = searchQuery.trim()
    ? allUsers.filter(u => u.name.toLowerCase().includes(searchQuery.toLowerCase()))
    : [];

  const handleLike = (postId) => {
    toggleLike(postId);
    refresh();
  };

  const handleComment = (postId) => {
    const text = (commentInputs[postId] || "").trim();
    if (!text) return;
    addComment(postId, text);
    setCommentInputs(prev => ({ ...prev, [postId]: "" }));
    refresh();
    toast.success("Comment added!");
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 px-4 py-6 max-w-[1400px] mx-auto">

      {/* ── Left Sidebar ── */}
      <div className="hidden md:flex flex-col gap-2 sticky top-20 self-start">
        <div className="px-2 mb-2 relative">
          <Input
            classNames={{
              inputWrapper: "bg-white dark:bg-[#242526] shadow-sm ring-1 ring-gray-200 dark:ring-gray-700 border-none",
            }}
            placeholder="Search users..."
            size="sm"
            startContent={<SearchNormal1 size={18} />}
            type="search"
            radius="full"
            value={searchQuery}
            onValueChange={setSearchQuery}
          />
          {searchQuery && (
            <Card className="absolute top-12 left-2 right-2 z-50 shadow-xl border-none max-h-60 overflow-y-auto bg-white dark:bg-[#242526]">
              <CardBody className="p-2">
                {filteredUsers.length > 0 ? (
                  <Listbox aria-label="results" variant="flat">
                    {filteredUsers.map(user => (
                      <ListboxItem key={user._id} textValue={user.name} className="rounded-lg" onClick={() => navigate(`/profile/${user._id}`)}>
                        <div className="flex items-center gap-3">
                          <Avatar size="sm" src={user.photo} />
                          <span className="font-semibold text-sm dark:text-white">{user.name}</span>
                        </div>
                      </ListboxItem>
                    ))}
                  </Listbox>
                ) : (
                  <p className="text-center text-xs py-4 text-gray-500">No users found</p>
                )}
              </CardBody>
            </Card>
          )}
        </div>

        <div
          className="flex items-center gap-3 p-2 hover:bg-gray-200 dark:hover:bg-gray-800 rounded-lg cursor-pointer transition-colors group"
          onClick={() => navigate("/profile")}
        >
          <Avatar size="sm" src={currentUser.photo} className="group-hover:scale-110 transition-transform" />
          <span className="font-semibold text-sm dark:text-gray-200">{currentUser.name}</span>
        </div>

        <Divider className="my-2 dark:bg-gray-700" />
      </div>

      {/* ── Main Feed ── */}
      <div className="col-span-1 md:col-span-2 flex flex-col gap-6 max-w-2xl mx-auto w-full">
        <CreatePost onPostCreated={refresh} />

        {posts.map(post => (
          <Card key={post._id} className="w-full shadow-sm border-none bg-white dark:bg-[#242526] transition-all hover:shadow-md">
            <CardHeader className="justify-between px-4 pt-4">
              <div className="flex gap-3 text-start">
                <Avatar 
                  isBordered 
                  radius="full" 
                  size="md" 
                  src={post.user?.photo} 
                  className="cursor-pointer"
                  onClick={() => navigate(`/profile/${post.user?._id}`)}
                />
                <div className="flex flex-col gap-0 items-start justify-center">
                  <h4 
                    className="text-sm font-bold leading-none text-default-900 dark:text-white hover:underline cursor-pointer"
                    onClick={() => navigate(`/profile/${post.user?._id}`)}
                  >
                    {post.user?.name}
                  </h4>
                  <h5 className="text-xs tracking-tight text-default-500 mt-1">{timeAgo(post.createdAt)}</h5>
                </div>
              </div>
              <Button isIconOnly size="sm" variant="light" className="dark:text-white">
                <More size="20" variant="Outline" />
              </Button>
            </CardHeader>

            <CardBody className="px-4 py-2 text-sm text-default-900 dark:text-gray-200">
              <p className="mb-3 whitespace-pre-wrap">{post.body}</p>
              {post.image && (
                <div className="overflow-hidden rounded-xl border border-gray-100 dark:border-gray-800">
                  <Image
                    alt="Post content"
                    className="object-cover w-full hover:scale-105 transition-transform duration-500"
                    src={post.image}
                    width="100%"
                  />
                </div>
              )}
            </CardBody>

            <Divider className="dark:bg-gray-700" />
            <div className="flex justify-between items-center px-4 py-2">
              <div className="flex items-center gap-1 text-gray-500 dark:text-gray-400 text-xs">
                <div className="bg-blue-500 rounded-full p-1"><Heart size="10" color="white" variant="Bold" /></div>
                <span>{post.likes} Likes</span>
              </div>
              <div className="text-gray-500 dark:text-gray-400 text-xs hover:underline cursor-pointer">
                {post.comments?.length || 0} Comments
              </div>
            </div>

            <Divider className="dark:bg-gray-700" />
            <CardFooter className="flex-col p-2 items-start">
              <div className="flex w-full">
                <Button
                  variant="light"
                  className={`flex-1 font-semibold hover:bg-gray-100 dark:hover:bg-gray-800 ${post.liked ? "text-[#1877F2]" : "text-gray-600 dark:text-gray-400"}`}
                  startContent={<Heart size="20" variant={post.liked ? "Bold" : "Outline"} color={post.liked ? "#1877F2" : undefined} />}
                  onPress={() => handleLike(post._id)}
                >
                  Like
                </Button>
                <Button 
                  variant="light" 
                  className="flex-1 font-semibold text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800" 
                  startContent={<MessageText1 size="20" />}
                  onPress={() => document.getElementById(`comment-input-${post._id}`)?.focus()}
                >
                  Comment
                </Button>
                <Button 
                  variant="light" 
                  className="flex-1 font-semibold text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800" 
                  startContent={<Share size="20" />}
                  onPress={() => {
                    navigator.clipboard.writeText(window.location.host + `/posts/${post._id}`);
                    toast.success("Link copied to clipboard!");
                  }}
                >
                  Share
                </Button>
              </div>

              {post.comments?.length > 0 && (
                <div className="w-full mt-3 flex flex-col gap-2">
                  {post.comments.slice(0, 2).map(comment => (
                    <div key={comment._id} className="flex gap-2 text-start">
                      <Avatar 
                        size="sm" 
                        src={comment.commentCreator?.photo} 
                        className="cursor-pointer"
                        onClick={() => navigate(`/profile/${comment.commentCreator?._id}`)}
                      />
                      <div className="bg-[#F0F2F5] dark:bg-gray-800/70 p-2 px-3 rounded-2xl flex-1">
                        <p 
                          className="text-xs font-bold text-default-900 dark:text-white hover:underline cursor-pointer"
                          onClick={() => navigate(`/profile/${comment.commentCreator?._id}`)}
                        >
                          {comment.commentCreator?.name}
                        </p>
                        <p className="text-xs text-gray-700 dark:text-gray-300">{comment.content}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              <div className="flex gap-2 w-full mt-3 px-1">
                <Avatar size="sm" src={currentUser.photo} />
                <Input
                  id={`comment-input-${post._id}`}
                  variant="flat"
                  size="sm"
                  placeholder="Write a comment..."
                  className="flex-1"
                  radius="full"
                  value={commentInputs[post._id] || ""}
                  onChange={e => setCommentInputs(prev => ({ ...prev, [post._id]: e.target.value }))}
                  classNames={{
                    inputWrapper: "bg-[#F0F2F5] dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors",
                  }}
                  onKeyDown={e => { if (e.key === "Enter") handleComment(post._id); }}
                />
                <Button
                  size="sm"
                  color="primary"
                  variant="light"
                  className="font-semibold"
                  onPress={() => handleComment(post._id)}
                >
                  Send
                </Button>
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>

      {/* ── Right Sidebar ── */}
      <div className="hidden md:flex flex-col gap-3 sticky top-20 self-start">
        <h3 className="font-bold text-gray-500 dark:text-gray-400 text-sm px-2">People You May Know</h3>
        {suggestedFriends.map(friend => (
          <div key={friend._id} className="flex items-center justify-between p-2 hover:bg-gray-200 dark:hover:bg-gray-800 rounded-lg cursor-pointer transition-colors group" onClick={() => navigate(`/profile/${friend._id}`)}>
            <div className="flex items-center gap-3 text-start">
              <Avatar size="sm" src={friend.photo} className="group-hover:ring-2 ring-primary transition-all" />
              <div>
                <span className="font-semibold text-xs dark:text-white block hover:underline">{friend.name}</span>
                <span className="text-gray-400 text-[11px]">{friend.mutualFriends} mutual friends</span>
              </div>
            </div>
            <Button isIconOnly size="sm" variant="light" color="primary" className="opacity-0 group-hover:opacity-100 transition-opacity" onPress={(e) => { e.stopPropagation(); toast.success(`Friend request sent to ${friend.name}!`); }}>
              <UserAdd size="18" variant="Bold" />
            </Button>
          </div>
        ))}
      </div>

    </div>
  );
}
