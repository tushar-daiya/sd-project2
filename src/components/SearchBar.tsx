"use client";
import React, { useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function SearchBar() {
  const searchParams = useSearchParams();
  const [mode, setMode] = useState(searchParams.get("mode") || "work");
  const [query, setQuery] = useState(searchParams.get("query") || "");
  const pathname = usePathname();
  const { replace } = useRouter();

  function handleClick() {
    const params = new URLSearchParams(searchParams);
    if(query) {
      params.set("query", query);
    }
    if (mode) {
      params.set("mode", mode);
    }
    replace(`${pathname}?${params.toString()}`);
  }

  return (
    <div className="flex items-center gap-5">
      <Select onValueChange={setMode} value={mode}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Select a mode" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem value="work">Work</SelectItem>
            <SelectItem value="casual">Casual</SelectItem>
            <SelectItem value="supportive">Supportive</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
      <Input
        placeholder="Search..."
        value={query}
        onChange={(event) => {
          setQuery(event.target.value);
        }}
      />
      <Button onClick={handleClick}>Search</Button>
    </div>
  );
}
