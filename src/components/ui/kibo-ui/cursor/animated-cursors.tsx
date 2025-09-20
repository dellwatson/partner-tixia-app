'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Cursor, CursorPointer, CursorBody, CursorName, CursorMessage } from './index';

interface CursorData {
	id: string;
	name: string;
	message: string;
	color: string;
	bgColor: string;
	borderColor: string;
	startPosition: { x: number; y: number };
	endPosition: { x: number; y: number };
	delay: number;
	duration: number;
}

interface AnimatedCursorsProps {
	className?: string;
}

const cursorMessages = [
	{ name: 'Sarah', message: 'This looks incredible! 😍', color: 'blue' },
	{ name: 'Mike', message: 'Just booked my stay! 🔥', color: 'green' },
	{ name: 'Emma', message: 'Going viral on social! ✨', color: 'purple' },
	{ name: 'Alex', message: "Best deals I've seen! 👀", color: 'red' },
	{ name: 'Lisa', message: 'My friends need to see this! 🎉', color: 'orange' },
	{ name: 'Tom', message: 'Trending everywhere! 📈', color: 'pink' },
	{ name: 'Zoe', message: 'Dream vacation vibes! 💫', color: 'indigo' },
	{ name: 'Jake', message: 'Sharing with everyone! 🚀', color: 'teal' },
];

const colorMap = {
	blue: {
		text: 'text-blue-500',
		bg: 'bg-blue-100',
		border: 'border-blue-200',
		textColor: 'text-blue-800',
	},
	green: {
		text: 'text-green-500',
		bg: 'bg-green-100',
		border: 'border-green-200',
		textColor: 'text-green-800',
	},
	purple: {
		text: 'text-purple-500',
		bg: 'bg-purple-100',
		border: 'border-purple-200',
		textColor: 'text-purple-800',
	},
	red: {
		text: 'text-red-500',
		bg: 'bg-red-100',
		border: 'border-red-200',
		textColor: 'text-red-800',
	},
	orange: {
		text: 'text-orange-500',
		bg: 'bg-orange-100',
		border: 'border-orange-200',
		textColor: 'text-orange-800',
	},
	pink: {
		text: 'text-pink-500',
		bg: 'bg-pink-100',
		border: 'border-pink-200',
		textColor: 'text-pink-800',
	},
	indigo: {
		text: 'text-indigo-500',
		bg: 'bg-indigo-100',
		border: 'border-indigo-200',
		textColor: 'text-indigo-800',
	},
	teal: {
		text: 'text-teal-500',
		bg: 'bg-teal-100',
		border: 'border-teal-200',
		textColor: 'text-teal-800',
	},
};

