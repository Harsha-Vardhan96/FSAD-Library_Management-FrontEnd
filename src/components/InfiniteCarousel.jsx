import React, { useRef, useEffect, useState, useMemo } from 'react';

/**
 * InfiniteCarousel - A high-performance, seamless looping carousel.
 * 
 * @param {Object} props
 * @param {React.ReactNode} props.children - Items to carousel
 * @param {number} props.speed - Pixels per frame (default: 1)
 * @param {number} props.gap - Gap between items in pixels (default: 32)
 * @param {number} props.hoverSlowFactor - Factor to slow down on hover (default: 0.2)
 * @param {string} props.className - Custom container classes
 */
const InfiniteCarousel = ({
    children,
    speed = 1,
    gap = 32,
    hoverSlowFactor = 0.15,
    className = ""
}) => {
    const containerRef = useRef(null);
    const scrollerRef = useRef(null);
    const [isHovered, setIsHovered] = useState(false);
    const [contentWidth, setContentWidth] = useState(0);

    // Create three sets of children to ensure a seamless loop
    // even on ultra-wide screens.
    const tripleChildren = useMemo(() => {
        return (
            <>
                {children}
                {children}
                {children}
            </>
        );
    }, [children]);

    useEffect(() => {
        if (!scrollerRef.current || !containerRef.current) return;

        const scroller = scrollerRef.current;
        let x = 0;
        let animationId;
        let currentSpeed = speed;

        // Calculate width of exactly one set of children
        const updateWidth = () => {
            // Since we have 3 sets, contentWidth is total / 3
            setContentWidth(scroller.scrollWidth / 3);
        };

        const resizeObserver = new ResizeObserver(updateWidth);
        resizeObserver.observe(scroller);
        updateWidth();

        const animate = () => {
            // Smoothly transition the current speed based on hover state
            const targetSpeed = isHovered ? speed * hoverSlowFactor : speed;
            // Linear interpolation (lerp) for smooth speed change
            currentSpeed += (targetSpeed - currentSpeed) * 0.1;

            x -= currentSpeed;

            // Reset X when we've scrolled past one full set
            // We start at 0, scroll left. When x <= -contentWidth, we reset to 0.
            if (x <= -contentWidth) {
                x += contentWidth;
            }

            scroller.style.transform = `translate3d(${x}px, 0, 0)`;
            animationId = requestAnimationFrame(animate);
        };

        animationId = requestAnimationFrame(animate);

        return () => {
            cancelAnimationFrame(animationId);
            resizeObserver.disconnect();
        };
    }, [speed, contentWidth, isHovered, hoverSlowFactor]);

    return (
        <div
            ref={containerRef}
            className={`relative w-full overflow-hidden ${className}`}
            style={{
                maskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)',
                WebkitMaskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)'
            }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div
                ref={scrollerRef}
                className="flex will-change-transform"
                style={{ gap: `${gap}px` }}
            >
                {tripleChildren}
            </div>
        </div>
    );
};

export default InfiniteCarousel;
