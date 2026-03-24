import { useState } from "react";
import {
  Card, CardBody, CardFooter, Image, Button, Chip, Avatar, Input, Tabs, Tab,
} from "@heroui/react";
import { Play, Heart, MessageText1, Share, SearchNormal1, VideoOctagon } from "iconsax-reactjs";
import toast from "react-hot-toast";

import { videos, videoCategories as categories } from "../../data/mockData";

export default function Videos() {
  const [liked, setLiked] = useState([]);
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  const toggleLike = (id) => {
    setLiked(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
  };

  const filtered = videos.filter(v => {
    const matchSearch = v.title.toLowerCase().includes(search.toLowerCase()) || v.channel.toLowerCase().includes(search.toLowerCase());
    const matchCat = activeCategory === "All" || v.category === activeCategory;
    return matchSearch && matchCat;
  });

  return (
    <div className="max-w-[1200px] mx-auto px-4 py-6 flex flex-col gap-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <h1 className="text-2xl font-bold dark:text-white flex items-center gap-2">
          <VideoOctagon size="28" color="#1877F2" variant="Bold" /> Videos
        </h1>
        <Input
          placeholder="Search videos..."
          startContent={<SearchNormal1 size="18" />}
          radius="full"
          value={search}
          onValueChange={setSearch}
          className="max-w-xs"
          classNames={{ inputWrapper: "bg-white dark:bg-[#242526] shadow-sm" }}
        />
      </div>

      {/* Category pills */}
      <div className="flex gap-2 flex-wrap">
        {categories.map(cat => (
          <Button
            key={cat}
            size="sm"
            radius="full"
            variant={activeCategory === cat ? "solid" : "flat"}
            color={activeCategory === cat ? "primary" : "default"}
            className="font-semibold"
            onPress={() => setActiveCategory(cat)}
          >{cat}</Button>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-20 text-gray-400">
          <VideoOctagon size="48" color="#9ca3af" className="mx-auto mb-3" />
          <p className="font-semibold">No videos found</p>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {filtered.map(v => (
          <Card key={v._id} className="border-none shadow-sm dark:bg-[#242526] hover:shadow-xl transition-all group cursor-pointer">
            <div className="relative overflow-hidden rounded-t-xl">
              <Image
                src={v.thumb}
                alt={v.title}
                className="w-full object-cover group-hover:scale-105 transition-transform duration-500"
                style={{ height: 190 }}
                width="100%"
                removeWrapper
              />
              <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <Button isIconOnly color="primary" variant="solid" radius="full" size="lg" onPress={() => toast("Playing: " + v.title)}>
                  <Play size="24" variant="Bold" color="white" />
                </Button>
              </div>
              <Chip size="sm" className="absolute bottom-2 right-2 bg-black/70 text-white text-xs font-bold" variant="flat">{v.duration}</Chip>
              <Chip size="sm" color="primary" className="absolute top-2 left-2 font-bold" variant="flat">{v.category}</Chip>
            </div>
            <CardBody className="px-3 py-3 gap-2">
              <p className="font-bold text-sm dark:text-white line-clamp-2">{v.title}</p>
              <div className="flex items-center gap-2">
                <Avatar src={v.avatar} size="sm" />
                <div>
                  <p className="text-xs font-semibold text-gray-600 dark:text-gray-300">{v.channel}</p>
                  <p className="text-xs text-gray-400">{v.views} views</p>
                </div>
              </div>
            </CardBody>
            <CardFooter className="px-3 pt-0 pb-3 flex gap-2">
              <Button size="sm" variant="light" className={`font-semibold flex-1 ${liked.includes(v._id) ? "text-[#1877F2]" : "text-gray-600 dark:text-gray-400"}`} startContent={<Heart size="16" variant={liked.includes(v._id) ? "Bold" : "Outline"} color={liked.includes(v._id) ? "#1877F2" : undefined} />} onPress={() => toggleLike(v._id)}>
                {v.likes + (liked.includes(v._id) ? 1 : 0)}
              </Button>
              <Button size="sm" variant="light" className="font-semibold flex-1 text-gray-600 dark:text-gray-400" startContent={<MessageText1 size="16" />} onPress={() => toast("Comments opened")}>Comment</Button>
              <Button size="sm" variant="light" className="font-semibold flex-1 text-gray-600 dark:text-gray-400" startContent={<Share size="16" />} onPress={() => toast("Link copied!")}>Share</Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
