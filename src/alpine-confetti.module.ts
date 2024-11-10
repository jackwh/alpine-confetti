import confetti, {Options} from "canvas-confetti";
import type {Alpine} from "alpinejs";

/** Get the midpoint x/y coordinates for an element onscreen */
export function getElementOrigin(el: HTMLElement): { x: number; y: number } {
    const rect = el.getBoundingClientRect();

    return {
        x: (rect.left + (rect.width / 2)) / window.innerWidth,
        y: (rect.top + (rect.height / 2)) / window.innerHeight,
    };
}

/** Default confetti options */
export const defaultConfettiOptions: Partial<Options> = {
    particleCount: 100,
    spread: 100,
    startVelocity: 30,
    disableForReducedMotion: true,
};

/** Default starburst options */
export const defaultStarburstOptions: Partial<Options> = {
    particleCount: 25,
    shapes: ['star'],
    colors: ['#fefce8', '#fef9c3', '#fef08a', '#fde047', '#facc15'],
    ticks: 50,
    spread: 360,
    startVelocity: 22.5,
    scalar: 1.5,
    drift: Math.random() * (Math.random() < 0.5 ? -1 : 1),
    disableForReducedMotion: true,
};

/** Default emojify options */
export const defaultEmojifyOptions: Options = {
    particleCount: 10,
    scalar: 5,
    decay: 0.9,
    spread: 360,
    startVelocity: 20,
    ticks: 100,
    disableForReducedMotion: true,
};

/** Register the Alpine Confetti plugin. */
function AlpineConfetti(Alpine: Alpine) {
    // Alpine Magic: $confetti — blast some confetti from an element onscreen
    Alpine.magic(
        'confetti',
        (el: HTMLElement) =>
            async (particles: number | confetti.Options = 100): Promise<undefined | null> => {
                const defaults = {
                    ...defaultConfettiOptions,
                    particleCount: typeof particles === 'number'
                        ? particles
                        : defaultConfettiOptions.particleCount,
                    origin: getElementOrigin(el),
                };

                return confetti(
                    typeof particles === 'object'
                        ? {...defaults, ...particles}
                        : defaults
                );
            }
    );

    // Alpine Magic: $starburst — blast some stars from an element onscreen
    Alpine.magic(
        'starburst',
        (el: HTMLElement) =>
            async (particles: number | confetti.Options = 10): Promise<undefined | null> => {
                const defaults = {
                    ...defaultStarburstOptions,
                    particleCount: typeof particles === 'number'
                        ? particles
                        : defaultStarburstOptions.particleCount,
                    origin: getElementOrigin(el),
                };

                return confetti(
                    typeof particles === 'object'
                        ? {...defaults, ...particles}
                        : defaults
                );
            }
    );

    // Alpine Magic: $emojify — just because you can, doesn't mean you should.
    Alpine.magic(
        'emojify',
        (el: HTMLElement) =>
            async (
                emojis: string[] = ['🍓', '🍌', '🥝'],
                particles: number | confetti.Options = 10
            ): Promise<undefined | null> => {
                const defaults = {
                    ...defaultEmojifyOptions,
                    shapes: emojis.map((emoji) =>
                        confetti.shapeFromText({
                            text: emoji,
                            scalar: defaultEmojifyOptions.scalar
                        })
                    ),
                    particleCount: typeof particles === 'number'
                        ? particles
                        : defaultEmojifyOptions.particleCount,
                    origin: getElementOrigin(el),
                };

                return confetti(
                    typeof particles === 'object'
                        ? {...defaults, ...particles}
                        : defaults
                );
            }
    );
}

export default AlpineConfetti;
