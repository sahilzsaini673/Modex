"use client"

import * as React from "react"
import { Hash, UsersRound, SquarePen, Image, Eraser, Speech, File } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import Link from "next/link"

export function CollapsibleDemo1() {
  const [isOpen, setIsOpen] = React.useState(false)

  return (
    <Collapsible
      open={isOpen}
      onOpenChange={setIsOpen}
      className="flex w-[250px] flex-col gap-2"
    >
      <div className="flex flex-col justify-between gap-4 ml-5 text-xs">
        <h4 className="items-center font-semibold flex text-sm">
          <UsersRound className="mr-2" /> 
          <Link href='/dashboard/community'>Community</Link>
        </h4>
        
        <CollapsibleTrigger asChild>
          <Button variant="ghost" size="icon" className="size-8">
            <span className="sr-only">Toggle</span>
          </Button>
        </CollapsibleTrigger>
      </div>
    </Collapsible>
  )
}
