"use client";
import { useMemo } from "react";
import QuillEditor from "react-quill";
import "react-quill/dist/quill.snow.css";

type Props = {
	refs: any;
	content: string;
	error?: boolean;
	helperText?: string;
};

const formats = [
	"align",
	"header",
	"bold",
	"italic",
	"blockquote",
	"list",
	"bullet",
	"indent",
	"link",
	"color",
	"clean",
];

export default function Editor({ content, error, helperText, refs }: Props) {
	// Editor ref
	// const quillRef = useRef<any>(null);

	const modules = useMemo(
		() => ({
			toolbar: {
				container: [
					[{ header: [1, 2, 3, 4, 5, false] }],
					["bold", "italic", "blockquote"],
					[{ color: [] }],
					[
						{ list: "ordered" },
						{ list: "bullet" },
						{ indent: "-1" },
						{ indent: "+1" },
					],
					[{ align: [] }],
					["link"],
					["clean"],
				],
			},
			clipboard: {
				matchVisual: true,
			},
		}),
		[],
	);

	const checkCharacterCount = (event: any) => {
		const quill = refs.current?.getEditor();
		if (quill.getLength() > 600 && event.key !== "Backspace") {
			event.preventDefault();
		}
	};

	return (
		<div className="content-editor">
			<label className={error ? "error" : ""}>活動內容 *</label>
			<QuillEditor
				className={error ? "editor-error" : ""}
				ref={(el: any) => (refs.current = el)}
				theme="snow"
				formats={formats}
				modules={modules}
				defaultValue={content}
				onKeyDown={checkCharacterCount}
			/>
			{/* <button onClick={handler}>Submit</button> */}
			<div className={error ? "helperText error" : "helperText"}>
				{helperText}
			</div>
		</div>
	);
}
