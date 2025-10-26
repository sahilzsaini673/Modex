"use client"

import * as React from "react"
import { Hash, SquarePen, Image, Eraser, Speech, File } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"

export function CollapsibleDemo2() {
  const [isOpen, setIsOpen] = React.useState(false)

  return (
    <Collapsible
      open={isOpen}
      onOpenChange={setIsOpen}
      className="flex w-[250px] flex-col gap-2"
    >
      <div className="flex flex-col justify-between gap-4 ml-5 text-xs">
        <h4 className="items-center font-semibold flex text-xs">
          <SquarePen className="mr-2" />
          <Link href='/dashboard/project/article'>Articles</Link>
        </h4>
        <h4 className="items-center font-semibold flex text-xs">
          <Hash className="mr-2" /> 
          <Link href='/dashboard/project/ai-images'>Images</Link>
        </h4>
        <CollapsibleTrigger asChild>
          <Button variant="ghost" size="icon" className="size-8">
            <span className="sr-only">Toggle</span>
          </Button>
        </CollapsibleTrigger>
      </div>
      {/* <CollapsibleContent className="flex flex-col gap-2">
        <div className=" px-4 py-2 font-mono text-sm">
          2
        </div>
        <div className=" px-4 py-2 font-mono text-sm">
          3
        </div>
      </CollapsibleContent> */}
    </Collapsible>
  )
}
