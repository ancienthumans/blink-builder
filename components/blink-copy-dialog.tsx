"use client";

import { Button } from "@/components/ui/button";
import { Clipboard, Copy } from "lucide-react";
import { ActionGetResponse } from "@/lib/zod/action-get-response-schema";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { CodeRenderer } from "./code-renderer";

export function BlinkCopyDialogButton({ data }: { data: ActionGetResponse }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size={"icon"} variant={"outline"} className="h-9 w-9">
          <Clipboard className="size-4" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Action get response json</DialogTitle>
          <DialogDescription>
            Copy the json below to use in your project. Remember to replace the placeholders with
            your actual data.
          </DialogDescription>
        </DialogHeader>
        <CodeRenderer data={data} />
      </DialogContent>
    </Dialog>
  );
}
