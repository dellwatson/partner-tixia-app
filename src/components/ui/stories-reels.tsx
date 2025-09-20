'use client';

import React, { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { X } from 'lucide-react';
import { cn } from '~/lib/utils';
import {
	Stories,
	StoriesContent,
	Story,
	StoryVideo,
	StoryImage,
	StoryAuthor,
	StoryAuthorImage,
	StoryAuthorName,
	StoryOverlay,
} from './kibo-ui/stories';
import {
	Reel,
	ReelContent,
	ReelItem,
	ReelVideo,
	ReelImage,
	ReelProgress,
	ReelControls,
	ReelPlayButton,
	ReelMuteButton,
	ReelNavigation,
	ReelHeader,
	type ReelItem as ReelItemType,
} from './kibo-ui/reel';

export interface StoryData {
	id: string;
	type: 'video' | 'image';
	src: string;
	duration: number;
	author: {
		name: string;
		avatar?: string;
		fallback?: string;
	};
	title?: string;
}

interface StoriesReelsProps {
	stories: StoryData[];
	className?: string;
}

export const StoriesReels = ({ stories, className }: StoriesReelsProps) => {
	const [selectedStoryIndex, setSelectedStoryIndex] = useState<number | null>(null);
	const [isOpen, setIsOpen] = useState(false);

	const handleStoryClick = (index: number) => {
		setSelectedStoryIndex(index);
		setIsOpen(true);
	};

	const handleClose = () => {
		setIsOpen(false);
		setTimeout(() => setSelectedStoryIndex(null), 300); // Wait for animation to complete
	};

	const selectedStory = selectedStoryIndex !== null ? stories[selectedStoryIndex] : null;

	// Convert stories to reel format
	const reelData: ReelItemType[] = stories.map((story) => ({
		id: story.id,
		type: story.type,
		src: story.src,
		duration: story.duration,
		alt: story.title || `Story by ${story.author.name}`,
		title: story.title,
		description: `Story by ${story.author.name}`,
	}));

	return (
		<>
			{/* Stories List */}
			<div className={cn('w-full', className)}>
				<Stories>
					<StoriesContent>
						{stories.map((story, index) => (
							<Story
								key={story.id}
								className="h-48 w-32 md:h-64 md:w-40 flex-shrink-0"
								onClick={() => handleStoryClick(index)}
							>
								{story.type === 'video' ? (
									<StoryVideo src={story.src} />
								) : (
									<StoryImage src={story.src} alt={story.title || `Story by ${story.author.name}`} />
								)}
								<StoryOverlay side="bottom" />
								<StoryAuthor>
									<StoryAuthorImage
										src={story.author.avatar}
										name={story.author.name}
										fallback={story.author.fallback}
									/>
									<StoryAuthorName>{story.author.name}</StoryAuthorName>
								</StoryAuthor>
							</Story>
						))}
					</StoriesContent>
				</Stories>
			</div>

			{/* Fullscreen Reel Modal */}
			<AnimatePresence>
				{isOpen && selectedStory && (
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						className="fixed inset-0 z-50 flex items-center justify-center"
						onClick={handleClose}
					>
						{/* Dark Background Overlay */}
						<div className="absolute inset-0 bg-black/90 backdrop-blur-sm" />

						{/* Reel Container */}
						<motion.div
							initial={{ scale: 0.9, opacity: 0 }}
							animate={{ scale: 1, opacity: 1 }}
							exit={{ scale: 0.9, opacity: 0 }}
							transition={{ type: 'spring', damping: 25, stiffness: 300 }}
							className="relative z-10 h-[80vh] w-full max-w-sm mx-4"
							onClick={(e) => e.stopPropagation()}
						>
							<Reel
								data={reelData}
								defaultIndex={selectedStoryIndex || 0}
								className="h-full w-full rounded-2xl overflow-hidden shadow-2xl"
							>
								{/* Close Button */}
								<ReelHeader>
									<div className="flex justify-between items-center">
										<div className="flex items-center gap-2 text-white">
											<div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
												<span className="text-sm font-medium">
													{selectedStory.author.fallback || selectedStory.author.name.charAt(0).toUpperCase()}
												</span>
											</div>
											<span className="text-sm font-medium">{selectedStory.author.name}</span>
										</div>
										<button
											onClick={handleClose}
											className="w-8 h-8 rounded-full bg-black/40 flex items-center justify-center text-white hover:bg-black/60 transition-colors"
										>
											<X className="w-4 h-4" />
										</button>
									</div>
								</ReelHeader>

								{/* Progress Indicators */}
								<ReelProgress />

								{/* Reel Content */}
								<ReelContent>
									{(item, index) => (
										<ReelItem key={item.id}>
											{item.type === 'video' ? (
												<ReelVideo src={item.src} />
											) : (
												<ReelImage src={item.src} alt={item.alt || ''} />
											)}
										</ReelItem>
									)}
								</ReelContent>

								{/* Navigation (tap left/right to navigate) */}
								<ReelNavigation />

								{/* Controls */}
								<ReelControls>
									<div className="flex items-center gap-2">
										<ReelPlayButton />
										<ReelMuteButton />
									</div>
								</ReelControls>
							</Reel>
						</motion.div>
					</motion.div>
				)}
			</AnimatePresence>
		</>
	);
};
