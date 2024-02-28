"use client";

import { DateTimePicker } from "@/components/datetime-picker";
import PlateEditor from "@/components/plate-editor";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader } from "@/components/ui/loader";
import { createPost } from "@/src/action/post.action";
import { TElement } from "@udecode/plate-common";
import { SendIcon, Trash2Icon } from "lucide-react";
import { Session } from "next-auth";
import { redirect } from "next/navigation";
import { ReactNode, useId, useState, useTransition } from "react";
import { toast } from "sonner";

const Page = ({ session }: { session: Session }) => {
  /* title & desc ... */
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");

  /* tags */
  const [tags, setTags] = useState([] as string[]);
  const handeTagAdd = (str: string) => setTags([...tags, str.toLowerCase()]);
  const handleTagRemove = (str: string) =>
    setTags(tags.filter((t: string) => t !== str));

  /* release schedule */
  const [isScheduled, setIsScheduled] = useState(false);
  const [releaseDate, setReleaseDate] = useState<Date>(new Date());

  /* plate editor */
  const [contents, setContents] = useState<TElement[]>([
    {
      id: "1",
      type: "p",
      children: [{ text: "Hello, World!" }],
    },
  ]);

  /* loading */
  const [isLoading, startTransition] = useTransition();

  return (
    <>
      <h1 className="text-3xl font-bold mb-2">Create post</h1>
      <div className="grid grid-cols-2 max-md:*:col-span-2 gap-x-2 gap-y-4">
        <InputForm
          value={title}
          onChange={setTitle}
          placeholder="Type post title..."
        >
          Post title
        </InputForm>
        <InputForm
          value={description}
          onChange={setDescription}
          placeholder="Type post description..."
        >
          Short description
        </InputForm>
        <div className="col-span-2">
          <InputForm
            value={image}
            onChange={setImage}
            placeholder="Enter image URL..."
          >
            Banner image URL
          </InputForm>
        </div>
        <TagsForm tags={tags} onAdd={handeTagAdd} onRemove={handleTagRemove} />
        <PublishForm
          isScheduled={isScheduled}
          setIsScheduled={setIsScheduled}
          releaseDate={releaseDate}
          setReleaseDate={setReleaseDate}
        />
      </div>
      <h2 className="text-2xl font-bold">Editor</h2>
      <div className="w-full max-w-[1336px] rounded-lg border bg-background shadow">
        <PlateEditor value={contents} setValue={setContents} />
      </div>
      <div className="flex items-center justify-end">
        <Button
          onClick={async () => {
            startTransition(async () => {
              const res = await createPost({
                userId: session?.user?.id || "0",
                contents: JSON.stringify(contents),
                description,
                title,
                tags: tags.join(";"),
                imageURL: image,
                duration: 0,
                releasedAt: isScheduled ? releaseDate : new Date(),
              });

              if (res.success) {
                const { postId } = res;
                redirect(`/post/${postId}`);
              } else {
                toast.error(res.message);
              }

              return;
            });
          }}
          className="w-full flex items-center gap-2"
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              Publishing... <Loader />
            </>
          ) : (
            <>
              Publish <SendIcon className="w-4 h-4" />
            </>
          )}
        </Button>
      </div>
    </>
  );
};

const InputForm = ({
  value,
  onChange,
  children,
  placeholder,
}: {
  value: string;
  onChange: any;
  children: ReactNode;
  placeholder?: string;
}) => {
  const id = useId();
  return (
    <div className="w-full space-y-1">
      <label htmlFor={id} className="font-semibold">
        {children}
      </label>
      <Input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        id={id}
        placeholder={placeholder}
      />
    </div>
  );
};

const TagsForm = ({
  tags,
  onAdd,
  onRemove,
}: {
  tags: string[];
  onAdd: any;
  onRemove: any;
}) => {
  const [tagText, setTagText] = useState("");

  return (
    <div className="w-full space-y-2">
      <p className="font-semibold">Tags</p>
      {tags.length > 0 && (
        <div className="flex items-center gap-2">
          {tags.map((tag) => (
            <Badge
              key={tag}
              className="capitalize cursor-pointer flex items-center gap-1"
              onClick={() => {
                onRemove(tag);
              }}
            >
              {tag} <Trash2Icon className="h-3.5 w-3.5" />
            </Badge>
          ))}
        </div>
      )}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (tagText.length === 0) return;
          onAdd(tagText);
          setTagText("");
        }}
        className="flex items-center gap-2 max-w-xl"
      >
        <Input
          placeholder="Enter tag name..."
          value={tagText}
          onChange={(e) => setTagText(e.target.value)}
        />
        <Button type="submit">Add</Button>
      </form>
    </div>
  );
};

const PublishForm = ({
  isScheduled,
  setIsScheduled,
  releaseDate,
  setReleaseDate,
}: {
  isScheduled: boolean;
  setIsScheduled: any;
  releaseDate: Date | undefined;
  setReleaseDate: any;
}) => {
  const id = useId();
  return (
    <div className="flex flex-col justify-center gap-2">
      <p className="font-semibold">Publish options</p>
      <div className="flex items-center gap-2">
        <Checkbox
          id={id}
          checked={isScheduled}
          onCheckedChange={(e: boolean) => setIsScheduled(e)}
        />
        <Label htmlFor={id}>Schedule release</Label>
      </div>
      {isScheduled && (
        <DateTimePicker date={releaseDate} setDate={setReleaseDate} />
      )}
    </div>
  );
};

export default Page;
