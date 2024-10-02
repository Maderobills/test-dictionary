import Image from "next/image";

export default function Home() {
  return (
    <main className="h-screen p-10 flex flex-col items-center">
    <div className="text-center space-y-4">
      <h1 className="font-bold text-6xl">Dictionary</h1>
      <p className="text-lg">let's help you find the meaning to your confusion</p>
      <div className="space-x-6">
        <input type="text" placeholder="Enter word here" className="rounded-md bg-slate-100 p-2 px-4 w-64 outline-1	outline-slate-200"/>
        <button className="rounded-md bg-slate-700 p-2 px-6 text-white font-semibold">Find</button>
      </div>
    </div>
    <div className="m-10 p-6 bg-slate-100 w-full h-full rounded-md">Answer Box</div>
  </main>
  );
}
