"use client"; // this registers <Editor> as a Client Component

import { BlockNoteView, useBlockNote } from "@blocknote/react";
import {
    Block,
    BlockNoteEditor,
    PartialBlock,
    uploadToTmpFilesDotOrg_DEV_ONLY,
} from "@blocknote/core";
import "@blocknote/react/style.css";
import { FC } from "react";

type Props = {
    initContent?: string;
    onChange: (value: string) => void;
    editable?: boolean;
};

const Editor: FC<Props> = (props) => {
    const editor: BlockNoteEditor | null = useBlockNote({
        editable: props.editable,
        initialContent: props.initContent
            ? JSON.parse(props.initContent)
            : undefined,
        onEditorContentChange(editor) {
            props.onChange(JSON.stringify(editor.topLevelBlocks, null, 2));
        },
    });

    return <BlockNoteView editor={editor} lang="vi" spellCheck={false} />;
};

export default Editor;
