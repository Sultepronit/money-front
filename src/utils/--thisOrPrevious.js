import { ref, computed } from "vue";

const current = ref(null);
const previous = ref(null);

function currentOrPrevious(currentVal, previousVal) {
    current.value = currentVal;
    previous.value = previousVal;

    return () => current.value ? current : previous;
}