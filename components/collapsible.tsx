"use client"

import * as React from "react"
import { Hash, SquarePen, Image, Eraser, Speech } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import Link from "next/link"

export function CollapsibleDemo() {
  const [isOpen, setIsOpen] = React.useState(false)

  const menuItems = [
    { icon: SquarePen, label: "Write Article", href: "/dashboard/article-writer" },
    { icon: Hash, label: "Blog Titles", href: "/dashboard/title-writer" },
    { icon: Image, label: "Generate Images", href: "/dashboard/image-generator" },
    { icon: Eraser, label: "Remove Background", href: "/dashboard/remove-background" },
    // { icon: Speech, label: "Speech To Text", href: "/dashboard/speech-to-text" },
  ]

  return (
    <Collapsible
      open={isOpen}
      onOpenChange={setIsOpen}
      className="flex w-[250px] flex-col gap-2"
    >
      <div className="flex flex-col justify-between gap-2 ml-3">
        {menuItems.map(({ icon: Icon, label, href }) => (
          <Link
            key={href}
            href={href}
            className="flex items-center gap-2 text-sm font-medium text-black hover:bg-gray-100 px-3 py-2 rounded-md transition-colors"
          >
            <Icon className="w-4 h-4" />
            {label}
          </Link>
        ))}

        {/* Optional toggle button (for collapsible behaviour) */}
        <CollapsibleTrigger asChild>
          <Button variant="ghost" size="icon" className="mt-2 size-8 mx-auto">
            <span className="sr-only">Toggle</span>
          </Button>
        </CollapsibleTrigger>
      </div>
    </Collapsible>
  )
}
