"use client";
import React, { useState, useEffect, ReactNode } from "react";
import { Project, ProjectUpdate } from "@/types/mongo";
import { AdminNav } from "@/components/AdminNav";
import { useForm, SubmitHandler } from "react-hook-form";
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
import { useContext } from "react";
import { AuthContext } from "@/components/AuthProvider";

export default function Updates() {
    const { data } = useGetCurrentUser()
    const [projects, setProjects] = useState<Project[]>([]);
    const [project, setProject] = useState<Project>();
    const [updates, setUpdates] = useState<ProjectUpdate[]>([]);
    const { idToken } = useContext(AuthContext)
    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm<ProjectUpdate>({
        mode: "onBlur",
        defaultValues: {
          project: '',
          text: ''
        }
      });

    useEffect(() => {
        if(data)
        getProjects(data._id)
    }, [data, getProjects]);

    const onSubmit: SubmitHandler<ProjectUpdate> = (formData) => {
        try {
            sendUpdate(formData)
        } catch (error) {
          console.log(error)
        }
      };
    
    async function sendUpdate(values: ProjectUpdate) {
        const res = await fetch(`${process.env.BACKEND_URL}/projects/${values.project}/updates`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${idToken}`,
          },
          body: JSON.stringify(values),
        });
        return await res.json();
    }

    function selectProject(projectId:string) {
        const currentProject = projects.filter((p) => p._id === projectId)
        setProject(currentProject[0])
        if(project)
        getUpdates(project?._id)
    }

    async function getUpdates(projectId:string) {
        const res = await fetch(`${process.env.BACKEND_URL}/projects/${projectId}/updates`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${idToken}`,
            }
          })
          .then(res => res.json())
          .then(
            (result) => {
                setUpdates(result)
            }
          );
          return res;
    }

    async function getProjects(id:string) {
        const res = await fetch(`${process.env.BACKEND_URL}/users/${id}/projects`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${idToken}`,
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
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <Select {...register(`project`, { required: "Project is required" })} onValueChange={selectProject}>
                            <SelectTrigger className="w-full my-6">
                                <SelectValue placeholder="Select a vision to update" />
                            </SelectTrigger>
                            <SelectContent>
                                {projects.map((project, index) => (
                                    <SelectItem key={index} value={project._id}>{project.title}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        <Textarea {...register(`text`, { required: "Text is required" })} className="mb-4" />
                        <Button type="submit">Share Update</Button>
                    </form>
                </div>
                {project && (
                    <div className="flex-grow">
                        <Accordion type="single" collapsible className="w-full">
                            <AccordionItem value="item-1">
                                <AccordionTrigger>Previous Updates</AccordionTrigger>
                                <AccordionContent>
                                    {!updates && (
                                        <p>There are no updates for this project.</p>
                                    )}
                                    {updates && updates.map((update, index) => (
                                        <p key={index}>{update.text}</p>
                                    ))}
                                </AccordionContent>
                            </AccordionItem>
                            <AccordionItem value="item-2">
                                <AccordionTrigger>Previous Milestones</AccordionTrigger>
                                <AccordionContent>
                                    {!project.milestones && (
                                        <p>There are no milestones for this project.</p>
                                    )}
                                    {project.milestones && project.milestones.map((milestone, index) => (
                                        <p key={index}>{milestone.text}: {milestone.amount}</p>
                                    ))}
                                </AccordionContent>
                            </AccordionItem>
                        </Accordion>
                    </div>
                )}
            </div>
        </div>
    )
}