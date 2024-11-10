import AlpineConfetti from './module';
import type {Alpine} from "alpinejs";

declare global {
    interface Window {
        Alpine: Alpine;
    }
}

document.addEventListener('alpine:init', () => {
    AlpineConfetti(window.Alpine);
});
