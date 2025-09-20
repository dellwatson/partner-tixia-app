// 'use client';

import { useRef } from 'react';
import { motion } from 'motion/react';
import { memo, useMemo } from 'react';
import DottedMap from 'dotted-map';
import '~/styles/world-map.css';

// import { useTheme } from 'next-themes';

interface MapProps {
	dots?: Array<{
		start: { lat: number; lng: number; label?: string };
		end: { lat: number; lng: number; label?: string };
	}>;
	lineColor?: string;
}

function WorldMapComponent({ dots = [], lineColor = '#0ea5e9' }: MapProps) {
	const svgRef = useRef<SVGSVGElement>(null);
	
	// Memoize expensive operations
	const map = useMemo(() => new DottedMap({ height: 100, grid: 'diagonal' }), []);

	const svgMap = useMemo(() => map.getSVG({
		radius: 0.22,
		color: '#00000040',
		shape: 'circle',
		backgroundColor: 'white',
	}), [map]);

	const projectPoint = useMemo(() => (lat: number, lng: number) => {
		const x = (lng + 180) * (800 / 360);
		const y = (90 - lat) * (400 / 180);
		return { x, y };
	}, []);

	const createCurvedPath = useMemo(() => (start: { x: number; y: number }, end: { x: number; y: number }) => {
		const midX = (start.x + end.x) / 2;
		const midY = Math.min(start.y, end.y) - 50;
		return `M ${start.x} ${start.y} Q ${midX} ${midY} ${end.x} ${end.y}`;
	}, []);

	// Memoize projected dots to prevent recalculation
	const projectedDots = useMemo(() => {
		return dots.map(dot => ({
			...dot,
			startPoint: projectPoint(dot.start.lat, dot.start.lng),
			endPoint: projectPoint(dot.end.lat, dot.end.lng)
		}));
	}, [dots, projectPoint]);

	return (
		<div className="relative aspect-[2/1] w-full rounded-lg bg-white font-sans dark:bg-black">
				<img
					src={`data:image/svg+xml;utf8,${encodeURIComponent(svgMap)}`}
					className="pointer-events-none h-full w-full [mask-image:linear-gradient(to_bottom,transparent,white_10%,white_90%,transparent)] select-none"
					alt="world map"
					height="495"
					width="1056"
					draggable={false}
				/>
				<svg
					ref={svgRef}
					viewBox="0 0 800 400"
					className="pointer-events-none absolute inset-0 h-full w-full select-none"
				>
					{projectedDots.map((dot, i) => {
						return (
							<g key={`path-group-${i}`}>
								<motion.path
									d={createCurvedPath(dot.startPoint, dot.endPoint)}
									fill="none"
									stroke="url(#path-gradient)"
									strokeWidth="1"
									initial={{
										pathLength: 0,
									}}
									animate={{
										pathLength: 1,
									}}
									transition={{
										duration: 3,
										delay: i * 0.8, // Sequential timing - each route starts after previous
										ease: 'easeOut',
										repeat: Infinity,
										repeatDelay: projectedDots.length * 0.8 + 2, // Wait for all routes to complete + 2s
									}}
									key={`start-upper-${i}`}
								></motion.path>
							</g>
						);
					})}

					<defs>
						<linearGradient id="path-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
							<stop offset="0%" stopColor="white" stopOpacity="0" />
							<stop offset="5%" stopColor={lineColor} stopOpacity="1" />
							<stop offset="95%" stopColor={lineColor} stopOpacity="1" />
							<stop offset="100%" stopColor="white" stopOpacity="0" />
						</linearGradient>
					</defs>

					{projectedDots.map((dot, i) => (
						<g key={`points-group-${i}`}>
							<g key={`start-${i}`}>
								<circle
									cx={dot.startPoint.x}
									cy={dot.startPoint.y}
									r="2"
									fill={lineColor}
								/>
								<circle
									cx={dot.startPoint.x}
									cy={dot.startPoint.y}
									r="2"
									fill={lineColor}
									opacity="0.5"
									className="pulse-animation"
								/>
							</g>
							<g key={`end-${i}`}>
								<circle
									cx={dot.endPoint.x}
									cy={dot.endPoint.y}
									r="2"
									fill={lineColor}
								/>
								<circle
									cx={dot.endPoint.x}
									cy={dot.endPoint.y}
									r="2"
									fill={lineColor}
									opacity="0.5"
									className="pulse-animation"
								/>
							</g>
						</g>
					))}
				</svg>
		</div>
	);
}

// Memoize the WorldMap component to prevent unnecessary re-renders
const WorldMap = memo(WorldMapComponent, (prevProps, nextProps) => {
	// Custom comparison to prevent re-renders when routes are the same
	if (prevProps.lineColor !== nextProps.lineColor) return false;
	if (prevProps.dots.length !== nextProps.dots.length) return false;
	
	// Deep comparison of dots array
	for (let i = 0; i < prevProps.dots.length; i++) {
		const prevDot = prevProps.dots[i];
		const nextDot = nextProps.dots[i];
		
		if (prevDot.start.lat !== nextDot.start.lat ||
			prevDot.start.lng !== nextDot.start.lng ||
			prevDot.end.lat !== nextDot.end.lat ||
			prevDot.end.lng !== nextDot.end.lng) {
			return false;
		}
	}
	
	return true; // Props are equal, skip re-render
});

export default WorldMap;
