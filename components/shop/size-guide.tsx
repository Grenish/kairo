"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export function SizeGuide() {
  return (
    <Dialog>
      <DialogTrigger>
        <Button
          variant={"link"}
          className="text-sm text-muted-foreground underline underline-offset-4 hover:text-primary transition-colors"
        >
          Size Guide
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>Japanese Size Chart</DialogTitle>
          <DialogDescription>
            General sizing conversions for our collection. All measurements are
            in centimeters.
          </DialogDescription>
        </DialogHeader>
        <div className="overflow-x-auto mt-4">
          <table className="w-full text-sm text-left">
            <thead className="bg-secondary/20 text-foreground font-semibold">
              <tr>
                <th className="px-4 py-3 rounded-tl-lg">Size (JP)</th>
                <th className="px-4 py-3">International</th>
                <th className="px-4 py-3">Chest (cm)</th>
                <th className="px-4 py-3">Waist (cm)</th>
                <th className="px-4 py-3 rounded-tr-lg">Height (cm)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              <tr className="hover:bg-secondary/10 transition-colors">
                <td className="px-4 py-3 font-medium">S</td>
                <td className="px-4 py-3">XS / US 34</td>
                <td className="px-4 py-3">80 - 88</td>
                <td className="px-4 py-3">68 - 76</td>
                <td className="px-4 py-3">155 - 165</td>
              </tr>
              <tr className="hover:bg-secondary/10 transition-colors">
                <td className="px-4 py-3 font-medium">M</td>
                <td className="px-4 py-3">S / US 36</td>
                <td className="px-4 py-3">88 - 96</td>
                <td className="px-4 py-3">76 - 84</td>
                <td className="px-4 py-3">165 - 175</td>
              </tr>
              <tr className="hover:bg-secondary/10 transition-colors">
                <td className="px-4 py-3 font-medium">L</td>
                <td className="px-4 py-3">M / US 38</td>
                <td className="px-4 py-3">96 - 104</td>
                <td className="px-4 py-3">84 - 94</td>
                <td className="px-4 py-3">175 - 185</td>
              </tr>
              <tr className="hover:bg-secondary/10 transition-colors">
                <td className="px-4 py-3 font-medium">XL</td>
                <td className="px-4 py-3">L / US 40</td>
                <td className="px-4 py-3">104 - 112</td>
                <td className="px-4 py-3">94 - 104</td>
                <td className="px-4 py-3">175 - 185</td>
              </tr>
              <tr className="hover:bg-secondary/10 transition-colors">
                <td className="px-4 py-3 font-medium">XXL</td>
                <td className="px-4 py-3">XL / US 42</td>
                <td className="px-4 py-3">112 - 120</td>
                <td className="px-4 py-3">104 - 114</td>
                <td className="px-4 py-3">180+</td>
              </tr>
            </tbody>
          </table>
          <p className="text-xs text-muted-foreground mt-4">
            * These are general measurements. Fit may vary by style and
            material.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
