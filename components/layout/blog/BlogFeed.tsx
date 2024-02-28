import { BentoFeed } from "./BentoFeed";

const SAMPLE_POSTS = [
  {
    title: "Why do I always use tailwindcss in my projects?",
    image:
      "https://cdn.hashnode.com/res/hashnode/image/upload/v1704896264541/38fd02bb-e276-4b92-888f-0a11a6da2a41.jpeg?w=1600&h=840&fit=crop&crop=entropy&auto=compress,format&format=webp",
    createdAt: Date.now(),
    id: "0",
    tags: ["Development"],
  },
  {
    title: "Lorem ipsum j'connais pas la suite",
    image:
      "https://www.csoonline.com/wp-content/uploads/2024/02/iStock-1490203155-1.jpg?resize=1024%2C562&quality=50&strip=all",
    createdAt: Date.now(),
    id: "1",
    tags: ["Lifestyle"],
  },
  {
    title: "POV je prends la pose quand je curl barre ptdr",
    image:
      "https://i.pinimg.com/736x/df/70/67/df7067802b37cc37b7405c1bba3aca5d.jpg",
    createdAt: Date.now(),
    id: "2",
    tags: ["Sports"],
  },
  {
    title: "L'image de fond c'est moi 1er degré",
    image:
      "https://img.freepik.com/free-photo/young-fitness-man-studio_7502-5008.jpg?size=626&ext=jpg&ga=GA1.1.1395880969.1708992000&semt=sph",
    createdAt: Date.now(),
    id: "3",
    tags: ["Sports"],
  },
  {
    title: "Objectif 100000 pas : le résumé de ma semaine",
    image:
      "https://nova-live.imgix.net//Personal%20Goal%20Setting-d2ab2f6f-0bed-47f6-9abd-55b3af5d9e65.jpg?",
    createdAt: Date.now(),
    id: "4",
    tags: ["Sports"],
  },
];

export const BlogFeed = () => {
  return (
    <div className="w-full max-w-6xl p-4 space-y-4">
      <h2 className="text-3xl font-bold">Blog Feed</h2>
      <BentoFeed posts={SAMPLE_POSTS} />
    </div>
  );
};
