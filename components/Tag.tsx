import React from "react";

export type TagProps = {
    name: string;
}

const Tag: React.FC<TagProps> = ({ name }) => {
    return (<div
        className="inline-flex items-baseline rounded-full px-2.5 py-0.5 text-sm font-medium text-slate-100 bg-neutral-800"
    >
        {name}
    </div>)
}

export default Tag;
