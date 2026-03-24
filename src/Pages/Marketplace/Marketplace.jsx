import { useState } from "react";
import {
  Card, CardBody, CardFooter, Image, Button, Input, Chip, Avatar, Select, SelectItem,
} from "@heroui/react";
import { Shop, SearchNormal1, Location, Heart, Call } from "iconsax-reactjs";
import toast from "react-hot-toast";

import { listings, marketplaceCategories as categories } from "../../data/mockData";

const conditionColor = { "New": "success", "Used - Like New": "primary", "Used - Good": "warning", "Used - Fair": "default" };

export default function Marketplace() {
  const [saved, setSaved] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [sort, setSort] = useState("newest");

  const toggleSave = (id, title) => {
    if (saved.includes(id)) {
      setSaved(p => p.filter(i => i !== id));
      toast("Removed from saved");
    } else {
      setSaved(p => [...p, id]);
      toast.success(`"${title}" saved!`);
    }
  };

  const filtered = listings.filter(l => {
    const matchSearch = l.title.toLowerCase().includes(search.toLowerCase()) || l.location.toLowerCase().includes(search.toLowerCase());
    const matchCat = category === "All" || l.category === category;
    return matchSearch && matchCat;
  });

  return (
    <div className="max-w-[1200px] mx-auto px-4 py-6 flex flex-col gap-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <h1 className="text-2xl font-bold dark:text-white flex items-center gap-2">
          <Shop size="28" color="#1877F2" variant="Bold" /> Marketplace
        </h1>
        <div className="flex gap-2 w-full sm:w-auto">
          <Input
            placeholder="Search in Marketplace..."
            startContent={<SearchNormal1 size="18" />}
            radius="full"
            value={search}
            onValueChange={setSearch}
            className="flex-1 sm:w-72"
            classNames={{ inputWrapper: "bg-white dark:bg-[#242526] shadow-sm" }}
          />
          <Select
            size="sm"
            radius="md"
            selectedKeys={[sort]}
            onChange={e => setSort(e.target.value)}
            className="w-36"
            classNames={{ trigger: "bg-white dark:bg-[#242526]" }}
          >
            <SelectItem key="newest">Newest</SelectItem>
            <SelectItem key="price_low">Price: Low</SelectItem>
            <SelectItem key="price_high">Price: High</SelectItem>
          </Select>
        </div>
      </div>

      {/* Category pills */}
      <div className="flex gap-2 flex-wrap">
        {categories.map(cat => (
          <Button key={cat} size="sm" radius="full" variant={category === cat ? "solid" : "flat"} color={category === cat ? "primary" : "default"} className="font-semibold" onPress={() => setCategory(cat)}>{cat}</Button>
        ))}
      </div>

      <p className="text-gray-500 dark:text-gray-400 text-sm font-semibold">{filtered.length} items found</p>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {filtered.map(item => (
          <Card key={item._id} className="border-none shadow-sm dark:bg-[#242526] hover:shadow-xl transition-all cursor-pointer group">
            <div className="relative overflow-hidden rounded-t-xl">
              <Image
                src={item.image}
                alt={item.title}
                className="w-full object-cover group-hover:scale-105 transition-transform duration-500"
                style={{ height: 180 }}
                width="100%"
                removeWrapper
              />
              <button
                onClick={() => toggleSave(item._id, item.title)}
                className="absolute top-2 right-2 bg-white/80 dark:bg-gray-900/80 rounded-full p-1.5 hover:bg-white transition-colors"
              >
                <Heart size="18" variant={saved.includes(item._id) ? "Bold" : "Outline"} color={saved.includes(item._id) ? "#ef4444" : "#6b7280"} />
              </button>
              <Chip size="sm" color={conditionColor[item.condition] || "default"} className="absolute bottom-2 left-2 text-xs font-bold" variant="flat">{item.condition}</Chip>
            </div>
            <CardBody className="px-3 py-2 gap-1">
              <p className="font-black text-base text-[#1877F2]">{item.price}</p>
              <p className="font-semibold text-sm dark:text-white line-clamp-2">{item.title}</p>
              <div className="flex items-center gap-1 text-gray-400 text-xs">
                <Location size="12" />
                <span>{item.location}</span>
              </div>
              <p className="text-gray-400 text-xs">{item.date}</p>
            </CardBody>
            <CardFooter className="px-3 pb-3 pt-0 flex gap-2 items-center">
              <Avatar src={item.seller.avatar} size="sm" />
              <span className="text-xs text-gray-500 dark:text-gray-400 flex-1">{item.seller.name}</span>
              <Button isIconOnly size="sm" color="primary" variant="flat" onPress={() => toast(`Calling ${item.seller.name}...`)}>
                <Call size="14" />
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
