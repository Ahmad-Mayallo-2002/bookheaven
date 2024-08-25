import React from "react";

export default function Loading({
  width = 100,
  height = 100,
  border = "10px solid #fff",
}: {
  width: number;
  height: number;
  border: string;
}) {
  return (
    <div className="h-[100vh] flex items-center justify-center">
      <div
        className="loading rounded-full bg-transparent animate-spin"
        style={{
          width: `${width}px`,
          height: `${height}px`,
          border: border,
          borderTopColor: "transparent",
        }}
      ></div>
    </div>
  );
}
