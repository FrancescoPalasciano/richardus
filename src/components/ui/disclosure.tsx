"use client";

import type { ComponentProps, ReactNode } from "react";
import {
  Accordion as AccordionPrimitive,
  Dialog as DialogPrimitive,
  Tabs as TabsPrimitive,
  Tooltip as TooltipPrimitive,
} from "radix-ui";
import { ChevronDown, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "./button";

export const Dialog = DialogPrimitive.Root;
export const DialogTrigger = DialogPrimitive.Trigger;
export const DialogClose = DialogPrimitive.Close;
export const Sheet = Dialog;
export const SheetTrigger = DialogTrigger;
export const SheetClose = DialogClose;
export const Drawer = Dialog;
export const DrawerTrigger = DialogTrigger;

export function DialogContent({
  className,
  children,
  ...props
}: ComponentProps<typeof DialogPrimitive.Content>) {
  return (
    <DialogPrimitive.Portal>
      <DialogPrimitive.Overlay className="ui-overlay" />
      <DialogPrimitive.Content
        className={cn("ui-dialog", className)}
        {...props}
      >
        {children}
        <DialogPrimitive.Close asChild>
          <Button
            variant="ghost"
            size="icon"
            className="ui-dialog-close"
            aria-label="Chiudi"
          >
            <X size={20} aria-hidden="true" />
          </Button>
        </DialogPrimitive.Close>
      </DialogPrimitive.Content>
    </DialogPrimitive.Portal>
  );
}
export function SheetContent(props: ComponentProps<typeof DialogContent>) {
  return (
    <DialogContent {...props} className={cn("ui-sheet", props.className)} />
  );
}
export function DrawerContent(props: ComponentProps<typeof DialogContent>) {
  return (
    <DialogContent {...props} className={cn("ui-drawer", props.className)} />
  );
}
export function DialogTitle(
  props: ComponentProps<typeof DialogPrimitive.Title>,
) {
  return (
    <DialogPrimitive.Title
      {...props}
      className={cn("ui-dialog-title", props.className)}
    />
  );
}
export function DialogDescription(
  props: ComponentProps<typeof DialogPrimitive.Description>,
) {
  return (
    <DialogPrimitive.Description
      {...props}
      className={cn("ui-dialog-description", props.className)}
    />
  );
}

export const Tabs = TabsPrimitive.Root;
export function TabsList(props: ComponentProps<typeof TabsPrimitive.List>) {
  return (
    <TabsPrimitive.List
      {...props}
      className={cn("ui-tabs-list", props.className)}
    />
  );
}
export function TabsTrigger(
  props: ComponentProps<typeof TabsPrimitive.Trigger>,
) {
  return (
    <TabsPrimitive.Trigger
      {...props}
      className={cn("ui-tab", props.className)}
    />
  );
}
export const TabsContent = TabsPrimitive.Content;

export const Accordion = AccordionPrimitive.Root;
export function AccordionItem(
  props: ComponentProps<typeof AccordionPrimitive.Item>,
) {
  return (
    <AccordionPrimitive.Item
      {...props}
      className={cn("ui-accordion-item", props.className)}
    />
  );
}
export function AccordionTrigger({
  children,
  ...props
}: ComponentProps<typeof AccordionPrimitive.Trigger>) {
  return (
    <AccordionPrimitive.Header>
      <AccordionPrimitive.Trigger
        {...props}
        className={cn("ui-accordion-trigger", props.className)}
      >
        {children}
        <ChevronDown size={18} aria-hidden="true" />
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  );
}
export function AccordionContent(
  props: ComponentProps<typeof AccordionPrimitive.Content>,
) {
  return (
    <AccordionPrimitive.Content
      {...props}
      className={cn("ui-accordion-content", props.className)}
    />
  );
}
export function Tooltip({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) {
  return (
    <TooltipPrimitive.Provider delayDuration={350}>
      <TooltipPrimitive.Root>
        <TooltipPrimitive.Trigger asChild>{children}</TooltipPrimitive.Trigger>
        <TooltipPrimitive.Portal>
          <TooltipPrimitive.Content sideOffset={8} className="ui-tooltip">
            {label}
          </TooltipPrimitive.Content>
        </TooltipPrimitive.Portal>
      </TooltipPrimitive.Root>
    </TooltipPrimitive.Provider>
  );
}