export const AnimatedCursors = ({ className }: AnimatedCursorsProps) => {
	const [activeCursors, setActiveCursors] = useState<CursorData[]>([]);
	const [cursorIndex, setCursorIndex] = useState(0);

	const generateRandomPosition = () => ({
		x: Math.random() * 80 + 10, // 10% to 90% to stay within bounds
		y: Math.random() * 80 + 10, // 10% to 90% to stay within bounds
	});

	const generateMovementPattern = () => {
		const patterns = ['linear', 'circular', 'diagonal', 'curved'];
		const pattern = patterns[Math.floor(Math.random() * patterns.length)];

		switch (pattern) {
			case 'linear':
				// Horizontal or vertical movement within bounds
				const isHorizontal = Math.random() > 0.5;
				if (isHorizontal) {
					const y = Math.random() * 60 + 20; // Stay in middle area
					return {
						start: { x: 10, y },
						end: { x: 90, y: y + (Math.random() - 0.5) * 10 },
					};
				} else {
					const x = Math.random() * 60 + 20; // Stay in middle area
					return {
						start: { x, y: 10 },
						end: { x: x + (Math.random() - 0.5) * 10, y: 90 },
					};
				}

			case 'diagonal':
				// Corner to corner movement within bounds
				const corners = [
					{ start: { x: 15, y: 15 }, end: { x: 85, y: 85 } },
					{ start: { x: 85, y: 15 }, end: { x: 15, y: 85 } },
					{ start: { x: 15, y: 85 }, end: { x: 85, y: 15 } },
					{ start: { x: 85, y: 85 }, end: { x: 15, y: 15 } },
				];
				return corners[Math.floor(Math.random() * corners.length)];

			case 'circular':
				// Circular arc movement within bounds
				const centerX = 50;
				const centerY = 50;
				const radius = 20 + Math.random() * 15; // Smaller radius to stay in bounds
				const startAngle = Math.random() * Math.PI * 2;
				const endAngle = startAngle + Math.PI / 2 + Math.random() * Math.PI;

				return {
					start: {
						x: Math.max(10, Math.min(90, centerX + Math.cos(startAngle) * radius)),
						y: Math.max(10, Math.min(90, centerY + Math.sin(startAngle) * radius)),
					},
					end: {
						x: Math.max(10, Math.min(90, centerX + Math.cos(endAngle) * radius)),
						y: Math.max(10, Math.min(90, centerY + Math.sin(endAngle) * radius)),
					},
				};

			default: // curved
				// Bezier-like curved movement within bounds
				return {
					start: generateRandomPosition(),
					end: generateRandomPosition(),
				};
		}
	};

	const createNewCursor = (): CursorData => {
		const messageData = cursorMessages[cursorIndex % cursorMessages.length];
		const colors = colorMap[messageData.color as keyof typeof colorMap];
		const movement = generateMovementPattern();

		return {
			id: `cursor-${Date.now()}-${Math.random()}`,
			name: messageData.name,
			message: messageData.message,
			color: colors.text,
			bgColor: `${colors.bg} ${colors.textColor} border ${colors.border}`,
			borderColor: colors.border,
			startPosition: movement.start,
			endPosition: movement.end,
			delay: 0,
			duration: 4 + Math.random() * 3, // 4-7 seconds for smoother movement
		};
	};

	useEffect(() => {
		const interval = setInterval(() => {
			const newCursor = createNewCursor();
			setCursorIndex((prev) => prev + 1);

			setActiveCursors((prev) => {
				// Keep only the most recent 4 cursors
				const updated = [...prev, newCursor].slice(-4);
				return updated;
			});

			// Remove cursor after its duration + 1 second
			setTimeout(
				() => {
					setActiveCursors((prev) => prev.filter((cursor) => cursor.id !== newCursor.id));
				},
				(newCursor.duration + 1) * 1000
			);
		}, 3000); // New cursor every 3 seconds for less crowding

		return () => clearInterval(interval);
	}, [cursorIndex]);

	return (
		<div className={`pointer-events-none absolute inset-0 z-30 overflow-hidden ${className}`}>
			<AnimatePresence>
				{activeCursors.map((cursor) => (
					<motion.div
						key={cursor.id}
						initial={{
							x: `${cursor.startPosition.x}%`,
							y: `${cursor.startPosition.y}%`,
							opacity: 0,
							scale: 0.7,
						}}
						animate={{
							x: `${cursor.endPosition.x}%`,
							y: `${cursor.endPosition.y}%`,
							opacity: [0, 0.8, 0.9, 0.7, 0],
							scale: [0.7, 1.1, 1, 1, 0.8],
						}}
						exit={{
							opacity: 0,
							scale: 0.6,
							transition: { duration: 0.5, ease: 'easeOut' },
						}}
						transition={{
							duration: cursor.duration,
							ease: [0.25, 0.46, 0.45, 0.94], // Custom cubic-bezier for smoother motion
							times: [0, 0.15, 0.4, 0.85, 1],
						}}
						className="absolute z-50"
					>
						<motion.div
							animate={{
								rotate: [0, 5, -2, 3, 0], // Only rotate the cursor pointer
							}}
							transition={{
								duration: cursor.duration,
								ease: 'easeInOut',
							}}
						>
							<Cursor>
								<CursorPointer className={cursor.color} />
								<CursorBody className={cursor.bgColor}>
									<CursorName>{cursor.name}</CursorName>
									<CursorMessage>{cursor.message}</CursorMessage>
								</CursorBody>
							</Cursor>
						</motion.div>
					</motion.div>
				))}
			</AnimatePresence>
		</div>
	);
};

interface StaticAnimatedCursorProps {
	name: string;
	message: string;
	color: keyof typeof colorMap;
	position: { x: number; y: number };
	delay?: number;
	className?: string;
}

export const StaticAnimatedCursor = ({
	name,
	message,
	color,
	position,
	delay = 0,
	className,
}: StaticAnimatedCursorProps) => {
	const colors = colorMap[color];

	return (
		<motion.div
			initial={{ opacity: 0, scale: 0.8, y: 10 }}
			animate={{
				opacity: [0, 1, 1, 0.7],
				scale: [0.8, 1.1, 1, 1],
				y: [10, 0, 0, -5],
			}}
			transition={{
				duration: 4,
				delay,
				repeat: Infinity,
				repeatDelay: 3,
				ease: 'easeInOut',
				times: [0, 0.2, 0.8, 1],
			}}
			className={`pointer-events-none absolute z-40 ${className}`}
			style={{
				left: `${position.x}%`,
				top: `${position.y}%`,
			}}
		>
			<Cursor>
				<CursorPointer className={colors.text} />
				<CursorBody className={`${colors.bg} ${colors.textColor} border ${colors.border}`}>
					<CursorName>{name}</CursorName>
					<CursorMessage>{message}</CursorMessage>
				</CursorBody>
			</Cursor>
		</motion.div>
	);
};
