import { useState } from "react";

/*
	This is the Images page.
	Anything changed in here, will be reflected in the game / browser.
*/
const Images = () => {
	/* This is  the default URL for the image input.
		This will be displayed when the page is first loaded.
	*/
	const [imageUrl, setImageUrl] = useState(
		"https://r2.fivemanage.com/pub/earoojlnb06p.png"
	);

	// This changes the url to the one that is inputted.
	const handleInputChange = (event: any) => {
		setImageUrl(event.target.value);
	};
	return (
		<>
			<div className="absolute top-2 left-[27.1%] font-bold">
				<h1 className="text-center">
					Use the below input to paste a link to an image.
				</h1>
				<h2>The link can be anything, as long as it returns an image.</h2>
			</div>
			<img
				src={imageUrl}
				alt="Image from URL will be displayed here."
				className="w-auto h-[70%] absolute left-[33.4%] top-14"
			/>
			<div>
				<input
					type="text"
					value={imageUrl}
					onChange={handleInputChange}
					placeholder="Enter image URL"
					className="absolute left-[29%] bottom-[13%] w-[42%] h-[5%] border-[2px] border-black text-left p-3"
				/>
			</div>
		</>
	);
};

export default Images;
