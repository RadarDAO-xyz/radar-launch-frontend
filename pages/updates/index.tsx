"use client";
import React, { useState, useEffect, ReactNode } from "react";
import { Project } from "@/types/mongo";
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
import { useGetCurrentUser } from "@/hooks/useGetCurrentUser";

export default function Updates() {
    const { data } = useGetCurrentUser()
    const [projects, setProjects] = useState<Project[]>([]);
    const [project, setProject] = useState<Project>();

    useEffect(() => {
       getProjects(data._id)
    }, [data]);

    ///projects/:projectId/updates

    function selectProject(projectId:string) {
        const currentProject = projects.filter((p) => p._id === projectId)
        setProject(currentProject[0])
    }

    async function getProjects(id:number) {
        const res = await fetch(`${process.env.BACKEND_URL}/users/${id}/projects`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${id}`,
            }
          })
          .then(res => res.json())
          .then(
            (result) => {
                setProjects(result)
            }
          );
          return res;
    } 

    return (
        <div className="mt-24 max-w-screen-lg mx-auto">
            <AdminNav />
            <div className="flex mb-20">
                <div className="w-1/2 pr-10">
                    <h1 className="text-lg">Share an update with your supporters</h1>
                    <p>Update your supporters with the latest intel on your project and progress. Let them know what you&apos;re looking for and how they can support you. Help them help you spread your vision!</p>
                    
                    <Select onValueChange={selectProject}>
                        <SelectTrigger className="w-full my-6">
                            <SelectValue placeholder="Select a vision to update" />
                        </SelectTrigger>
                        <SelectContent>
                            {projects.map((project) => (
                                <SelectItem value={project._id}>{project.title}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    <Textarea className="mb-4" />
                    <Button>Share Update</Button>
                </div>
                {project && (
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
                )}
            </div>
        </div>
    )
}