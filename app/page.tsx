"use client";

import { ActionGetResponse } from "@/lib/zod/action-get-response-schema";
import useLocalStorage from "@/hooks/use-local-storage";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BlinkCard } from "@/components/blink-card";
import { Button } from "@/components/ui/button";
import { RotateCcw } from "lucide-react";
import { BlinkEditorSheetButton } from "@/components/blink-editor-sheet";
import { BlinkTwitterCard } from "@/components/blink-twitter-card";
import { BlinkCopyDialogButton } from "@/components/blink-copy-dialog";

const defautValue: ActionGetResponse = {
  icon: "https://ucarecdn.com/ad19063e-b309-4d65-9b89-257256ead3a9/-/preview/880x880/-/quality/smart/-/format/auto/",
  label: "add-label-here",
  title: "Buy Bonk with SOL",
  description:
    "Buy Bonk with SOL. Choose a USD amount of SOL from the options below, or enter a custom amount. This is not an endorsement to buy Bonk in any respect.",
  links: {
    actions: [
      {
        label: "$10",
        href: "/your-api-here",
      },
      {
        label: "$100",
        href: "/your-api-here",
      },
      {
        label: "$250",
        href: "/your-api-here",
      },
      {
        href: "/your-api-here",
        label: "Buy Bonk",
        parameters: [
          {
            name: "your-parameter-name-here",
            label: "Enter a custom USD amount",
          },
        ],
      },
    ],
  },
};

export default function Home() {
  const [data, setData, removeData, loading, resetData] = useLocalStorage("blink", defautValue);

  return (
    <div className="p-6 py-16 ">
      <div className=" max-w-md w-full mx-auto">
        {loading ? (
          "loading..."
        ) : (
          <div className="flex flex-col gap-4">
            <div className="flex gap-2 ">
              <Button size={"sm"} variant={"outline"} className="mr-auto" onClick={resetData}>
                <RotateCcw className="size-4" /> Reset
              </Button>
              <BlinkCopyDialogButton data={data} />
              <BlinkEditorSheetButton data={data} setData={setData} />
            </div>
            <Tabs defaultValue="Dial.to">
              <TabsList className="grid grid-cols-2">
                <TabsTrigger value="Dial.to">Dial.to</TabsTrigger>
                <TabsTrigger value="Twitter">Twitter</TabsTrigger>
              </TabsList>
              <TabsContent value="Dial.to">
                <BlinkCard data={data} />
              </TabsContent>
              <TabsContent value="Twitter">
                <BlinkTwitterCard data={data} />
              </TabsContent>
            </Tabs>
          </div>
        )}
      </div>
    </div>
  );
}
