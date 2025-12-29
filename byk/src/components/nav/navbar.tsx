import { BookOpen } from "lucide-react";


export default function Navbar() {
  return (
    <div className="mb-8">
      <div className="flex items-center gap-3 mb-6">
        <BookOpen className="w-8 h-8" />
        <h1>System &#34;ByK&#34;</h1>
      </div>
    </div>
  );
}