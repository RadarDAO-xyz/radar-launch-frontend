import { AdminNav } from "@/devlink";
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
                    <p>It&apos;s important to update your supporters so they can get the latest access, share about your vision and be ready to support your next fundraise. Select your project, add your submission and click submit, updates are made onchain and cannot be edited. This update goes on your main project page.</p>
                    
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