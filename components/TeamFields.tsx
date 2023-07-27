"use client";
import React, { useState, useEffect, ReactNode } from "react";
import { useFormContext } from "react-hook-form";

interface Row {
    key: string;
}

interface Props {
    children?: ReactNode;
 }

export const TeamFields = ({children}:Props) => {
    const [rows, setRows] = useState<Row[]>([]);
    const { register, formState: { errors } } = useFormContext();

    useEffect(() => {
        setRows([...rows, { key: 'default' }]);
    }, [])

    function addRow() {
        let key = "milestone-" + (rows.length + 2);
        setRows([...rows, { key }]);
    }

    function removeRow(index: string) {
        if (index !== "default")
          setRows((current) => current.filter((_) => _.key !== index));
    }

    return (
        <fieldset>
            {rows.map((row, index) => (
                <div key={index} className="mb-6">
                    <input
                        {
                            // @ts-ignore
                            ...register(`team.${row.key}.name`)
                        }
                        className="w-full input-field mb-2" 
                        placeholder="Name" 
                    />
                    <textarea
                        {
                            // @ts-ignore
                            ...register(`team.${row.key}.bio`)
                        }
                        className="w-full input-field mb-2" 
                        placeholder="Bio" 
                    />
                    <input
                        {
                            // @ts-ignore
                            ...register(`team.${row.key}.email`)
                        }
                        className="w-full input-field mb-2" 
                        placeholder="Email" 
                    />
                </div>
            ))}
            <button className="bg-black text-white rounded leading-10 px-5" type="button" onClick={addRow}>+ add another</button>
        </fieldset>
    )
}