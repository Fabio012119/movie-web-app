import { twMerge } from "tailwind-merge";

export default function Spinner() {
  return (
    <div className="flex justify-center items-center h-32">
      <div
        className={twMerge(
          "w-8 h-8 border-4 border-blue-600 ",
          "border-t-transparent rounded-full animate-spin",
        )}
      />
    </div>
  );
}
