"use client";

import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  IconArrowLeft,
  IconError404,
  IconGlobe,
  IconHome,
  IconRss,
  IconSearch,
} from "@tabler/icons-react";
import Link from "next/link";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { cn } from "@/lib/utils";
import { useParams, useRouter } from "next/navigation";
import { Separator } from "@/components/ui/separator";

export default function NotFound() {
  const params = useParams();
  const router = useRouter();
  const lang = (params?.lang as string) || "en";

  return (
    <div className="min-h-svh flex items-center justify-center bg-muted/20 p-6">
      <Empty>
        <EmptyHeader>
          <EmptyMedia>
            <IconError404 className="w-8 h-8 text-primary" />
          </EmptyMedia>
          <EmptyTitle>Sorry, page not found</EmptyTitle>
          <EmptyDescription>
            The page you are looking for doesn't exist or has been moved.
          </EmptyDescription>
        </EmptyHeader>
        <EmptyContent className="space-y-2">
          <InputGroup className="w-full">
            <InputGroupAddon>
              <IconSearch className="w-4 h-4 text-muted-foreground" />
            </InputGroupAddon>
            <InputGroupInput placeholder="Search for products..." />
          </InputGroup>

          <Separator />

          <div className="grid grid-cols-2 gap-3 w-full">
            <Link
              href={`/${lang}/blogs`}
              className={cn(
                buttonVariants({ variant: "outline" }),
                "h-24 flex-col gap-2"
              )}
            >
              <IconRss />
              <span className="font-medium">Blogs</span>
            </Link>
            <Link
              href={`/${lang}/collection`} // Redirect to home/collection
              className={cn(
                buttonVariants({ variant: "outline" }),
                "h-24 flex-col gap-2"
              )}
            >
              <IconGlobe />
              <span className="font-medium">Collection</span>
            </Link>
          </div>

          <div className="w-full pt-2">
            <Button
              variant={"ghost"}
              className="w-full"
              onClick={() => router.back()}
            >
              <IconArrowLeft />
              Go Back
            </Button>
          </div>
        </EmptyContent>
      </Empty>
    </div>
  );
}
