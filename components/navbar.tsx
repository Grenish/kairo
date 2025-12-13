import {
  IconBook,
  IconDoorExit,
  IconGardenCart,
  IconGlobe,
  IconHome,
  IconPackageImport,
  IconSearch,
  IconSettings,
  IconUser,
} from "@tabler/icons-react";
import { ModeToggle } from "./mode-toggle";
import { InputGroup, InputGroupAddon, InputGroupInput } from "./ui/input-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Button } from "./ui/button";
import Link from "next/link";
import { Separator } from "./ui/separator";

export default function Navbar() {
  return (
    <header className="w-full backdrop-blur-3xl fixed top-0 bg-background/50 z-50">
      <nav className="w-[80%] mx-auto flex items-center justify-between p-2">
        <div className="flex items-center gap-5">
          <h2>Kairo</h2>
          <Separator orientation="vertical" />
          <ul className="flex items-center gap-2">
            <li>
              <Link
                href={"/"}
                className="hover:text-primary flex items-center gap-1 animate transition-colors duration-300 ease-in-out"
              >
                <IconHome size={20} /> Home
              </Link>
            </li>
            <li>
              <Link
                href={"/"}
                className="hover:text-primary flex items-center gap-1 animate transition-colors duration-300 ease-in-out"
              >
                <IconGlobe size={20} /> Browse
              </Link>
            </li>
            <li>
              <Link
                href={"/"}
                className="hover:text-primary flex items-center gap-1 animate transition-colors duration-300 ease-in-out"
              >
                <IconPackageImport size={20} /> New Arrivals
              </Link>
            </li>
            <li>
              <Link
                href={"/"}
                className="hover:text-primary flex items-center gap-1"
              >
                <IconBook size={20} /> Philosophy
              </Link>
            </li>
          </ul>
        </div>
        <div className="flex items-center gap-2">
          <InputGroup>
            <InputGroupAddon>
              <IconSearch />
            </InputGroupAddon>
            <InputGroupInput
              size={20}
              placeholder="Search..."
              className="outline-none text-xs"
            />
          </InputGroup>
          <Select defaultValue="EN">
            <SelectTrigger size="default">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="EN">EN</SelectItem>
              <SelectItem value="JP">JP</SelectItem>
            </SelectContent>
          </Select>
          <ModeToggle />
          <Button size="icon" variant={"outline"}>
            <IconGardenCart />
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger className={"outline-none"}>
              <Avatar>
                <Avatar>
                  <AvatarImage
                    src="https://github.com/shadcn.png"
                    alt="@shadcn"
                    className="rounded-none"
                  />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>
                <IconUser />
                Account
              </DropdownMenuItem>
              <DropdownMenuItem>
                <IconSettings />
                Settings
              </DropdownMenuItem>
              <DropdownMenuItem variant="destructive">
                <IconDoorExit />
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </nav>
    </header>
  );
}
