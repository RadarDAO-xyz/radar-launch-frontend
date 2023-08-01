import { AdminNav } from "@/components/AdminNav";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Textarea } from "@/components/ui/textarea";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select";
import { Button } from "@/components/ui/button";

export default function Updates() {

    return (
        <div className="mt-24 max-w-screen-lg mx-auto">
            <AdminNav />
            <div className="flex mb-20">
                <div className="w-1/2 pr-10">
                    <h1 className="text-lg">Share an update with your supporters</h1>
                    <p>Update your supporters with the latest intel on your project and progress. Let them know what you&apos;re looking for and how they can support you. Help them help you spread your vision!</p>
                    
                    <Select>
                        <SelectTrigger className="w-full my-6">
                            <SelectValue placeholder="Select a vision to update" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="apple">First Choice</SelectItem>
                            <SelectItem value="banana">Second CHoice</SelectItem>
                            <SelectItem value="blueberry">Third Choice</SelectItem>
                        </SelectContent>
                    </Select>
                    <Textarea className="mb-4" />
                    <Button>Share Update</Button>
                </div>

                <div className="flex-grow">
                    <Accordion type="single" collapsible className="w-full">
                        <AccordionItem value="item-1">
                            <AccordionTrigger>Previous Updates</AccordionTrigger>
                            <AccordionContent>
                                There are no updates for this project.
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="item-2">
                            <AccordionTrigger>Previous Milestones</AccordionTrigger>
                            <AccordionContent>
                                There are no milestones for this project.
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>
                </div>
            </div>
        </div>
    )
}