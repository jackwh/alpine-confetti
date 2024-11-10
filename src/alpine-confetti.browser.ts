import AlpineConfetti from './alpine-confetti.module';
import type {Alpine} from "alpinejs";

document.addEventListener('alpine:init', () => {
    AlpineConfetti(window.Alpine);
});

declare global {
    interface Window {
        Alpine: Alpine;
    }
}
