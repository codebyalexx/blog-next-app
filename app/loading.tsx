import { Loader } from "@/components/ui/loader";

export default function loading() {
  return (
    <div className="h-[50vh] flex items-center justify-center">
      <Loader />
    </div>
  );
}
