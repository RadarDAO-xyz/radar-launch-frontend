"use client";
import React, { useState, useEffect, ReactNode } from "react";
import { useFormContext } from "react-hook-form";

interface Row {
    key: string;
}

interface Props {
    children?: ReactNode;
 }

export const RepeatingField = ({children}:Props) => {
    const [rows, setRows] = useState<Row[]>([]);

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
                <>
                    {children}
                </>
            ))}
            <button type="button" onClick={addRow}>+ add another</button>
        </fieldset>
    )
}