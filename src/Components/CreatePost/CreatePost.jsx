import { Button, Card, CardBody, Divider, Avatar, Textarea } from "@heroui/react";
import { useState } from "react";
import toast from "react-hot-toast";
import { Gallery, EmojiHappy, VideoOctagon } from "iconsax-reactjs";
import { addPost, currentUser } from "../../data/mockData";

export default function CreatePost({ onPostCreated }) {
    const [content, setContent] = useState("");
    const [loading, setLoading] = useState(false);

    const handlePost = () => {
        if (!content.trim()) return;
        setLoading(true);
        setTimeout(() => {
            addPost(content);
            toast.success("Post shared! 🎉");
            setContent("");
            setLoading(false);
            if (onPostCreated) onPostCreated();
        }, 300);
    };

    return (
        <Card className="w-full shadow-sm border-none bg-white dark:bg-[#242526] transition-colors">
            <CardBody className="gap-4 px-4 py-4">
                <div className="flex gap-3 items-start">
                    <Avatar src={currentUser.photo} size="md" />
                    <Textarea
                        placeholder={`What's on your mind, ${currentUser.name.split(" ")[0]}?`}
                        variant="flat"
                        minRows={1}
                        maxRows={6}
                        value={content}
                        onValueChange={setContent}
                        className="flex-1"
                        classNames={{
                            inputWrapper: "bg-[#F0F2F5] dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors rounded-2xl border-none",
                            input: "text-sm dark:text-white",
                        }}
                    />
                </div>
                <Divider className="dark:bg-gray-700" />
                <div className="flex justify-between items-center sm:px-2">
                    <div className="flex gap-1 sm:gap-2 flex-wrap">
                        <Button variant="light" size="sm" startContent={<VideoOctagon size="20" color="#F3425F" variant="Bold" />} className="text-gray-600 dark:text-gray-300 font-semibold px-2">Live video</Button>
                        <Button variant="light" size="sm" startContent={<Gallery size="20" color="#45BD62" variant="Bold" />} className="text-gray-600 dark:text-gray-300 font-semibold px-2">Photo/video</Button>
                        <Button variant="light" size="sm" startContent={<EmojiHappy size="20" color="#F7B928" variant="Bold" />} className="text-gray-600 dark:text-gray-300 font-semibold px-2">Feeling</Button>
                    </div>
                    <Button
                        color="primary"
                        size="sm"
                        onPress={handlePost}
                        isLoading={loading}
                        isDisabled={!content.trim()}
                        className="px-6 font-bold"
                        radius="md"
                    >
                        Post
                    </Button>
                </div>
            </CardBody>
        </Card>
    );
}
