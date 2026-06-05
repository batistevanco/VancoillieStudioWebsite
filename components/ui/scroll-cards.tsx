"use client";
import { FC } from "react";
import Image from "next/image";

// Types
interface iCardItem {
	title: string;
	description: string;
	tag: string;
	src: string;
	link: string;
	color: string;
	textColor: string;
}

interface iCardProps extends Omit<iCardItem, "src" | "link" | "tag"> {
	i: number;
	src: string;
}

// Components
const Card: FC<iCardProps> = ({
	title,
	description,
	color,
	textColor,
	i,
	src,
}) => {
	return (
		<div className="h-screen flex items-center justify-center sticky top-0 md:p-0 px-4">
			<div
				className="relative flex flex-col h-[300px] w-[700px] py-12 px-10 md:px-12
				rotate-0 md:h-[400px] md:w-[600px] items-center justify-center mx-auto 
				shadow-2xl rounded-2xl overflow-hidden border border-white/10"
				style={{ backgroundColor: color }}
			>
				{/* Dark overlay for readability since image is background */}
				<div className="absolute inset-0 bg-black/40 z-10" />

				<span className="font-bold relative text-4xl md:text-6xl mt-5 z-20 text-center">
					<span
						className="relative z-10 font-black tracking-tight"
						style={{ color: textColor }}
					>
						{title}
					</span>
				</span>
				<div
					className="text-base md:text-xl font-medium text-center mb-0 z-20 mt-4 tracking-wide max-w-md"
					style={{ lineHeight: 1.4, color: textColor }}
				>
					{description}
				</div>
				<div className="absolute inset-0 z-0">
					<Image
						className="w-full h-full object-cover"
						src={src}
						alt={title}
						fill
					/>
				</div>
			</div>
		</div>
	);
};

/**
 * CardSlide component displays a series of cards in a vertical scroll layout
 * Each card contains a title, description, and decorative elements
 */
interface iCardSlideProps {
	items: iCardItem[];
}

const CardsParallax: FC<iCardSlideProps> = ({ items }) => {
	return (
		<div className="min-h-screen relative z-10 py-12">
			{items.map((project, i) => {
				return <Card key={`p_${i}`} {...project} i={i} />;
			})}
		</div>
	);
};

export { CardsParallax, type iCardItem };
